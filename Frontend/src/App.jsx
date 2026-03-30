import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import useAuthStore from './store/authStore';
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
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Resources from './pages/Resources';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import GuideDetail from './pages/GuideDetail';

// Auth Components
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

// Chat Component
import ChatInterface from './components/chat/ChatInterface';

/**
 * Protected Route Wrapper
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const { showToast } = useUIStore();

  if (!isAuthenticated) {
    showToast('Please login to continue', 'warning');
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * Auth Route Wrapper
 * Redirects to dashboard if user is already authenticated
 */
const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  /**
   * Check if current route is an auth route
   */
  const isAuthRoute = () => {
    const authRoutes = ['/login', '/signup'];
    return authRoutes.includes(location.pathname);
  };

  /**
   * Check if current page should show floating chat
   */
  const shouldShowChat = () => {
    const chatPages = ['/dashboard', '/history', '/analysis'];
    return isAuthenticated && chatPages.includes(location.pathname);
  };

  /**
   * Handle chat message
   */
  const handleChatMessage = async (message) => {
    // TODO: Integrate with your chat API
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `This is a demo response to: "${message}"`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Hide on auth routes */}
      {!isAuthRoute() && <Header />}

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hide on auth routes */}
        {!isAuthRoute() && <Sidebar />}

        {/* Main Content */}
        <main
          id="main-content"
          className="flex-1 overflow-auto"
          role="main"
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes - Redirect to dashboard if authenticated */}
            <Route 
              path="/login" 
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <AuthRoute>
                  <SignUp />
                </AuthRoute>
              } 
            />

            {/* Protected Routes - Require authentication */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analysis"
              element={
                <ProtectedRoute>
                  <Analysis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources/guide/:id"
              element={
                <ProtectedRoute>
                  <GuideDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />

            {/* 404 - Redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Footer - Hide on auth routes */}
      {!isAuthRoute() && <Footer />}


      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

/**
 * Toast Container Component
 * Displays toast notifications with auto-dismiss
 */
const ToastContainer = () => {
  const { toast, hideToast } = useUIStore();

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(hideToast, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.isVisible, hideToast]);

  if (!toast.isVisible) return null;

  const toastConfig = {
    success: { bg: 'bg-green-600', icon: '✓' },
    error: { bg: 'bg-red-600', icon: '✕' },
    warning: { bg: 'bg-yellow-600', icon: '⚠' },
    info: { bg: 'bg-blue-600', icon: 'ℹ' },
  };

  const config = toastConfig[toast.type];

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={`${config.bg} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md`}
        role="alert"
      >
        <span className="text-2xl">{config.icon}</span>
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