import React from 'react';

export default function TokenList({ 
  tokens, 
  walletConnected, 
  formatNumber, 
  onShowCreateModal, 
  activeTab,
  onMint,
  onTransfer,
  onBurn
}) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardTitle}>{activeTab === 'tokens' ? 'All Tokens' : 'Your Tokens'}</span>
        {activeTab === 'tokens' && (
          <button style={{...styles.btn, ...styles.btnPrimary}} onClick={onShowCreateModal}>
            + New Token
          </button>
        )}
        {activeTab === 'dashboard' && (
          <button style={{...styles.btn, ...styles.btnGhost}} onClick={() => onShowCreateModal()}>
            View All
          </button>
        )}
      </div>
      <div style={styles.tokenList}>
        {!walletConnected ? (
          <div style={styles.emptyState}>
            <p>Connect your wallet to see your tokens</p>
            <button style={{...styles.btn, ...styles.btnPrimary}} onClick={() => onShowCreateModal()}>
              Connect Wallet
            </button>
          </div>
        ) : tokens.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No tokens found. Create your first token!</p>
            <button style={{...styles.btn, ...styles.btnPrimary}} onClick={onShowCreateModal}>
              Create Token
            </button>
          </div>
        ) : (
          tokens.map((token, idx) => (
            <div key={idx} style={styles.tokenItemExpanded}>
              <div style={styles.tokenInfo}>
                <div style={styles.tokenIcon}>{token.symbol.substring(0, 2)}</div>
                <div>
                  <div style={styles.tokenName}>{token.name}</div>
                  <div style={styles.tokenSymbol}>{token.mint}</div>
                </div>
              </div>
              <div style={styles.tokenStats}>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Supply</span>
                  <span style={styles.statValue}>{formatNumber(token.balance)}</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Decimals</span>
                  <span style={styles.statValue}>{token.decimals}</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Holders</span>
                  <span style={styles.statValue}>{Math.floor(Math.random() * 1000)}</span>
                </div>
              </div>
              <div style={styles.tokenActions}>
                <button 
                  style={{...styles.btn, ...styles.btnGhost, padding: '0.5rem 1rem'}}
                  onClick={() => onMint(token)}
                >
                  Mint
                </button>
                <button 
                  style={{...styles.btn, ...styles.btnGhost, padding: '0.5rem 1rem'}}
                  onClick={() => onTransfer(token)}
                >
                  Transfer
                </button>
                <button 
                  style={{...styles.btn, ...styles.btnGhost, padding: '0.5rem 1rem'}}
                  onClick={() => onBurn(token)}
                >
                  Burn
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
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
  btnGhost: {
    background: 'transparent',
    color: '#ffffff',
    border: '1px solid #2a2a3a',
  },
  tokenList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  tokenItemExpanded: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr auto',
    alignItems: 'center',
    gap: '2rem',
    padding: '1.25rem',
    background: '#1a1a25',
    borderRadius: '10px',
    border: '1px solid #2a2a3a',
  },
  tokenInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  tokenIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #9945ff 0%, #14f195 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '1rem',
    color: '#0a0a0f',
  },
  tokenName: {
    fontWeight: 600,
    marginBottom: '0.25rem',
  },
  tokenSymbol: {
    fontSize: '0.85rem',
    color: '#606070',
    fontFamily: "'Space Mono', monospace",
  },
  tokenStats: {
    display: 'flex',
    gap: '2rem',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#606070',
    marginBottom: '0.25rem',
  },
  statValue: {
    fontWeight: 600,
    fontFamily: "'Space Mono', monospace",
  },
  tokenActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: '#606070',
  },
};
