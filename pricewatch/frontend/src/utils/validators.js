// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Indian format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

// Validate property form
export const validatePropertyForm = (form) => {
  const errors = {};
  
  if (!form.area || form.area === '') {
    errors.area = 'Please select an area';
  }
  
  if (!form.propertyType) {
    errors.propertyType = 'Please select property type';
  }
  
  if (!form.size || parseFloat(form.size) <= 0) {
    errors.size = 'Size must be greater than 0';
  }
  
  if (!form.bedrooms || parseInt(form.bedrooms) < 0) {
    errors.bedrooms = 'Invalid number of bedrooms';
  }
  
  if (!form.bathrooms || parseInt(form.bathrooms) < 0) {
    errors.bathrooms = 'Invalid number of bathrooms';
  }
  
  if (!form.yearBuilt || parseInt(form.yearBuilt) < 1900 || parseInt(form.yearBuilt) > new Date().getFullYear()) {
    errors.yearBuilt = 'Invalid year';
  }
  
  if (!form.age || parseInt(form.age) < 0) {
    errors.age = 'Invalid age';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate file upload
export const validateFileUpload = (file, allowedTypes, maxSizeMB = 10) => {
  const errors = [];
  
  if (!file) {
    errors.push('No file selected');
    return { isValid: false, errors };
  }
  
  // Check file type
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    errors.push(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
  }
  
  // Check file size
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxSizeMB) {
    errors.push(`File size exceeds ${maxSizeMB}MB`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate search query
export const validateSearchQuery = (query) => {
  if (!query || query.trim().length < 2) {
    return {
      isValid: false,
      error: 'Search query must be at least 2 characters'
    };
  }
  
  return { isValid: true };
};

// Validate price range
export const validatePriceRange = (min, max) => {
  const errors = [];
  
  if (min < 0) {
    errors.push('Minimum price cannot be negative');
  }
  
  if (max < 0) {
    errors.push('Maximum price cannot be negative');
  }
  
  if (min >= max) {
    errors.push('Minimum price must be less than maximum price');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitize input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};
