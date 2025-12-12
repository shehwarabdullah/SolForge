import React from 'react';

export default function NotificationToast({ notification }) {
  if (!notification) return null;

  return (
    <div style={{
      ...styles.toast,
      borderColor: notification.type === 'success' ? '#14f195' : '#ff4444'
    }}>
      <span>{notification.type === 'success' ? '✓' : '✕'}</span>
      <span>{notification.message}</span>
    </div>
  );
}

const styles = {
  toast: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    background: '#16161f',
    border: '1px solid #14f195',
    borderRadius: '12px',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    zIndex: 2000,
    animation: 'slideIn 0.3s ease',
  },
};
