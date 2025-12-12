import React from 'react';

export default function PageHeader({ activeTab, onShowCreateModal, walletConnected }) {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'tokens', icon: '🪙', label: 'My Tokens' },
    { id: 'liquidity', icon: '💧', label: 'Liquidity' },
    { id: 'airdrop', icon: '🎯', label: 'Airdrops' },
    { id: 'vesting', icon: '🔒', label: 'Vesting' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
  ];

  return (
    <div style={styles.pageHeader}>
      <div>
        <h1 style={styles.pageTitle}>
          {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
        </h1>
        <p style={styles.pageSubtitle}>
          {walletConnected 
            ? "Welcome back! Here's what's happening with your tokens."
            : "Connect your wallet to get started."
          }
        </p>
      </div>
      <button 
        style={{...styles.btn, ...styles.btnPrimary}}
        onClick={onShowCreateModal}
      >
        + Create Token
      </button>
    </div>
  );
}

const styles = {
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  pageTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    marginBottom: '0.25rem',
  },
  pageSubtitle: {
    color: '#606070',
    fontSize: '0.9rem',
  },
  btn: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s',
    fontFamily: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #9945ff 0%, #14f195 100%)',
    color: '#0a0a0f',
  },
};
