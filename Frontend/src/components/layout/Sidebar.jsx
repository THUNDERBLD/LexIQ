import { useState } from 'react';
import { 
  Home, 
  Upload, 
  History, 
  HelpCircle, 
  Settings, 
  X, 
  ChevronRight,
  FileText,
  BookOpen,
  Phone,
  LogOut,
  LogIn
} from 'lucide-react';

// Mock stores for demonstration
const useUIStore = () => ({ isSidebarOpen: true, toggleSidebar: () => {} });
const useLanguageStore = () => ({ language: 'en' });
const useAuthStore = () => ({ isAuthenticated: false, logout: () => {} });

// Translation object for sidebar
const SIDEBAR_TRANSLATIONS = {
  en: {
    home: 'Home',
    upload: 'Upload Document',
    history: 'My Documents',
    resources: 'Legal Resources',
    help: 'Help & Support',
    settings: 'Settings',
    contact: 'Contact Us',
    logout: 'Logout',
    login: 'Login',
  },
};

const Sidebar = ({ onNavigate = () => {} }) => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { language } = useLanguageStore();
  const { isAuthenticated, logout } = useAuthStore();
  const [activePage, setActivePage] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);
  const t = SIDEBAR_TRANSLATIONS[language] || SIDEBAR_TRANSLATIONS.en;

  const menuItems = [
    { 
      id: 'home', 
      icon: Home, 
      label: t.home,
      color: 'text-blue-400',
      activeColor: 'bg-blue-500'
    },
    { 
      id: 'upload', 
      icon: Upload, 
      label: t.upload,
      color: 'text-green-400',
      activeColor: 'bg-green-500'
    },
    { 
      id: 'history', 
      icon: History, 
      label: t.history,
      color: 'text-purple-400',
      activeColor: 'bg-purple-500',
      requireAuth: true
    },
    { 
      id: 'resources', 
      icon: BookOpen, 
      label: t.resources,
      color: 'text-orange-400',
      activeColor: 'bg-orange-500'
    },
  ];

  const secondaryItems = [
    { 
      id: 'help', 
      icon: HelpCircle, 
      label: t.help,
      color: 'text-slate-400',
      activeColor: 'bg-slate-600'
    },
    { 
      id: 'contact', 
      icon: Phone, 
      label: t.contact,
      color: 'text-slate-400',
      activeColor: 'bg-slate-600'
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: t.settings,
      color: 'text-slate-400',
      activeColor: 'bg-slate-600',
      requireAuth: true
    },
  ];

  const handleNavigation = (pageId) => {
    setActivePage(pageId);
    onNavigate(pageId);
  };

  const handleLogout = () => {
    logout();
    setActivePage('home');
  };

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
          ${isExpanded ? 'w-52' : 'w-12'} 
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          shadow-2xl z-50 
          flex flex-col
          overflow-hidden
          overflow-x-hidden
          border-r border-slate-700/50
        `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Primary Menu Items */}
          {menuItems.map((item) => {
            if (item.requireAuth && !isAuthenticated) return null;
            
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`
                  w-full flex items-center gap-4 p-3 rounded-xl cursor-pointer
                  transition-all duration-300 group relative
                  ${isActive
                    ? `${item.activeColor} shadow-lg shadow-${item.activeColor}/30`
                    : 'hover:bg-slate-700/50'
                  }
                  ${isExpanded ? '' : 'justify-center'}
                `}
              >
                <div className={`
                  flex-shrink-0 transition-transform duration-300 button-spacing2
                  ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                `}>
                  <Icon 
                    size={22} 
                    className={isActive ? 'text-white' : `${item.color} group-hover:text-white`} 
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
              </button>
            );
          })}

          {/* Divider */}
          <div className="border-t border-slate-700/50 my-4"></div>

          {/* Secondary Menu Items */}
          {secondaryItems.map((item) => {
            if (item.requireAuth && !isAuthenticated) return null;
            
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`
                  w-full flex items-center gap-4 p-3 rounded-xl
                  transition-all duration-300 group button-spacing
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
                    className={isActive ? 'text-white' : `${item.color} group-hover:text-white`} 
                  />
                </div>
                <span className={`
                  text-sm transition-all duration-300 whitespace-nowrap
                  ${isActive ? 'text-white font-medium' : 'text-slate-400 group-hover:text-white'}
                  ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}
                `}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700/50">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-4 p-3 rounded-xl
                bg-gradient-to-r from-red-500 to-red-600 
                hover:from-red-600 hover:to-red-700
                text-white font-medium transition-all duration-300
                shadow-lg hover:shadow-xl hover:shadow-red-500/30
                group
                ${isExpanded ? '' : 'justify-center'}
              `}
            >
              <LogOut size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className={`text-sm transition-all duration-300 whitespace-nowrap ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                {t.logout}
              </span>
            </button>
          ) : (
            <button
              onClick={() => handleNavigation('login')}
              className={`
                w-full flex items-center gap-4 p-3 rounded-xl
                bg-gradient-to-r from-blue-500 to-blue-600 
                hover:from-blue-600 hover:to-blue-700
                button-spacing cursor-pointer
                text-white font-medium transition-all duration-300
                shadow-lg hover:shadow-xl hover:shadow-blue-500/30
                group
                ${isExpanded ? '' : 'justify-center'}
              `}
            >
              <LogIn size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className={`text-sm transition-all duration-300 whitespace-nowrap ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                {t.login}
              </span>
            </button>
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
    </>
  );
};

export default Sidebar;