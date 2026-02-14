// Format price in Indian currency format
export const formatPrice = (price) => {
  if (!price || price === 0) return '₹0';
  
  const num = parseFloat(price);
  
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} L`;
  } else if (num >= 1000) {
    return `₹${(num / 1000).toFixed(2)} K`;
  }
  
  return `₹${num.toLocaleString('en-IN')}`;
};

// Format number with Indian comma system
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

// Format percentage
export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Calculate price per square foot
export const calculatePricePerSqft = (price, sqft) => {
  if (!price || !sqft) return 0;
  return Math.round(price / sqft);
};

// Format area/size
export const formatArea = (sqft) => {
  return `${formatNumber(sqft)} sq ft`;
};

// Format bedroom/bathroom count
export const formatBHK = (bedrooms) => {
  return `${bedrooms} BHK`;
};

// Calculate value score (0-10)
export const calculateValueScore = (actualPrice, marketPrice) => {
  if (!actualPrice || !marketPrice) return 0;
  const ratio = actualPrice / marketPrice;
  
  if (ratio <= 0.85) return 10;
  if (ratio <= 0.90) return 9;
  if (ratio <= 0.95) return 8;
  if (ratio <= 1.00) return 7;
  if (ratio <= 1.05) return 6;
  if (ratio <= 1.10) return 5;
  if (ratio <= 1.15) return 4;
  return 3;
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get growth indicator color
export const getGrowthColor = (percentage) => {
  if (percentage >= 10) return 'text-green-600';
  if (percentage >= 5) return 'text-green-500';
  if (percentage >= 0) return 'text-green-400';
  if (percentage >= -5) return 'text-amber-500';
  return 'text-red-500';
};

// Get sentiment color
export const getSentimentColor = (sentiment) => {
  const colors = {
    'Strong Buy': 'bg-green-100 text-green-700',
    'Buy': 'bg-green-50 text-green-600',
    'Hold': 'bg-amber-100 text-amber-700',
    'Sell': 'bg-red-50 text-red-600',
    'Strong Sell': 'bg-red-100 text-red-700'
  };
  return colors[sentiment] || 'bg-gray-100 text-gray-700';
};
