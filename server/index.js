// SolForge Backend API Server
// Handles Solana blockchain interactions for the Token Launchpad SaaS

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { 
    Connection, 
    Keypair, 
    PublicKey, 
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction
} = require('@solana/web3.js');
const {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    transfer,
    getMint,
    getAccount,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
} = require('@solana/spl-token');
const { 
    Metaplex, 
    keypairIdentity, 
    bundlrStorage,
    toMetaplexFile
} = require('@metaplex-foundation/js');

// Environment configuration
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Solana connection
const SOLANA_RPC = process.env.SOLANA_RPC || 'https://api.devnet.solana.com';
const connection = new Connection(SOLANA_RPC, 'confirmed');

// ====================
// API Routes
// ====================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        network: SOLANA_RPC.includes('devnet') ? 'devnet' : 'mainnet',
        timestamp: new Date().toISOString()
    });
});

// Get network stats
app.get('/api/stats', async (req, res) => {
    try {
        const slot = await connection.getSlot();
        const blockTime = await connection.getBlockTime(slot);
        const epochInfo = await connection.getEpochInfo();
        
        res.json({
            slot,
            blockTime,
            epoch: epochInfo.epoch,
            slotIndex: epochInfo.slotIndex,
            slotsInEpoch: epochInfo.slotsInEpoch
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new SPL token
app.post('/api/token/create', async (req, res) => {
    try {
        const { 
            name, 
            symbol, 
            decimals = 9, 
            supply, 
            description,
            image,
            ownerPublicKey 
        } = req.body;

        // Validate inputs
        if (!name || !symbol || !supply || !ownerPublicKey) {
            return res.status(400).json({ 
                error: 'Missing required fields: name, symbol, supply, ownerPublicKey' 
            });
        }

        const owner = new PublicKey(ownerPublicKey);

        // For production, the payer would be the user's wallet
        // This example uses a server keypair for demonstration
        // In production, you'd create an unsigned transaction for the client to sign
        
        // Generate the transaction instructions for client-side signing
        const mintKeypair = Keypair.generate();
        
        // Calculate rent exemption
        const lamportsForMint = await connection.getMinimumBalanceForRentExemption(82);
        
        // Return transaction data for client to sign
        res.json({
            success: true,
            message: 'Token creation transaction prepared',
            data: {
                mintAddress: mintKeypair.publicKey.toBase58(),
                mintSecretKey: Array.from(mintKeypair.secretKey), // Client needs this temporarily
                lamportsRequired: lamportsForMint,
                tokenDetails: {
                    name,
                    symbol,
                    decimals,
                    supply,
                    description,
                    image
                }
            },
            instructions: {
                step1: 'Sign and send the create mint transaction',
                step2: 'Create associated token account',
                step3: 'Mint initial supply to your wallet',
                step4: 'Upload metadata to Metaplex'
            }
        });

    } catch (error) {
        console.error('Token creation error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get token info
app.get('/api/token/:mintAddress', async (req, res) => {
    try {
        const { mintAddress } = req.params;
        const mint = new PublicKey(mintAddress);
        
        const mintInfo = await getMint(connection, mint);
        
        res.json({
            address: mintAddress,
            decimals: mintInfo.decimals,
            supply: mintInfo.supply.toString(),
            mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
            freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null,
            isInitialized: mintInfo.isInitialized
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get token balance for a wallet
app.get('/api/token/:mintAddress/balance/:walletAddress', async (req, res) => {
    try {
        const { mintAddress, walletAddress } = req.params;
        const mint = new PublicKey(mintAddress);
        const wallet = new PublicKey(walletAddress);
        
        // Get associated token account
        const tokenAccounts = await connection.getTokenAccountsByOwner(wallet, {
            mint: mint
        });
        
        if (tokenAccounts.value.length === 0) {
            return res.json({ balance: '0', hasAccount: false });
        }
        
        const accountInfo = await getAccount(
            connection, 
            tokenAccounts.value[0].pubkey
        );
        
        res.json({
            balance: accountInfo.amount.toString(),
            hasAccount: true,
            tokenAccount: tokenAccounts.value[0].pubkey.toBase58()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tokens owned by a wallet
app.get('/api/wallet/:walletAddress/tokens', async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const wallet = new PublicKey(walletAddress);
        
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            wallet,
            { programId: TOKEN_PROGRAM_ID }
        );
        
        const tokens = tokenAccounts.value.map(account => ({
            mint: account.account.data.parsed.info.mint,
            balance: account.account.data.parsed.info.tokenAmount.uiAmount,
            decimals: account.account.data.parsed.info.tokenAmount.decimals,
            tokenAccount: account.pubkey.toBase58()
        }));
        
        res.json({ tokens, count: tokens.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Airdrop tokens (batch transfer)
app.post('/api/token/airdrop', async (req, res) => {
    try {
        const { mintAddress, recipients, amounts, senderPublicKey } = req.body;
        
        if (!mintAddress || !recipients || !amounts || !senderPublicKey) {
            return res.status(400).json({ 
                error: 'Missing required fields' 
            });
        }
        
        if (recipients.length !== amounts.length) {
            return res.status(400).json({ 
                error: 'Recipients and amounts arrays must have the same length' 
            });
        }
        
        if (recipients.length > 100) {
            return res.status(400).json({ 
                error: 'Maximum 100 recipients per batch. Split into multiple transactions.' 
            });
        }
        
        // Prepare batch transfer instructions
        // In production, these would be bundled into versioned transactions
        const transfers = recipients.map((recipient, i) => ({
            recipient,
            amount: amounts[i]
        }));
        
        res.json({
            success: true,
            message: 'Airdrop transaction prepared',
            data: {
                mintAddress,
                totalRecipients: recipients.length,
                totalAmount: amounts.reduce((a, b) => a + b, 0),
                transfers,
                estimatedFee: recipients.length * 5000 // Approximate lamports
            }
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create vesting schedule
app.post('/api/vesting/create', async (req, res) => {
    try {
        const { 
            mintAddress,
            beneficiary,
            totalAmount,
            startTime,
            cliffDuration,
            vestingDuration,
            ownerPublicKey
        } = req.body;
        
        // Validate inputs
        if (!mintAddress || !beneficiary || !totalAmount || !startTime || !vestingDuration || !ownerPublicKey) {
            return res.status(400).json({ 
                error: 'Missing required fields' 
            });
        }
        
        // Calculate vesting schedule
        const schedule = {
            id: `vesting_${Date.now()}`,
            mintAddress,
            beneficiary,
            totalAmount,
            startTime: new Date(startTime).getTime(),
            cliffEnd: new Date(startTime).getTime() + (cliffDuration || 0) * 1000,
            vestingEnd: new Date(startTime).getTime() + vestingDuration * 1000,
            amountPerSecond: totalAmount / vestingDuration,
            claimed: 0,
            status: 'active'
        };
        
        // In production, this would create an on-chain vesting account
        res.json({
            success: true,
            message: 'Vesting schedule created',
            schedule
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get vesting schedules for a wallet
app.get('/api/vesting/:walletAddress', async (req, res) => {
    try {
        const { walletAddress } = req.params;
        
        // In production, this would query on-chain vesting accounts
        // Mock response for demonstration
        res.json({
            schedules: [],
            message: 'No vesting schedules found'
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create liquidity pool (Raydium-style)
app.post('/api/liquidity/create', async (req, res) => {
    try {
        const {
            tokenMint,
            quoteMint, // Usually SOL or USDC
            tokenAmount,
            quoteAmount,
            ownerPublicKey
        } = req.body;
        
        if (!tokenMint || !quoteMint || !tokenAmount || !quoteAmount || !ownerPublicKey) {
            return res.status(400).json({ 
                error: 'Missing required fields' 
            });
        }
        
        // Calculate initial price
        const initialPrice = quoteAmount / tokenAmount;
        
        // In production, this would interact with Raydium or Orca
        res.json({
            success: true,
            message: 'Liquidity pool creation prepared',
            data: {
                tokenMint,
                quoteMint,
                tokenAmount,
                quoteAmount,
                initialPrice,
                estimatedLpTokens: Math.sqrt(tokenAmount * quoteAmount),
                poolType: 'AMM-V4'
            }
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get token holders
app.get('/api/token/:mintAddress/holders', async (req, res) => {
    try {
        const { mintAddress } = req.params;
        const { limit = 100, offset = 0 } = req.query;
        
        const mint = new PublicKey(mintAddress);
        
        // Get largest token accounts (holders)
        const tokenAccounts = await connection.getTokenLargestAccounts(mint);
        
        const holders = tokenAccounts.value.map((account, index) => ({
            rank: index + 1,
            address: account.address.toBase58(),
            amount: account.amount,
            uiAmount: account.uiAmount,
            percentage: 0 // Would calculate from total supply
        }));
        
        res.json({
            holders: holders.slice(offset, offset + limit),
            total: holders.length
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Analytics endpoint
app.get('/api/analytics/:mintAddress', async (req, res) => {
    try {
        const { mintAddress } = req.params;
        const { timeframe = '24h' } = req.query;
        
        // In production, this would aggregate on-chain data
        // Mock analytics for demonstration
        res.json({
            mintAddress,
            timeframe,
            metrics: {
                holders: Math.floor(Math.random() * 10000),
                transactions24h: Math.floor(Math.random() * 5000),
                volume24h: Math.floor(Math.random() * 1000000),
                priceChange24h: (Math.random() * 20 - 10).toFixed(2),
                marketCap: Math.floor(Math.random() * 10000000)
            },
            history: generateMockHistory(timeframe)
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Helper function for mock data
function generateMockHistory(timeframe) {
    const points = timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : 30;
    const history = [];
    let value = 100;
    
    for (let i = points; i > 0; i--) {
        value = value * (1 + (Math.random() * 0.1 - 0.05));
        history.push({
            timestamp: Date.now() - i * (timeframe === '24h' ? 3600000 : 86400000),
            value: value.toFixed(2),
            volume: Math.floor(Math.random() * 100000)
        });
    }
    
    return history;
}

// Subscription/Billing endpoints (for SaaS)
app.post('/api/subscription/create', async (req, res) => {
    try {
        const { walletAddress, plan, paymentTxId } = req.body;
        
        // In production, verify the payment transaction
        // and create subscription record in database
        
        res.json({
            success: true,
            subscription: {
                id: `sub_${Date.now()}`,
                walletAddress,
                plan,
                status: 'active',
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                features: getPlanFeatures(plan)
            }
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

function getPlanFeatures(plan) {
    const features = {
        starter: {
            maxTokens: 3,
            maxAirdropRecipients: 1000,
            analytics: 'basic',
            support: 'community'
        },
        pro: {
            maxTokens: -1, // unlimited
            maxAirdropRecipients: 50000,
            analytics: 'advanced',
            support: 'priority',
            vesting: true,
            lpManagement: true
        },
        enterprise: {
            maxTokens: -1,
            maxAirdropRecipients: -1,
            analytics: 'advanced',
            support: 'dedicated',
            vesting: true,
            lpManagement: true,
            whiteLabel: true,
            customIntegrations: true
        }
    };
    return features[plan] || features.starter;
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SolForge API running on port ${PORT}`);
    console.log(`📡 Connected to Solana: ${SOLANA_RPC}`);
});

module.exports = app;
