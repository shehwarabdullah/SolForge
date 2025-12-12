// Format number with commas
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Show notification
export const showNotification = (message, type = 'success') => {
  return { message, type };
};
