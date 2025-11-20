import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Error boundary for production
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // In production, send to error tracking service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 mb-6">
                We're sorry for the inconvenience. Please refresh the page to try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Error Details
                  </summary>
                  <pre className="mt-2 text-xs text-red-600 overflow-auto p-4 bg-red-50 rounded">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize stores and setup
const initializeApp = () => {
  // Set initial language from localStorage or browser
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) {
    document.documentElement.lang = savedLanguage;
  }

  // Set document direction
  const direction = document.documentElement.dir || 'ltr';
  document.documentElement.dir = direction;

  // Log app info in development
  if (import.meta.env.VITE_NODE_ENV === 'development') {
    console.log('%c🏛️ Legal Aid Assistant', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%cVersion: 1.0.0', 'color: #6b7280;');
    console.log('%cEnvironment: Development', 'color: #10b981;');
  }
};

// Initialize app
initializeApp();

// Render app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);