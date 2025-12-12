import React from 'react';

export default function Sidebar({ activeTab, onTabChange, subscriptionStatus }) {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'tokens', icon: '🪙', label: 'My Tokens' },
    { id: 'liquidity', icon: '💧', label: 'Liquidity' },
    { id: 'airdrop', icon: '🎯', label: 'Airdrops' },
    { id: 'vesting', icon: '🔒', label: 'Vesting' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
  ];

  return (
    <aside style={styles.sidebar}>
      <nav>
        <div style={styles.navSection}>
          <div style={styles.navTitle}>Main Menu</div>
          {navItems.slice(0, 4).map(item => (
            <div
              key={item.id}
              style={{
                ...styles.navItem,
                ...(activeTab === item.id ? styles.navItemActive : {})
              }}
              onClick={() => onTabChange(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={styles.navSection}>
          <div style={styles.navTitle}>Tools</div>
          {navItems.slice(4).map(item => (
            <div
              key={item.id}
              style={{
                ...styles.navItem,
                ...(activeTab === item.id ? styles.navItemActive : {})
              }}
              onClick={() => onTabChange(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
      
      {/* Subscription status */}
      <div style={styles.subscriptionCard}>
        <div style={styles.subscriptionTitle}>Pro Plan</div>
        <div style={styles.subscriptionDesc}>Unlimited tokens & features</div>
        <div style={styles.progressBar}>
          <div style={{...styles.progressFill, width: '75%'}} />
        </div>
        <div style={styles.subscriptionMeta}>23 days remaining</div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    background: '#12121a',
    borderRight: '1px solid #2a2a3a',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  navSection: {
    marginBottom: '2rem',
  },
  navTitle: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#606070',
    marginBottom: '0.75rem',
    paddingLeft: '1rem',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    color: '#a0a0b0',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '0.25rem',
  },
  navItemActive: {
    background: 'linear-gradient(135deg, #9945ff 0%, #14f195 100%)',
    color: '#0a0a0f',
    fontWeight: 600,
  },
  subscriptionCard: {
    marginTop: 'auto',
    background: '#1a1a25',
    borderRadius: '12px',
    padding: '1.25rem',
    border: '1px solid #2a2a3a',
  },
  subscriptionTitle: {
    fontWeight: 700,
    marginBottom: '0.25rem',
  },
  subscriptionDesc: {
    fontSize: '0.85rem',
    color: '#606070',
    marginBottom: '1rem',
  },
  progressBar: {
    height: '4px',
    background: '#2a2a3a',
    borderRadius: '2px',
    overflow: 'hidden',
    marginBottom: '0.5rem',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #9945ff, #14f195)',
    borderRadius: '2px',
  },
  subscriptionMeta: {
    fontSize: '0.75rem',
    color: '#606070',
  },
};
