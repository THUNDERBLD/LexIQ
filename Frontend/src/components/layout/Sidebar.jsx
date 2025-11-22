import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Upload, 
  History, 
  HelpCircle, 
  Settings, 
  ChevronRight,
  BookOpen,
  Phone,
  LogOut,
  LogIn,
  LayoutDashboard,
  FileSearch,
  UserPlus,
  FileText,
  Shield
} from 'lucide-react';

// Import your actual stores
import { useUIStore } from '../../store/uiStore';
import { useLanguageStore } from '../../store/languageStore';
import useAuthStore from '../../store/authStore';

// Translation object for sidebar
const SIDEBAR_TRANSLATIONS = {
  en: {
    home: 'Home',
    dashboard: 'Dashboard',
    upload: 'Upload Document',
    analysis: 'Analysis',
    history: 'My Documents',
    resources: 'Legal Resources',
    help: 'Help & Support',
    settings: 'Settings',
    contact: 'Contact Us',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    logout: 'Logout',
    login: 'Login',
    signup: 'Sign Up',
  },
  hi: {
    home: 'होम',
    dashboard: 'डैशबोर्ड',
    upload: 'दस्तावेज़ अपलोड करें',
    analysis: 'विश्लेषण',
    history: 'मेरे दस्तावेज़',
    resources: 'कानूनी संसाधन',
    help: 'सहायता और समर्थन',
    settings: 'सेटिंग्स',
    contact: 'हमसे संपर्क करें',
    termsOfService: 'सेवा की शर्तें',
    privacyPolicy: 'गोपनीयता नीति',
    logout: 'लॉगआउट',
    login: 'लॉगिन',
    signup: 'साइन अप करें',
  },
  mr: {
    home: 'मुख्यपृष्ठ',
    dashboard: 'डॅशबोर्ड',
    upload: 'दस्तऐवज अपलोड करा',
    analysis: 'विश्लेषण',
    history: 'माझे दस्तऐवज',
    resources: 'कायदेशीर संसाधने',
    help: 'मदत आणि समर्थन',
    settings: 'सेटिंग्ज',
    contact: 'आमच्याशी संपर्क साधा',
    termsOfService: 'सेवा अटी',
    privacyPolicy: 'गोपनीयता धोरण',
    logout: 'लॉगआउट',
    login: 'लॉगिन',
    signup: 'साइन अप',
  },
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { language } = useLanguageStore();
  const { isAuthenticated, logout } = useAuthStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const t = SIDEBAR_TRANSLATIONS[language] || SIDEBAR_TRANSLATIONS.en;

  const menuItems = [
    { 
      id: 'home',
      path: '/',
      icon: Home, 
      label: t.home,
      color: 'text-blue-400',
      activeColor: 'bg-blue-500',
      showWhen: 'always' // always, auth, guest
    },
    { 
      id: 'dashboard',
      path: '/dashboard',
      icon: LayoutDashboard, 
      label: t.dashboard,
      color: 'text-cyan-400',
      activeColor: 'bg-cyan-500',
      showWhen: 'auth'
    },
    { 
      id: 'upload',
      path: '/upload',
      icon: Upload, 
      label: t.upload,
      color: 'text-green-400',
      activeColor: 'bg-green-500',
      showWhen: 'always'
    },
    { 
      id: 'analysis',
      path: '/analysis',
      icon: FileSearch, 
      label: t.analysis,
      color: 'text-yellow-400',
      activeColor: 'bg-yellow-500',
      showWhen: 'always'
    },
    { 
      id: 'history',
      path: '/history',
      icon: History, 
      label: t.history,
      color: 'text-purple-400',
      activeColor: 'bg-purple-500',
      showWhen: 'auth'
    },
    { 
      id: 'resources',
      path: '/resources',
      icon: BookOpen, 
      label: t.resources,
      color: 'text-orange-400',
      activeColor: 'bg-orange-500',
      showWhen: 'always'
    },
  ];

  const secondaryItems = [
    { 
      id: 'help',
      path: '/help',
      icon: HelpCircle, 
      label: t.help,
      color: 'text-slate-400',
      activeColor: 'bg-slate-600',
      showWhen: 'always'
    },
    { 
      id: 'contact',
      path: '/contact',
      icon: Phone, 
      label: t.contact,
      color: 'text-slate-400',
      activeColor: 'bg-slate-600',
      showWhen: 'always'
    }
  ];

  const footerItems = [
    { 
      id: 'terms',
      path: '/terms-of-service',
      icon: FileText, 
      label: t.termsOfService,
      color: 'text-slate-500',
      showWhen: 'always'
    },
    { 
      id: 'privacy',
      path: '/privacy-policy',
      icon: Shield, 
      label: t.privacyPolicy,
      color: 'text-slate-500',
      showWhen: 'always'
    },
  ];

  const handleLogout = () => {
    // Call logout from store
    logout();
    
    // Navigate to home page
    navigate('/');
    
    // Optional: Show a toast notification
    // showToast('Logged out successfully', 'success');
  };

  // Check if current path matches the menu item
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Filter items based on authentication
  const filterItems = (items) => {
    return items.filter(item => {
      if (item.showWhen === 'always') return true;
      if (item.showWhen === 'auth') return isAuthenticated;
      if (item.showWhen === 'guest') return !isAuthenticated;
      return true;
    });
  };

  const filteredMenuItems = filterItems(menuItems);
  const filteredSecondaryItems = filterItems(secondaryItems);
  const filteredFooterItems = filterItems(footerItems);

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 
          transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-52' : 'w-14'} 
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          shadow-2xl z-50 
          flex flex-col
          overflow-hidden
          border-r border-slate-700/50
        `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Main Navigation */}
        <nav className="overflow-y-auto py-4 px-2 space-y-1 custom-scrollbar">
          {/* Primary Menu Items */}
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  w-full flex items-center gap-4 p-3 rounded-xl
                  transition-all duration-300 group relative
                  ${isActive
                    ? `${item.activeColor} shadow-lg`
                    : 'hover:bg-slate-700/50'
                  }
                  ${isExpanded ? '' : 'justify-center'}
                `}
              >
                <div className={`
                  flex-shrink-0 transition-transform duration-300
                  ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                `}>
                  <Icon 
                    size={22} 
                    className={isActive ? 'text-white ml-3' : `${item.color} group-hover:text-white ml-3`} 
                  />
                </div>
                <span className={`
                  text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}
                  ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}
                `}>
                  {item.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && isExpanded && (
                  <ChevronRight size={16} className="text-white ml-auto" />
                )}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="border-t border-slate-700/50 my-4"></div>

          {/* Secondary Menu Items */}
          {filteredSecondaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  w-full flex items-center gap-4 p-3 rounded-xl
                  transition-all duration-300 group
                  ${isActive
                    ? `${item.activeColor} shadow-lg`
                    : 'hover:bg-slate-700/50'
                  }
                  ${isExpanded ? '' : 'justify-center'}
                `}
              >
                <div className={`
                  flex-shrink-0 transition-transform duration-300
                  ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                `}>
                  <Icon 
                    size={20} 
                    className={isActive ? 'text-white ml-3' : `${item.color} group-hover:text-white ml-3`} 
                  />
                </div>
                <span className={`
                  text-sm transition-all duration-300 whitespace-nowrap
                  ${isActive ? 'text-white font-medium' : 'text-slate-400 group-hover:text-white'}
                  ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}
                `}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Footer Links - Terms & Privacy */}
          {isExpanded && (
            <>
              <div className="border-t border-slate-700/50 my-4"></div>
              <div className="space-y-1">
                {filteredFooterItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.path);

                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg
                        transition-all duration-300 group
                        ${isActive
                          ? 'bg-slate-700/70'
                          : 'hover:bg-slate-700/30'
                        }
                      `}
                    >
                      <Icon 
                        size={16} 
                        className={isActive ? 'text-slate-300' : `${item.color} group-hover:text-slate-300 `} 
                      />
                      <span className={`
                        text-xs transition-all duration-300
                        ${isActive ? 'text-slate-300 font-medium' : 'text-slate-500 group-hover:text-slate-300'}
                      `}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </nav>

        {/* Sidebar Footer - Auth Buttons */}
        <div className="p-2 pt-4 border-t border-slate-700/50">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-4 p-3 rounded-xl
                bg-gradient-to-r from-red-500 to-red-600 
                hover:from-red-600 hover:to-red-700 cursor-pointer
                text-white font-medium transition-all duration-300
                shadow-lg hover:shadow-xl hover:shadow-red-500/30
                group
                ${isExpanded ? '' : 'justify-center'}
              `}
            >
              <LogOut size={20} className="flex-shrink-0 ml-3 group-hover:scale-110 transition-transform" />
              <span className={`text-sm transition-all duration-300 whitespace-nowrap ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                {t.logout}
              </span>
            </button>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className={`
                  w-full flex items-center gap-4 p-3 rounded-xl
                  bg-gradient-to-r from-blue-500 to-blue-600 
                  hover:from-blue-600 hover:to-blue-700
                  text-white font-medium transition-all duration-300
                  shadow-lg hover:shadow-xl hover:shadow-blue-500/30
                  group
                  ${isExpanded ? '' : 'justify-center'}
                `}
              >
                <LogIn size={20} className="flex-shrink-0 ml-3 group-hover:scale-110 transition-transform" />
                <span className={`text-sm transition-all duration-300 whitespace-nowrap ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                  {t.login}
                </span>
              </Link>
          
            </div>
          )}
          
          {/* App Version */}
          <p className={`
            text-center text-xs text-slate-500 mt-3 transition-all duration-300
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            v1.0.0
          </p>
        </div>
      </aside>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.7);
        }
      `}</style>
    </>
  );
};

export default Sidebar;