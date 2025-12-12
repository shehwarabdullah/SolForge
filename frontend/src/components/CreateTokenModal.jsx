import React from 'react';

export default function CreateTokenModal({ 
  show, 
onClose, 
onSubmit, 
  tokenForm, 
onFormChange, 
  loading 
}) {
  if (!show) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.modalClose} onClick={onClose}>×</button>
        <h2 style={styles.modalTitle}>Create New Token</h2>
        <form onSubmit={onSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Token Name *</label>
            <input
              type="text"
              style={styles.formInput}
              placeholder="e.g., My Awesome Token"
              value={tokenForm.name}
              onChange={e => onFormChange({...tokenForm, name: e.target.value})}
              required
            />
          </div>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Symbol *</label>
              <input
                type="text"
                style={styles.formInput}
                placeholder="e.g., MAT"
                maxLength={10}
                value={tokenForm.symbol}
                onChange={e => onFormChange({...tokenForm, symbol: e.target.value.toUpperCase()})}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Decimals</label>
              <input
                type="number"
                style={styles.formInput}
                placeholder="9"
                min={0}
                max={18}
                value={tokenForm.decimals}
                onChange={e => onFormChange({...tokenForm, decimals: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Total Supply *</label>
            <input
              type="number"
              style={styles.formInput}
              placeholder="1,000,000,000"
              value={tokenForm.supply}
              onChange={e => onFormChange({...tokenForm, supply: e.target.value})}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Description</label>
            <textarea
              style={{...styles.formInput, minHeight: '80px'}}
              placeholder="Describe your token project..."
              value={tokenForm.description}
              onChange={e => onFormChange({...tokenForm, description: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            style={{...styles.btn, ...styles.btnPrimary, width: '100%', justifyContent: 'center'}}
            disabled={loading}
          >
            {loading ? '⏳ Creating...' : '🚀 Deploy Token'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: '16px',
    padding: '2rem',
    maxWidth: '500px',
    width: '90%',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalClose: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    color: '#606070',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
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
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
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
