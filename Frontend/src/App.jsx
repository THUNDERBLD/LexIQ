import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuthStore } from './store/authStore';
import { useUIStore } from './store/uiStore';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

// Page Components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import History from './pages/History';

// Auth Components
import PhoneInput from './components/auth/PhoneInput';
import OTPLogin from './components/auth/OTPLogin';

// Chat Component (Floating)
import ChatInterface from './components/chat/ChatInterface';

// Utils
import { ROUTES } from './utils/constants';

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const { showToast } = useUIStore();

  const [currentPage, setCurrentPage] = useState('home');
  const [authStep, setAuthStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pageData, setPageData] = useState(null); // For passing data between pages

  /**
   * Navigate to different pages
   * @param {string} page - Page name
   * @param {any} data - Optional data to pass to page
   */
  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handle phone number submission
   */
  const handlePhoneSubmit = (phone) => {
    setPhoneNumber(phone);
    setAuthStep('otp');
  };

  /**
   * Handle OTP verification success
   */
  const handleOTPVerify = () => {
    showToast('Login successful!', 'success');
    setAuthStep('phone');
    setPhoneNumber('');
    handleNavigate('dashboard');
  };

  /**
   * Handle OTP back button
   */
  const handleOTPBack = () => {
    setAuthStep('phone');
  };

  /**
   * Check authentication and redirect
   */
  useEffect(() => {
    // Redirect to dashboard if logged in and on login page
    if (isAuthenticated && currentPage === 'login') {
      handleNavigate('dashboard');
    }

    // Redirect to login if not authenticated and trying to access protected pages
    const protectedPages = ['dashboard', 'upload', 'analysis', 'history'];
    if (!isAuthenticated && protectedPages.includes(currentPage)) {
      showToast('Please login to continue', 'warning');
      handleNavigate('login');
    }
  }, [isAuthenticated, currentPage]);

  /**
   * Render current page
   */
  const renderPage = () => {
    // Authentication Pages
    if (currentPage === 'login') {
      if (authStep === 'phone') {
        return <PhoneInput onSubmit={handlePhoneSubmit} />;
      } else {
        return (
          <OTPLogin
            phoneNumber={phoneNumber}
            onVerify={handleOTPVerify}
            onBack={handleOTPBack}
          />
        );
      }
    }

    // Main Pages
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;

      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;

      case 'upload':
        return <Upload onNavigate={handleNavigate} />;

      case 'analysis':
        return <Analysis document={pageData} onNavigate={handleNavigate} />;

      case 'history':
        return <History onNavigate={handleNavigate} />;

      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  /**
   * Check if current page should show layout
   */
  const shouldShowLayout = () => {
    return currentPage !== 'login';
  };

  /**
   * Check if current page should show floating chat
   */
  const shouldShowChat = () => {
    return isAuthenticated && ['dashboard', 'history'].includes(currentPage);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to main content - Accessibility */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Header */}
      {shouldShowLayout() && <Header />}

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {shouldShowLayout() && (
          <Sidebar onNavigate={handleNavigate} />
        )}

        {/* Main Content */}
        <main
          id="main-content"
          className="flex-1 overflow-auto"
          role="main"
        >
          <div className={shouldShowLayout() ? 'p-6' : ''}>
            {/* one of the way to render the page [we will try to use this later] (alternatively could use Routes/Route)
              {renderPage()} 
            */}
            <Routes>
              <Route path="/" element={<Home onNavigate={handleNavigate} />} />
              <Route path="/dashboard" element={<Dashboard onNavigate={handleNavigate} />} />
              <Route path="/upload" element={<Upload onNavigate={handleNavigate} />} />
              <Route path="/analysis" element={<Analysis document={pageData} onNavigate={handleNavigate} />} />
              <Route path="/history" element={<History onNavigate={handleNavigate} />} />
              <Route path="/history" element={<History onNavigate={handleNavigate} />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Footer */}
      {shouldShowLayout() && <Footer />}

      {/* Floating Chat Widget */}
      {shouldShowChat() && (
        <ChatInterface
          floating={true}
          onSendMessage={async (message) => {
            // Handle chat message
            await new Promise(resolve => setTimeout(resolve, 1000));
            return `This is a demo response to: "${message}"`;
          }}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

/**
 * Toast Container Component
 * Displays toast notifications
 */
const ToastContainer = () => {
  const { toast, hideToast } = useUIStore();

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.isVisible]);

  if (!toast.isVisible) return null;

  const toastStyles = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-yellow-600 text-white',
    info: 'bg-blue-600 text-white',
  };

  const toastIcons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={`
          ${toastStyles[toast.type]} 
          px-6 py-4 rounded-lg shadow-2xl 
          flex items-center gap-3 
          min-w-[300px] max-w-md
        `}
        role="alert"
      >
        <span className="text-2xl">{toastIcons[toast.type]}</span>
        <p className="font-medium flex-1">{toast.message}</p>
        <button
          onClick={hideToast}
          className="text-white hover:opacity-75 transition-opacity"
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default App;