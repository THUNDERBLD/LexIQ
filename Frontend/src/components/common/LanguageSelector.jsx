import { Globe } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';

const LANGUAGES = {
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  hi: { name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  mr: { name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  gu: { name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  te: { name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
};

const LanguageSelector = ({ className = '', showLabel = false }) => {
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    
    // Optional: Store preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', newLang);
    }
  };

  return (
    <div className={`flex items-center gap-2 bg-white rounded-lg shadow-sm p-2 button-spacing ${className}`}>
      <Globe size={20} className="text-gray-600 flex-shrink-0" />
      
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          Language:
        </span>
      )}
      
      <select
        value={language}
        onChange={handleLanguageChange}
        className="bg-transparent border-none outline-none font-medium cursor-pointer text-gray-800 pr-2"
        aria-label="Select Language"
      >
        {Object.entries(LANGUAGES).map(([code, lang]) => (
          <option key={code} value={code}>
            {lang.flag} {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
export { LANGUAGES };