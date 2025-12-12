import React from 'react';

export default function Header({ walletConnected, walletAddress, onConnect, onDisconnect, network }) {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>⚡</div>
        <span>SolForge</span>
      </div>
      <div style={styles.headerActions}>
        <span style={styles.networkBadge}>
          <span style={styles.networkDot} /> {network}
        </span>
        {walletConnected ? (
          <button 
            style={{...styles.btn, ...styles.btnPrimary}}
            onClick={onDisconnect}
          >
            {walletAddress.substring(0, 4)}...{walletAddress.substring(walletAddress.length - 4)}
          </button>
        ) : (
          <button 
            style={{...styles.btn, ...styles.btnPrimary}}
            onClick={onConnect}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderBottom: '1px solid #2a2a3a',
    background: 'rgba(10, 10, 15, 0.9)',
    backdropFilter: 'blur(20px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: 800,
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #9945ff 0%, #14f195 100%)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  networkBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(20, 241, 149, 0.1)',
    borderRadius: '20px',
    fontSize: '0.85rem',
    color: '#14f195',
    textTransform: 'capitalize',
  },
  networkDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#14f195',
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
