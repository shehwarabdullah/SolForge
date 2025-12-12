# 🚀 SolForge - Solana Token Launchpad SaaS

A production-ready Solana blockchain dApp that you can sell as a SaaS product. This platform enables users to create, manage, and grow SPL tokens with enterprise-grade tools and analytics.

![SolForge Preview](https://img.shields.io/badge/Solana-Ready-9945ff?style=for-the-badge&logo=solana)
![License](https://img.shields.io/badge/License-MIT-14f195?style=for-the-badge)

## 💰 Monetization Strategies

### 1. **Subscription Tiers**
| Plan | Price | Features |
|------|-------|----------|
| Starter | $29/mo | 3 tokens, basic analytics, 1K airdrops |
| Pro | $99/mo | Unlimited tokens, advanced analytics, 50K airdrops, vesting |
| Enterprise | $499/mo | White-label, custom integrations, dedicated support |

### 2. **Transaction Fees**
- Token creation: 0.5-2% fee on deployment
- Airdrop service: $0.001-0.01 per recipient
- Liquidity pool creation: 0.25% fee

### 3. **Premium Features**
- Security audit integration ($199 one-time)
- Custom token page/landing page ($99)
- Analytics API access ($49/mo)
- Priority transaction processing

### 4. **White-Label Licensing**
- Sell the platform to other businesses for $5,000-20,000
- Monthly maintenance contracts

---

## 🏗 Architecture

```
solana-launchpad/
├── index.html          # Landing page & marketing site
├── server/
│   ├── index.js        # Express API server
│   ├── package.json    # Backend dependencies
│   └── .env.example    # Environment template
├── src/
│   └── App.jsx         # React dashboard component
└── README.md
```

## 🛠 Tech Stack

**Frontend:**
- Vanilla HTML/CSS/JS (landing page)
- React 18 (dashboard)
- Tailwind CSS (styling)
- Solana Wallet Adapter

**Backend:**
- Node.js + Express
- @solana/web3.js
- @solana/spl-token
- @metaplex-foundation/js

**Blockchain:**
- Solana (Devnet/Mainnet)
- SPL Token Program
- Metaplex Token Metadata
- Raydium/Orca (liquidity)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Solana CLI (optional)
- Phantom/Solflare wallet

### 1. Clone & Install

```bash
git clone <your-repo>
cd solana-launchpad

# Install backend dependencies
cd server
npm install
cp .env.example .env
# Edit .env with your configuration

# Start the server
npm run dev
```

### 2. Configure Environment

Edit `server/.env`:

```env
# Network (devnet for testing, mainnet-beta for production)
SOLANA_RPC=https://api.devnet.solana.com

# For production, use a dedicated RPC:
# SOLANA_RPC=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Run the Application

```bash
# Terminal 1: Backend API
cd server && npm run dev

# Terminal 2: Frontend (if using React build)
npm run build && npx serve dist

# Or simply open index.html in browser for the landing page
```

---

## 📚 API Documentation

### Token Endpoints

#### Create Token
```http
POST /api/token/create
Content-Type: application/json

{
  "name": "My Token",
  "symbol": "MTK",
  "decimals": 9,
  "supply": "1000000000",
  "description": "My awesome token",
  "image": "https://example.com/logo.png",
  "ownerPublicKey": "YourWalletAddress..."
}
```

#### Get Token Info
```http
GET /api/token/:mintAddress
```

#### Get Token Holders
```http
GET /api/token/:mintAddress/holders?limit=100
```

### Airdrop Endpoints

#### Batch Airdrop
```http
POST /api/token/airdrop
Content-Type: application/json

{
  "mintAddress": "TokenMintAddress...",
  "recipients": ["Wallet1...", "Wallet2..."],
  "amounts": [1000, 2000],
  "senderPublicKey": "YourWallet..."
}
```

### Vesting Endpoints

#### Create Vesting Schedule
```http
POST /api/vesting/create
Content-Type: application/json

{
  "mintAddress": "TokenMint...",
  "beneficiary": "RecipientWallet...",
  "totalAmount": 1000000,
  "startTime": "2024-01-01T00:00:00Z",
  "cliffDuration": 2592000,  // 30 days in seconds
  "vestingDuration": 31536000,  // 1 year in seconds
  "ownerPublicKey": "YourWallet..."
}
```

### Liquidity Endpoints

#### Create Liquidity Pool
```http
POST /api/liquidity/create
Content-Type: application/json

{
  "tokenMint": "YourTokenMint...",
  "quoteMint": "So11111111111111111111111111111111111111112",
  "tokenAmount": 1000000,
  "quoteAmount": 10,
  "ownerPublicKey": "YourWallet..."
}
```

---

## 🔐 Security Considerations

### Smart Contract Security
- Use audited SPL token program
- Implement proper authority checks
- Rate limit sensitive operations

### API Security
- Helmet.js for HTTP headers
- Rate limiting (100 req/15min)
- Input validation
- CORS configuration

### Production Checklist
- [ ] Use dedicated RPC (Helius, QuickNode, Alchemy)
- [ ] Enable HTTPS
- [ ] Set up monitoring (Datadog, Sentry)
- [ ] Database for user data (PostgreSQL)
- [ ] Redis for caching/sessions
- [ ] Regular security audits

---

## 📈 Scaling for Production

### Database Schema (PostgreSQL)

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  wallet_address VARCHAR(44) UNIQUE NOT NULL,
  email VARCHAR(255),
  subscription_tier VARCHAR(20) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tokens table
CREATE TABLE tokens (
  id SERIAL PRIMARY KEY,
  mint_address VARCHAR(44) UNIQUE NOT NULL,
  owner_id INTEGER REFERENCES users(id),
  name VARCHAR(100),
  symbol VARCHAR(10),
  decimals INTEGER,
  total_supply NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  plan VARCHAR(20),
  status VARCHAR(20),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  payment_tx VARCHAR(100)
);
```

### Caching Strategy

```javascript
// Redis caching example
const redis = require('redis');
const client = redis.createClient();

// Cache token info for 5 minutes
async function getTokenInfo(mintAddress) {
  const cached = await client.get(`token:${mintAddress}`);
  if (cached) return JSON.parse(cached);
  
  const tokenInfo = await fetchFromChain(mintAddress);
  await client.setEx(`token:${mintAddress}`, 300, JSON.stringify(tokenInfo));
  return tokenInfo;
}
```

---

## 🎨 Customization

### Branding
1. Update logo in `index.html` and `App.jsx`
2. Modify color variables in CSS:
```css
:root {
  --accent-primary: #00ffa3;
  --accent-secondary: #9945ff;
  --accent-tertiary: #14f195;
}
```

### Adding Features
- **NFT Minting**: Integrate Metaplex Candy Machine
- **Staking**: Add staking pools with rewards
- **Governance**: DAO voting mechanisms
- **Bridge**: Cross-chain token bridging

---

## 📊 Analytics Integration

### Recommended Tools
- **Helius**: Solana-specific webhooks and APIs
- **Shyft**: NFT and token analytics
- **Moralis**: Multi-chain support
- **Dune Analytics**: Custom dashboards

### Tracking Events
```javascript
// Track token creation
analytics.track('token_created', {
  wallet: ownerPublicKey,
  tokenName: name,
  symbol: symbol,
  supply: supply
});
```

---

## 🤝 Support & Resources

### Solana Resources
- [Solana Docs](https://docs.solana.com)
- [SPL Token Program](https://spl.solana.com/token)
- [Metaplex Docs](https://docs.metaplex.com)
- [Anchor Framework](https://www.anchor-lang.com)

### Community
- [Solana Discord](https://discord.gg/solana)
- [Solana Stack Exchange](https://solana.stackexchange.com)

---

## 📄 License

MIT License - Feel free to use this for commercial purposes.

---

## 🚀 Deployment Options

### Vercel (Frontend)
```bash
vercel deploy
```

### Railway (Backend)
```bash
railway up
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY server/ .
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]
```

---

Built with ⚡ by SolForge Team
