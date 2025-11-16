import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Authentication Store
 * Manages user authentication state, login/logout, and user profile
 */

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      
      /**
       * Login user with phone number
       * @param {string} phoneNumber - User's phone number
       * @param {object} userData - Additional user data (optional)
       */
      login: (phoneNumber, userData = {}) => {
        set({
          user: {
            phone: phoneNumber,
            name: userData.name || null,
            email: userData.email || null,
            avatar: userData.avatar || null,
            joinedAt: userData.joinedAt || new Date().toISOString(),
            ...userData,
          },
          isAuthenticated: true,
          error: null,
        });
      },

      /**
       * Logout user
       */
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      /**
       * Update user profile
       * @param {object} updates - Fields to update
       */
      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...updates,
            },
          });
        }
      },

      /**
       * Set loading state
       * @param {boolean} loading - Loading state
       */
      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      /**
       * Set error
       * @param {string} error - Error message
       */
      setError: (error) => {
        set({ error });
      },

      /**
       * Clear error
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Check if user is logged in
       * @returns {boolean}
       */
      isLoggedIn: () => {
        return get().isAuthenticated;
      },

      /**
       * Get user data
       * @returns {object|null}
       */
      getUser: () => {
        return get().user;
      },

      /**
       * Verify OTP (mock implementation)
       * @param {string} otp - OTP code
       * @returns {Promise<boolean>}
       */
      verifyOTP: async (otp) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Mock verification - in production, call actual API
          if (otp.length === 6) {
            set({ isLoading: false });
            return true;
          } else {
            set({ 
              isLoading: false, 
              error: 'Invalid OTP' 
            });
            return false;
          }
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.message 
          });
          return false;
        }
      },

      /**
       * Send OTP (mock implementation)
       * @param {string} phoneNumber - Phone number to send OTP
       * @returns {Promise<boolean>}
       */
      sendOTP: async (phoneNumber) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock send - in production, call actual API
          console.log('OTP sent to:', phoneNumber);
          set({ isLoading: false });
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.message 
          });
          return false;
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export {
    useAuthStore
};