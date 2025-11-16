/**
 * Application Constants
 * Global constants used throughout the application
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// File Upload Configuration
export const FILE_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.pdf'],
  IMAGE_MAX_DIMENSION: 4096, // pixels
};

// Document Status
export const DOCUMENT_STATUS = {
  PENDING: 'pending',
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

// Document Priorities
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

// Timeline Options
export const TIMELINE_OPTIONS = {
  IMMEDIATE: 'immediate',
  THIS_WEEK: 'week',
  THIS_MONTH: 'month',
  FLEXIBLE: 'flexible',
};

// Key Point Types
export const KEY_POINT_TYPES = {
  IMPORTANT: 'important',
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  NEUTRAL: 'neutral',
};

// Reading Levels
export const READING_LEVELS = {
  ELEMENTARY: 'elementary',
  SIMPLE: 'simple',
  STANDARD: 'standard',
  TECHNICAL: 'technical',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
};

// Date Formats
export const DATE_FORMATS = {
  FULL: 'MMMM DD, YYYY',
  SHORT: 'MMM DD, YYYY',
  COMPACT: 'MM/DD/YYYY',
  TIME: 'hh:mm A',
  DATETIME: 'MMM DD, YYYY hh:mm A',
  ISO: 'YYYY-MM-DD',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH: 'auth-storage',
  DOCUMENTS: 'document-storage',
  LANGUAGE: 'language-storage',
  UI: 'ui-storage',
  THEME: 'theme-preference',
  RECENT_SEARCHES: 'recent-searches',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  UPLOAD: '/upload',
  ANALYSIS: '/analysis',
  HISTORY: '/history',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  HELP: '/help',
  LOGIN: '/login',
  REGISTER: '/register',
  TERMS: '/terms',
  PRIVACY: '/privacy',
};

// Breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// OTP Configuration
export const OTP_CONFIG = {
  LENGTH: 6,
  EXPIRY_TIME: 300, // 5 minutes in seconds
  RESEND_DELAY: 30, // 30 seconds
  MAX_ATTEMPTS: 3,
};

// Chat Configuration
export const CHAT_CONFIG = {
  MAX_MESSAGE_LENGTH: 500,
  TYPING_INDICATOR_DELAY: 1000, // ms
  MESSAGE_BATCH_SIZE: 20,
  AUTO_SCROLL_THRESHOLD: 100, // pixels from bottom
};

// Confidence Thresholds
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 85,
  MEDIUM: 70,
  LOW: 50,
};

// Color Scheme
export const COLORS = {
  PRIMARY: '#2563eb', // blue-600
  SECONDARY: '#7c3aed', // violet-600
  SUCCESS: '#16a34a', // green-600
  WARNING: '#ea580c', // orange-600
  ERROR: '#dc2626', // red-600
  INFO: '#0891b2', // cyan-600
};

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'support@legalaid.com',
  PHONE: '+91 123 456 7890',
  ADDRESS: 'Ashta, Madhya Pradesh, India',
  SUPPORT_HOURS: '9 AM - 6 PM IST (Mon-Fri)',
};

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/legalaid',
  TWITTER: 'https://twitter.com/legalaid',
  INSTAGRAM: 'https://instagram.com/legalaid',
  LINKEDIN: 'https://linkedin.com/company/legalaid',
};

// Feature Flags
export const FEATURES = {
  CHAT_ENABLED: true,
  VOICE_INPUT_ENABLED: true,
  FILE_UPLOAD_ENABLED: true,
  NOTIFICATIONS_ENABLED: true,
  ANALYTICS_ENABLED: false,
  BETA_FEATURES: false,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  AUTH_FAILED: 'Authentication failed. Please login again.',
  FILE_TOO_LARGE: 'File is too large. Maximum size is 10MB.',
  INVALID_FILE_TYPE: 'Invalid file type. Only images and PDFs are allowed.',
  UPLOAD_FAILED: 'Upload failed. Please try again.',
  ANALYSIS_FAILED: 'Analysis failed. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  UPLOAD_SUCCESS: 'Document uploaded successfully!',
  ANALYSIS_COMPLETE: 'Analysis completed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  DOCUMENT_DELETED: 'Document deleted successfully!',
};

// Regex Patterns
export const REGEX_PATTERNS = {
  PHONE: /^[6-9]\d{9}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  OTP: /^\d{6}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
};

// Country Codes
export const COUNTRY_CODES = {
  INDIA: '+91',
  USA: '+1',
  UK: '+44',
};

// App Metadata
export const APP_INFO = {
  NAME: 'Legal Aid Assistant',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI-powered legal document analysis for rural India',
  AUTHOR: 'Legal Aid Team',
  COPYRIGHT: '© 2024 Legal Aid Assistant. All rights reserved.',
};

// External Services
export const EXTERNAL_SERVICES = {
  GOOGLE_TRANSLATE_API: 'https://translation.googleapis.com',
  OCR_API: 'https://api.ocr.space',
  SPEECH_TO_TEXT_API: 'https://api.speech.googleapis.com',
};

// Cache Duration (ms)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
};

// Rate Limiting
export const RATE_LIMITS = {
  UPLOADS_PER_DAY: 50,
  ANALYSES_PER_DAY: 100,
  API_REQUESTS_PER_MINUTE: 60,
};

export default {
  API_CONFIG,
  FILE_CONFIG,
  DOCUMENT_STATUS,
  PRIORITY_LEVELS,
  TIMELINE_OPTIONS,
  KEY_POINT_TYPES,
  READING_LEVELS,
  NOTIFICATION_TYPES,
  USER_ROLES,
  PAGINATION,
  DATE_FORMATS,
  STORAGE_KEYS,
  ROUTES,
  BREAKPOINTS,
  ANIMATION_DURATION,
  OTP_CONFIG,
  CHAT_CONFIG,
  CONFIDENCE_THRESHOLDS,
  COLORS,
  CONTACT_INFO,
  SOCIAL_LINKS,
  FEATURES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  REGEX_PATTERNS,
  COUNTRY_CODES,
  APP_INFO,
  EXTERNAL_SERVICES,
  CACHE_DURATION,
  RATE_LIMITS,
};