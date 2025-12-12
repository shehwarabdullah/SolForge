import React from 'react';

export default function Chart() {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardTitle}>Token Performance</span>
        <div style={styles.chartLegend}>
          <span style={styles.legendItem}>
            <span style={{...styles.legendDot, background: '#9945ff'}} /> Volume
          </span>
          <span style={styles.legendItem}>
            <span style={{...styles.legendDot, background: '#14f195'}} /> Holders
          </span>
        </div>
      </div>
      <div style={styles.chartContainer}>
        <svg viewBox="0 0 800 200" style={styles.chartSvg}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9945ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#9945ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14f195" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#14f195" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,180 Q100,160 200,140 T400,100 T600,80 T800,40" stroke="#9945ff" strokeWidth="2" fill="none" />
          <path d="M0,190 Q100,180 200,160 T400,130 T600,110 T800,70 L800,200 L0,200 Z" fill="url(#grad2)" />
          <path d="M0,190 Q100,180 200,160 T400,130 T600,110 T800,70" stroke="#14f195" strokeWidth="2" fill="none" />
        </svg>
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
  chartLegend: {
    display: 'flex',
    gap: '1.5rem',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: '#a0a0b0',
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  chartContainer: {
    height: '200px',
    position: 'relative',
  },
  chartSvg: {
    width: '100%',
    height: '100%',
  },
};
