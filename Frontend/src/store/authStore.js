import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create the auth store with persistence
const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      
      // API Base URL
      apiBaseUrl: 'http://localhost:8000/api/v1',
      
      // Actions
      setAuth: (data) => {
        const { user, accessToken, refreshToken } = data;
        
        // Store tokens in localStorage
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        }
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        
        // Update state
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },
      
      updateUser: (userData) => {
        set({ user: userData });
      },
      
      updateTokens: (accessToken, refreshToken) => {
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        }
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        
        set({
          accessToken,
          refreshToken,
        });
      },
      
      logout: () => {
        // Clear localStorage - individual items
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // ✅ FIX: Clear Zustand's persisted storage
        localStorage.removeItem('auth-storage');
        
        // Clear state
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
      
      // Initialize auth from localStorage
      initializeAuth: () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const user = localStorage.getItem('user');
        
        if (accessToken && user) {
          set({
            accessToken,
            refreshToken,
            user: JSON.parse(user),
            isAuthenticated: true,
          });
        }
      },
      
      // Get current access token
      getAccessToken: () => {
        return get().accessToken || localStorage.getItem('accessToken');
      },
      
      // Get current refresh token
      getRefreshToken: () => {
        return get().refreshToken || localStorage.getItem('refreshToken');
      },
      
      // Check if user is authenticated
      checkAuth: () => {
        const accessToken = get().accessToken || localStorage.getItem('accessToken');
        return !!accessToken;
      },
    }),
    {
      name: 'auth-storage', // Name for localStorage key
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;