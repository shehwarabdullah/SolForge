import React from 'react';

export default function AirdropForm({ tokens }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardTitle}>Airdrop Manager</span>
      </div>
      <div style={styles.airdropForm}>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Select Token</label>
          <select style={styles.formSelect}>
            <option>Select a token...</option>
            {tokens.map((t, i) => (
              <option key={i} value={t.mint}>{t.name} ({t.symbol})</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Recipients (one address per line)</label>
          <textarea 
            style={{...styles.formInput, minHeight: '120px'}}
            placeholder="Enter wallet addresses..."
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Amount per recipient</label>
          <input type="number" style={styles.formInput} placeholder="100" />
        </div>
        <button style={{...styles.btn, ...styles.btnPrimary}}>
          🎯 Execute Airdrop
        </button>
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
  airdropForm: {
    maxWidth: '600px',
  },
  formGroup: {
    marginBottom: '1.25rem',
  },
  formLabel: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
  },
  formInput: {
    width: '100%',
    background: '#1a1a25',
    border: '1px solid #2a2a3a',
    borderRadius: '8px',
    padding: '0.875rem 1rem',
    color: '#ffffff',
    fontFamily: 'inherit',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  formSelect: {
    width: '100%',
    background: '#1a1a25',
    border: '1px solid #2a2a3a',
    borderRadius: '8px',
    padding: '0.875rem 1rem',
    color: '#ffffff',
    fontFamily: 'inherit',
    fontSize: '1rem',
    outline: 'none',
    cursor: 'pointer',
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
