import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Language Store
 * Manages application language and localization
 */

// Available languages
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    flag: '🇮🇳',
    direction: 'ltr',
  },
  mr: {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    direction: 'ltr',
  },
  gu: {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳',
    direction: 'ltr',
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    direction: 'ltr',
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    direction: 'ltr',
  },
  kn: {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    direction: 'ltr',
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    direction: 'ltr',
  },
};

// Browser language detection
const detectBrowserLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0]; // e.g., 'en-US' -> 'en'
  
  return LANGUAGES[langCode] ? langCode : 'en';
};

const useLanguageStore = create(
  persist(
    (set, get) => ({
      // State
      language: 'en',
      previousLanguage: null,
      isRTL: false,

      // Actions

      /**
       * Set application language
       * @param {string} languageCode - Language code (e.g., 'en', 'hi')
       */
      setLanguage: (languageCode) => {
        if (!LANGUAGES[languageCode]) {
          console.warn(`Language "${languageCode}" not supported. Falling back to English.`);
          languageCode = 'en';
        }

        const currentLang = get().language;
        const newLang = LANGUAGES[languageCode];

        set({
          language: languageCode,
          previousLanguage: currentLang,
          isRTL: newLang.direction === 'rtl',
        });

        // Update document direction
        if (typeof document !== 'undefined') {
          document.documentElement.dir = newLang.direction;
          document.documentElement.lang = languageCode;
        }

        // Store in localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('preferredLanguage', languageCode);
        }
      },

      /**
       * Get current language object
       * @returns {object} Language object
       */
      getCurrentLanguage: () => {
        const langCode = get().language;
        return LANGUAGES[langCode];
      },

      /**
       * Get language name
       * @param {string} code - Language code (optional, uses current if not provided)
       * @returns {string} Language name
       */
      getLanguageName: (code) => {
        const langCode = code || get().language;
        return LANGUAGES[langCode]?.nativeName || 'English';
      },

      /**
       * Toggle between languages
       * @param {array} languages - Array of language codes to cycle through
       */
      toggleLanguage: (languages = ['en', 'hi', 'mr']) => {
        const current = get().language;
        const currentIndex = languages.indexOf(current);
        const nextIndex = (currentIndex + 1) % languages.length;
        get().setLanguage(languages[nextIndex]);
      },

      /**
       * Restore previous language
       */
      restorePreviousLanguage: () => {
        const prevLang = get().previousLanguage;
        if (prevLang) {
          get().setLanguage(prevLang);
        }
      },

      /**
       * Get all available languages
       * @returns {object} All languages
       */
      getAvailableLanguages: () => {
        return LANGUAGES;
      },

      /**
       * Check if language is supported
       * @param {string} languageCode - Language code
       * @returns {boolean}
       */
      isLanguageSupported: (languageCode) => {
        return !!LANGUAGES[languageCode];
      },

      /**
       * Detect and set browser language
       */
      detectLanguage: () => {
        const detected = detectBrowserLanguage();
        get().setLanguage(detected);
      },

      /**
       * Get language direction
       * @returns {string} 'ltr' or 'rtl'
       */
      getDirection: () => {
        return get().isRTL ? 'rtl' : 'ltr';
      },

      /**
       * Format number according to locale
       * @param {number} number - Number to format
       * @param {object} options - Intl.NumberFormat options
       * @returns {string} Formatted number
       */
      formatNumber: (number, options = {}) => {
        const lang = get().language;
        const locale = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
        return new Intl.NumberFormat(locale, options).format(number);
      },

      /**
       * Format date according to locale
       * @param {Date|string} date - Date to format
       * @param {object} options - Intl.DateTimeFormat options
       * @returns {string} Formatted date
       */
      formatDate: (date, options = {}) => {
        const lang = get().language;
        const locale = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return new Intl.DateTimeFormat(locale, options).format(dateObj);
      },

      /**
       * Format currency according to locale
       * @param {number} amount - Amount to format
       * @param {string} currency - Currency code (default: 'INR')
       * @returns {string} Formatted currency
       */
      formatCurrency: (amount, currency = 'INR') => {
        const lang = get().language;
        const locale = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
        }).format(amount);
      },
    }),
    {
      name: 'language-storage', // localStorage key
      partialize: (state) => ({
        language: state.language,
      }),
    }
  )
);

export { useLanguageStore }