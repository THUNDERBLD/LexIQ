/**
 * Formatters
 * Utility functions for formatting data
 */

/**
 * Format file size to human readable format
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format date to localized string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale code (e.g., 'en-IN', 'hi-IN')
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export const formatDate = (date, locale = 'en-IN', options = {}) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
};

/**
 * Format date to short format
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale code
 * @returns {string} Short formatted date
 */
export const formatDateShort = (date, locale = 'en-IN') => {
  return formatDate(date, locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format time
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale code
 * @returns {string} Formatted time
 */
export const formatTime = (date, locale = 'en-IN') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

/**
 * Format date and time
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale code
 * @returns {string} Formatted date and time
 */
export const formatDateTime = (date, locale = 'en-IN') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffSecs < 60) return 'Just now';
  if (diffMins === 1) return '1 minute ago';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

/**
 * Format currency (Indian Rupee)
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale code
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount, locale = 'en-IN', currency = 'INR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format number with locale
 * @param {number} number - Number to format
 * @param {string} locale - Locale code
 * @param {object} options - Intl.NumberFormat options
 * @returns {string} Formatted number
 */
export const formatNumber = (number, locale = 'en-IN', options = {}) => {
  return new Intl.NumberFormat(locale, options).format(number);
};

/**
 * Format percentage
 * @param {number} value - Value to format (0-100)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 0) => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format phone number (Indian format)
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  // Remove non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Indian phone number format: +91 XXXXX XXXXX
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50, suffix = '...') => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + suffix;
};

/**
 * Capitalize first letter
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Title case (capitalize each word)
 * @param {string} text - Text to convert
 * @returns {string} Title cased text
 */
export const titleCase = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

/**
 * Format OTP display (e.g., "123 456")
 * @param {string} otp - OTP string
 * @returns {string} Formatted OTP
 */
export const formatOTP = (otp) => {
  if (!otp) return '';
  const cleaned = otp.replace(/\D/g, '');
  return cleaned.match(/.{1,3}/g)?.join(' ') || cleaned;
};

/**
 * Format confidence score with color class
 * @param {number} score - Confidence score (0-100)
 * @returns {object} Object with formatted text and color class
 */
export const formatConfidence = (score) => {
  if (score >= 85) {
    return {
      text: 'High',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    };
  } else if (score >= 70) {
    return {
      text: 'Medium',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    };
  } else {
    return {
      text: 'Low',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    };
  }
};

/**
 * Format document status with display info
 * @param {string} status - Document status
 * @returns {object} Object with label, color, icon info
 */
export const formatDocumentStatus = (status) => {
  const statusMap = {
    pending: {
      label: 'Pending',
      color: 'text-gray-600 bg-gray-100',
    },
    uploading: {
      label: 'Uploading',
      color: 'text-blue-600 bg-blue-100',
    },
    processing: {
      label: 'Processing',
      color: 'text-yellow-600 bg-yellow-100',
    },
    completed: {
      label: 'Completed',
      color: 'text-green-600 bg-green-100',
    },
    failed: {
      label: 'Failed',
      color: 'text-red-600 bg-red-100',
    },
  };

  return statusMap[status] || statusMap.pending;
};

/**
 * Format array to comma-separated string
 * @param {array} array - Array to format
 * @param {string} separator - Separator (default: ', ')
 * @param {string} lastSeparator - Last separator (default: ' and ')
 * @returns {string} Formatted string
 */
export const formatList = (array, separator = ', ', lastSeparator = ' and ') => {
  if (!array || array.length === 0) return '';
  if (array.length === 1) return array[0];
  
  const firsts = array.slice(0, array.length - 1);
  const last = array[array.length - 1];
  
  return firsts.join(separator) + lastSeparator + last;
};

/**
 * Format duration in milliseconds to readable format
 * @param {number} ms - Duration in milliseconds
 * @returns {string} Formatted duration
 */
export const formatDuration = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

/**
 * Sanitize filename
 * @param {string} filename - Filename to sanitize
 * @returns {string} Sanitized filename
 */
export const sanitizeFilename = (filename) => {
  return filename
    .replace(/[^a-z0-9.]/gi, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
};

/**
 * Get file extension
 * @param {string} filename - Filename
 * @returns {string} File extension
 */
export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

/**
 * Remove file extension
 * @param {string} filename - Filename
 * @returns {string} Filename without extension
 */
export const removeFileExtension = (filename) => {
  return filename.replace(/\.[^/.]+$/, '');
};

/**
 * Format URL to display domain only
 * @param {string} url - URL to format
 * @returns {string} Domain only
 */
export const formatURL = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
};

/**
 * Format object to query string
 * @param {object} obj - Object to convert
 * @returns {string} Query string
 */
export const objectToQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
};

/**
 * Parse query string to object
 * @param {string} queryString - Query string
 * @returns {object} Parsed object
 */
export const queryStringToObject = (queryString) => {
  const params = new URLSearchParams(queryString);
  const obj = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  return obj;
};

export default {
  formatFileSize,
  formatDate,
  formatDateShort,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatPhoneNumber,
  truncateText,
  capitalize,
  titleCase,
  formatOTP,
  formatConfidence,
  formatDocumentStatus,
  formatList,
  formatDuration,
  sanitizeFilename,
  getFileExtension,
  removeFileExtension,
  formatURL,
  objectToQueryString,
  queryStringToObject,
};