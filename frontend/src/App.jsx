// SolForge Dashboard - React Application
// Full-featured Solana token management dashboard

import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PageHeader from './components/PageHeader';
import MetricsGrid from './components/MetricsGrid';
import Chart from './components/Chart';
import TokenList from './components/TokenList';
import AirdropForm from './components/AirdropForm';
import CreateTokenModal from './components/CreateTokenModal';
import NotificationToast from './components/NotificationToast';
import { formatNumber } from './utils/helpers';

// Configuration
const SOLANA_NETWORK = 'devnet';
const API_BASE_URL = '/api';

export default function SolForgeDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Token creation form state
  const [tokenForm, setTokenForm] = useState({
    name: '',
    symbol: '',
    decimals: 9,
    supply: '',
    description: '',
    image: ''
  });

  // Mock data for demonstration
  const mockTokens = [
    { mint: 'Tok1...abc', name: 'SolForge Token', symbol: 'FORGE', balance: 1000000, decimals: 9 },
    { mint: 'Tok2...def', name: 'Test Token', symbol: 'TEST', balance: 500000, decimals: 9 },
  ];

  const mockMetrics = {
    totalTokens: 12,
    totalHolders: 8421,
    volume24h: 847000,
    totalValue: 2400000
  };

  // Connect wallet
  const connectWallet = useCallback(async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
        setWalletConnected(true);
        showNotification('Wallet connected successfully!', 'success');
      } else {
        // Demo mode
        setWalletAddress('Demo' + Math.random().toString(36).substring(2, 8) + '...');
        setWalletConnected(true);
        setTokens(mockTokens);
        showNotification('Connected in demo mode', 'success');
      }
    } catch (error) {
      showNotification('Failed to connect wallet', 'error');
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    if (window.solana) {
      window.solana.disconnect();
    }
    setWalletConnected(false);
    setWalletAddress('');
    setTokens([]);
  }, []);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle token creation
  const handleCreateToken = async (e) => {
    e.preventDefault();
    if (!walletConnected) {
      showNotification('Please connect your wallet first', 'error');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newToken = {
        mint: 'New' + Math.random().toString(36).substring(2, 8),
        name: tokenForm.name,
        symbol: tokenForm.symbol,
        balance: parseInt(tokenForm.supply),
        decimals: tokenForm.decimals
      };
      
      setTokens(prev => [...prev, newToken]);
      setShowCreateModal(false);
      setTokenForm({ name: '', symbol: '', decimals: 9, supply: '', description: '', image: '' });
      setLoading(false);
      showNotification(`Token ${tokenForm.symbol} created successfully!`, 'success');
    }, 2000);
  };

  // Handle Mint button click
  const handleMint = (token) => {
    showNotification(`Minting additional supply for ${token.name}`, 'success');
    // Add your mint logic here
    // Example: Call Solana program to mint tokens
  };

  // Handle Transfer button click
  const handleTransfer = (token) => {
    showNotification(`Transferring ${token.name} tokens`, 'success');
    // Add your transfer logic here
    // Example: Open transfer modal with recipient and amount fields
  };

  // Handle Burn button click
  const handleBurn = (token) => {
    showNotification(`Burning ${token.name} tokens`, 'success');
    // Add your burn logic here
    // Example: Call Solana program to burn tokens
  };

  return (
    <div style={styles.container}>
      {/* Background effects */}
      <div style={styles.bgGradient} />
      
      {/* Header */}
      <Header 
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        network={SOLANA_NETWORK}
      />

      {/* Main Layout */}
      <div style={styles.mainLayout}>
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          subscriptionStatus="pro"
        />

        {/* Main Content */}
        <main style={styles.content}>
          {/* Page Header */}
          <PageHeader 
            activeTab={activeTab}
            onShowCreateModal={() => setShowCreateModal(true)}
            walletConnected={walletConnected}
          />

          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <>
              {/* Metrics Grid */}
              <MetricsGrid 
                walletConnected={walletConnected}
                metrics={mockMetrics}
                formatNumber={formatNumber}
              />

              {/* Chart */}
              <Chart />

              {/* Recent Tokens */}
              <TokenList 
                tokens={tokens}
                walletConnected={walletConnected}
                formatNumber={formatNumber}
                onShowCreateModal={() => setShowCreateModal(true)}
                activeTab={activeTab}
                onMint={handleMint}
                onTransfer={handleTransfer}
                onBurn={handleBurn}
              />
            </>
          )}

          {/* Tokens View */}
          {activeTab === 'tokens' && (
            <TokenList 
              tokens={tokens}
              walletConnected={walletConnected}
              formatNumber={formatNumber}
              onShowCreateModal={() => setShowCreateModal(true)}
              activeTab={activeTab}
              onMint={handleMint}
              onTransfer={handleTransfer}
              onBurn={handleBurn}
            />
          )}

          {/* Airdrop View */}
          {activeTab === 'airdrop' && (
            <AirdropForm tokens={tokens} />
          )}
        </main>
      </div>

      {/* Create Token Modal */}
      <CreateTokenModal 
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateToken}
        tokenForm={tokenForm}
        onFormChange={setTokenForm}
        loading={loading}
      />

      {/* Notification Toast */}
      <NotificationToast notification={notification} />
    </div>
  );
}

// Styles object
const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0a0f',
    color: '#ffffff',
    fontFamily: "'Syne', -apple-system, BlinkMacSystemFont, sans-serif",
    position: 'relative',
  },
  bgGradient: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(ellipse 80% 50% at 20% 20%, rgba(153, 69, 255, 0.12) 0%, transparent 50%),
      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(20, 241, 149, 0.08) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    minHeight: 'calc(100vh - 73px)',
  },
  content: {
    padding: '2rem',
    overflowY: 'auto',
    position: 'relative',
  },
};
