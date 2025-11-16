/**
 * Translations
 * Centralized translation strings for the application
 */

export const TRANSLATIONS = {
  // Common translations
  common: {
    en: {
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      clear: 'Clear',
      select: 'Select',
      upload: 'Upload',
      download: 'Download',
      share: 'Share',
      copy: 'Copy',
      copied: 'Copied!',
      view: 'View',
      more: 'More',
      less: 'Less',
      all: 'All',
      none: 'None',
    },
    hi: {
      yes: 'हां',
      no: 'नहीं',
      ok: 'ठीक है',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      close: 'बंद करें',
      back: 'वापस',
      next: 'अगला',
      submit: 'जमा करें',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      warning: 'चेतावनी',
      info: 'जानकारी',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      sort: 'क्रमबद्ध करें',
      clear: 'साफ़ करें',
      select: 'चुनें',
      upload: 'अपलोड करें',
      download: 'डाउनलोड करें',
      share: 'साझा करें',
      copy: 'कॉपी करें',
      copied: 'कॉपी किया गया!',
      view: 'देखें',
      more: 'अधिक',
      less: 'कम',
      all: 'सभी',
      none: 'कोई नहीं',
    },
    mr: {
      yes: 'होय',
      no: 'नाही',
      ok: 'ठीक आहे',
      cancel: 'रद्द करा',
      save: 'जतन करा',
      delete: 'हटवा',
      edit: 'संपादित करा',
      close: 'बंद करा',
      back: 'मागे',
      next: 'पुढे',
      submit: 'सबमिट करा',
      loading: 'लोड होत आहे...',
      error: 'त्रुटी',
      success: 'यश',
      warning: 'चेतावणी',
      info: 'माहिती',
      search: 'शोधा',
      filter: 'फिल्टर',
      sort: 'क्रमवारी लावा',
      clear: 'साफ करा',
      select: 'निवडा',
      upload: 'अपलोड करा',
      download: 'डाउनलोड करा',
      share: 'सामायिक करा',
      copy: 'कॉपी करा',
      copied: 'कॉपी केले!',
      view: 'पहा',
      more: 'अधिक',
      less: 'कमी',
      all: 'सर्व',
      none: 'काहीही नाही',
    },
  },

  // Status translations
  status: {
    en: {
      pending: 'Pending',
      processing: 'Processing',
      completed: 'Completed',
      failed: 'Failed',
      cancelled: 'Cancelled',
      active: 'Active',
      inactive: 'Inactive',
    },
    hi: {
      pending: 'लंबित',
      processing: 'प्रोसेसिंग',
      completed: 'पूर्ण',
      failed: 'विफल',
      cancelled: 'रद्द',
      active: 'सक्रिय',
      inactive: 'निष्क्रिय',
    },
    mr: {
      pending: 'प्रलंबित',
      processing: 'प्रक्रिया',
      completed: 'पूर्ण',
      failed: 'अयशस्वी',
      cancelled: 'रद्द',
      active: 'सक्रिय',
      inactive: 'निष्क्रिय',
    },
  },

  // Time translations
  time: {
    en: {
      now: 'Now',
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      lastWeek: 'Last Week',
      lastMonth: 'Last Month',
      minutes: 'minutes',
      hours: 'hours',
      days: 'days',
      weeks: 'weeks',
      months: 'months',
      years: 'years',
      ago: 'ago',
    },
    hi: {
      now: 'अभी',
      today: 'आज',
      yesterday: 'कल',
      tomorrow: 'कल',
      thisWeek: 'इस सप्ताह',
      thisMonth: 'इस महीने',
      lastWeek: 'पिछले सप्ताह',
      lastMonth: 'पिछले महीने',
      minutes: 'मिनट',
      hours: 'घंटे',
      days: 'दिन',
      weeks: 'सप्ताह',
      months: 'महीने',
      years: 'साल',
      ago: 'पहले',
    },
    mr: {
      now: 'आत्ता',
      today: 'आज',
      yesterday: 'काल',
      tomorrow: 'उद्या',
      thisWeek: 'या आठवड्यात',
      thisMonth: 'या महिन्यात',
      lastWeek: 'मागील आठवड्यात',
      lastMonth: 'मागील महिन्यात',
      minutes: 'मिनिटे',
      hours: 'तास',
      days: 'दिवस',
      weeks: 'आठवडे',
      months: 'महिने',
      years: 'वर्षे',
      ago: 'आधी',
    },
  },

  // Validation messages
  validation: {
    en: {
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email',
      invalidPhone: 'Please enter a valid phone number',
      minLength: 'Must be at least {min} characters',
      maxLength: 'Must be at most {max} characters',
      passwordMismatch: 'Passwords do not match',
      invalidFormat: 'Invalid format',
      fileTooLarge: 'File is too large',
      invalidFileType: 'Invalid file type',
    },
    hi: {
      required: 'यह फ़ील्ड आवश्यक है',
      invalidEmail: 'कृपया एक मान्य ईमेल दर्ज करें',
      invalidPhone: 'कृपया एक मान्य फ़ोन नंबर दर्ज करें',
      minLength: 'कम से कम {min} वर्ण होने चाहिए',
      maxLength: 'अधिकतम {max} वर्ण होने चाहिए',
      passwordMismatch: 'पासवर्ड मेल नहीं खाते',
      invalidFormat: 'अमान्य प्रारूप',
      fileTooLarge: 'फ़ाइल बहुत बड़ी है',
      invalidFileType: 'अमान्य फ़ाइल प्रकार',
    },
    mr: {
      required: 'हे फील्ड आवश्यक आहे',
      invalidEmail: 'कृपया वैध ईमेल प्रविष्ट करा',
      invalidPhone: 'कृपया वैध फोन नंबर प्रविष्ट करा',
      minLength: 'किमान {min} वर्ण असणे आवश्यक',
      maxLength: 'कमाल {max} वर्ण असणे आवश्यक',
      passwordMismatch: 'पासवर्ड जुळत नाहीत',
      invalidFormat: 'अवैध स्वरूप',
      fileTooLarge: 'फाइल खूप मोठी आहे',
      invalidFileType: 'अवैध फाइल प्रकार',
    },
  },

  // Error messages
  errors: {
    en: {
      general: 'Something went wrong',
      network: 'Network error. Please check your connection',
      server: 'Server error. Please try again later',
      notFound: 'Not found',
      unauthorized: 'Unauthorized access',
      forbidden: 'Access forbidden',
      timeout: 'Request timeout',
      uploadFailed: 'Upload failed',
      analysisFailed: 'Analysis failed',
    },
    hi: {
      general: 'कुछ गलत हो गया',
      network: 'नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें',
      server: 'सर्वर त्रुटि। कृपया बाद में पुनः प्रयास करें',
      notFound: 'नहीं मिला',
      unauthorized: 'अनधिकृत पहुंच',
      forbidden: 'पहुंच निषिद्ध',
      timeout: 'अनुरोध समय समाप्त',
      uploadFailed: 'अपलोड विफल',
      analysisFailed: 'विश्लेषण विफल',
    },
    mr: {
      general: 'काहीतरी चूक झाली',
      network: 'नेटवर्क त्रुटी. कृपया तुमचे कनेक्शन तपासा',
      server: 'सर्व्हर त्रुटी. कृपया नंतर पुन्हा प्रयत्न करा',
      notFound: 'आढळले नाही',
      unauthorized: 'अनधिकृत प्रवेश',
      forbidden: 'प्रवेश निषिद्ध',
      timeout: 'विनंती कालबाह्य',
      uploadFailed: 'अपलोड अयशस्वी',
      analysisFailed: 'विश्लेषण अयशस्वी',
    },
  },

  // Success messages
  success: {
    en: {
      saved: 'Saved successfully',
      uploaded: 'Uploaded successfully',
      deleted: 'Deleted successfully',
      updated: 'Updated successfully',
      sent: 'Sent successfully',
      completed: 'Completed successfully',
    },
    hi: {
      saved: 'सफलतापूर्वक सहेजा गया',
      uploaded: 'सफलतापूर्वक अपलोड किया गया',
      deleted: 'सफलतापूर्वक हटाया गया',
      updated: 'सफलतापूर्वक अपडेट किया गया',
      sent: 'सफलतापूर्वक भेजा गया',
      completed: 'सफलतापूर्वक पूर्ण',
    },
    mr: {
      saved: 'यशस्वीरित्या जतन केले',
      uploaded: 'यशस्वीरित्या अपलोड केले',
      deleted: 'यशस्वीरित्या हटवले',
      updated: 'यशस्वीरित्या अद्यतनित केले',
      sent: 'यशस्वीरित्या पाठवले',
      completed: 'यशस्वीरित्या पूर्ण',
    },
  },
};

/**
 * Get translation string
 * @param {string} category - Translation category
 * @param {string} key - Translation key
 * @param {string} language - Language code
 * @param {object} params - Parameters for interpolation
 * @returns {string} Translated string
 */
export const translate = (category, key, language = 'en', params = {}) => {
  let text = TRANSLATIONS[category]?.[language]?.[key] 
    || TRANSLATIONS[category]?.en?.[key] 
    || key;

  // Replace parameters
  Object.keys(params).forEach((param) => {
    text = text.replace(`{${param}}`, params[param]);
  });

  return text;
};

/**
 * Get translation object for a category
 * @param {string} category - Translation category
 * @param {string} language - Language code
 * @returns {object} Translation object
 */
export const getTranslations = (category, language = 'en') => {
  return TRANSLATIONS[category]?.[language] || TRANSLATIONS[category]?.en || {};
};

/**
 * Check if translation exists
 * @param {string} category - Translation category
 * @param {string} key - Translation key
 * @param {string} language - Language code
 * @returns {boolean}
 */
export const hasTranslation = (category, key, language = 'en') => {
  return !!(TRANSLATIONS[category]?.[language]?.[key]);
};

/**
 * Get all available languages
 * @returns {array} Array of language codes
 */
export const getAvailableLanguages = () => {
  return Object.keys(TRANSLATIONS.common);
};

/**
 * Format relative time
 * @param {Date|string} date - Date to format
 * @param {string} language - Language code
 * @returns {string} Formatted relative time
 */
export const formatRelativeTime = (date, language = 'en') => {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  const t = TRANSLATIONS.time[language] || TRANSLATIONS.time.en;

  if (diffMins < 1) return t.now;
  if (diffMins < 60) return `${diffMins} ${t.minutes} ${t.ago}`;
  if (diffHours < 24) return `${diffHours} ${t.hours} ${t.ago}`;
  if (diffDays === 1) return t.yesterday;
  if (diffDays < 7) return `${diffDays} ${t.days} ${t.ago}`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} ${t.weeks} ${t.ago}`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} ${t.months} ${t.ago}`;
  return `${Math.floor(diffDays / 365)} ${t.years} ${t.ago}`;
};

export default {
  TRANSLATIONS,
  translate,
  getTranslations,
  hasTranslation,
  getAvailableLanguages,
  formatRelativeTime,
};