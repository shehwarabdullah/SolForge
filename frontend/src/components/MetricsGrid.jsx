import React from 'react';

export default function MetricsGrid({ walletConnected, metrics, formatNumber }) {
  return (
    <div style={styles.metricsGrid}>
      <div style={styles.metricCard}>
        <div style={styles.metricLabel}>Total Tokens</div>
        <div style={styles.metricValue}>{walletConnected ? metrics.totalTokens : '-'}</div>
        <div style={styles.metricChange}>+2 this month</div>
      </div>
      <div style={styles.metricCard}>
        <div style={styles.metricLabel}>Total Holders</div>
        <div style={styles.metricValue}>{walletConnected ? formatNumber(metrics.totalHolders) : '-'}</div>
        <div style={styles.metricChange}>+18.2%</div>
      </div>
      <div style={styles.metricCard}>
        <div style={styles.metricLabel}>24h Volume</div>
        <div style={styles.metricValue}>{walletConnected ? `$${formatNumber(metrics.volume24h)}` : '-'}</div>
        <div style={styles.metricChange}>+24.7%</div>
      </div>
      <div style={styles.metricCard}>
        <div style={styles.metricLabel}>Total Value</div>
        <div style={styles.metricValue}>{walletConnected ? `$${formatNumber(metrics.totalValue)}` : '-'}</div>
        <div style={styles.metricChange}>+12.1%</div>
      </div>
    </div>
  );
}

const styles = {
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  metricCard: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: '12px',
    padding: '1.5rem',
  },
  metricLabel: {
    fontSize: '0.85rem',
    color: '#606070',
    marginBottom: '0.5rem',
  },
  metricValue: {
    fontSize: '1.75rem',
    fontWeight: 700,
    fontFamily: "'Space Mono', monospace",
  },
  metricChange: {
    fontSize: '0.85rem',
    color: '#14f195',
    marginTop: '0.25rem',
  },
};
