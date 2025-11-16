import { Scale, Menu, Bell, User } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useLanguageStore } from '../../store/languageStore';
import { useAuthStore } from '../../store/authStore';
import LanguageSelector from '../common/LanguageSelector';
import { AudioToggle } from '../common/AudioPlayer';

// Translation object for header
const HEADER_TRANSLATIONS = {
  en: {
    appName: 'Legal Aid Assistant',
    tagline: 'Legal help for everyone',
    notifications: 'Notifications',
    profile: 'Profile',
  },
  hi: {
    appName: 'कानूनी सहायता सहायक',
    tagline: 'सभी के लिए कानूनी मदद',
    notifications: 'सूचनाएं',
    profile: 'प्रोफ़ाइल',
  },
  mr: {
    appName: 'कायदेशीर मदत सहाय्यक',
    tagline: 'प्रत्येकासाठी कायदेशीर मदत',
    notifications: 'सूचना',
    profile: 'प्रोफाइल',
  },
  gu: {
    appName: 'કાનૂની સહાય સહાયક',
    tagline: 'દરેક માટે કાનૂની મદદ',
    notifications: 'સૂચનાઓ',
    profile: 'પ્રોફાઇલ',
  },
  ta: {
    appName: 'சட்ட உதவி உதவியாளர்',
    tagline: 'அனைவருக்கும் சட்ட உதவி',
    notifications: 'அறிவிப்புகள்',
    profile: 'சுயவிவரம்',
  },
  te: {
    appName: 'న్యాయ సహాయ సహాయకుడు',
    tagline: 'అందరికీ న్యాయ సహాయం',
    notifications: 'నోటిఫికేషన్లు',
    profile: 'ప్రొఫైల్',
  },
  kn: {
    appName: 'ಕಾನೂನು ನೆರವು ಸಹಾಯಕ',
    tagline: 'ಎಲ್ಲರಿಗೂ ಕಾನೂನು ಸಹಾಯ',
    notifications: 'ಅಧಿಸೂಚನೆಗಳು',
    profile: 'ಪ್ರೊಫೈಲ್',
  },
  bn: {
    appName: 'আইনি সহায়তা সহায়ক',
    tagline: 'সবার জন্য আইনি সাহায্য',
    notifications: 'বিজ্ঞপ্তি',
    profile: 'প্রোফাইল',
  },
};

const Header = () => {
  const { toggleSidebar } = useUIStore();
  const { language } = useLanguageStore();
  const { isAuthenticated, user } = useAuthStore();
  const t = HEADER_TRANSLATIONS[language] || HEADER_TRANSLATIONS.en;

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Menu */}
          <div className="flex items-center gap-3 button-spacing3">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-blue-500 rounded-lg transition-colors active:scale-95"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo & App Name */}
            <div className="flex items-center gap-3 margin-side">
              <div className="bg-white bg-opacity-20 rounded-lg">
                <Scale size={32} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold leading-tight">
                  {t.appName}
                </h1>
                <p className="text-xs md:text-sm text-blue-100 hidden md:block">
                  {t.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2 md:gap-3 margin-side">
            {/* Audio Toggle */}
            <AudioToggle />

            {/* Language Selector */}
            <LanguageSelector />

            {/* Notifications */}
            {isAuthenticated && (
              <button
                className="relative p-2 hover:bg-blue-500 rounded-lg transition-colors"
                aria-label={t.notifications}
                title={t.notifications}
              >
                <Bell size={20} />
                {/* Notification Badge */}
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-blue-700"></span>
              </button>
            )}

            {/* User Profile */}
            {isAuthenticated ? (
              <button
                className="flex items-center gap-2 p-2 button-spacing hover:bg-blue-500 rounded-lg transition-colors"
                aria-label={t.profile}
                title={t.profile}
              >
                <div className="hidden md:flex flex-col items-end text-right">
                  <span className="text-sm font-semibold button-spacing">
                    {user?.name || user?.phone || 'User'}
                  </span>
                  <span className="text-xs text-blue-200 button-spacing">
                    {t.profile}
                  </span>
                </div>
                <div className="bg-white bg-opacity-20 p-2 button-spacing rounded-full">
                  <User size={20} />
                </div>
              </button>
            ) : (
              <button className="hidden md:flex items-center button-spacing gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Optional: Progress Bar for analyzing documents */}
      {/* <div className="h-1 bg-blue-900">
        <div className="h-full bg-yellow-400 w-1/2 transition-all"></div>
      </div> */}
    </header>
  );
};

export default Header;