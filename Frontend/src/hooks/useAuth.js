/**
 * useAuth Hook
 * Custom hook for authentication operations
 */

import { useCallback } from 'react';
import useAuthStore from '../store/authStore';
import { REGEX_PATTERNS } from '../utils/constants';
import { mockAPIResponses } from '../utils/mockData';

const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateProfile,
    setLoading,
    setError,
    clearError,
  } = useAuthStore();

  /**
   * Validate phone number
   * @param {string} phone - Phone number to validate
   * @returns {boolean} Is valid
   */
  const validatePhoneNumber = useCallback((phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return REGEX_PATTERNS.PHONE.test(cleaned);
  }, []);

  /**
   * Validate OTP
   * @param {string} otp - OTP to validate
   * @returns {boolean} Is valid
   */
  const validateOTP = useCallback((otp) => {
    return REGEX_PATTERNS.OTP.test(otp);
  }, []);

  /**
   * Send OTP to phone number
   * @param {string} phoneNumber - Phone number
   * @returns {Promise<object>} Response
   */
  const sendOTP = useCallback(async (phoneNumber) => {
    try {
      setLoading(true);
      clearError();

      // Validate phone number
      if (!validatePhoneNumber(phoneNumber)) {
        throw new Error('Invalid phone number format');
      }

      // In production, call real API
      // const response = await fetch('/api/auth/send-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber }),
      // });
      // const data = await response.json();

      // Mock API call
      await mockAPIResponses.login(phoneNumber);

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [setLoading, clearError, setError, validatePhoneNumber]);

  /**
   * Verify OTP and login
   * @param {string} phoneNumber - Phone number
   * @param {string} otp - OTP code
   * @returns {Promise<object>} Response
   */
  const verifyOTP = useCallback(async (phoneNumber, otp) => {
    try {
      setLoading(true);
      clearError();

      // Validate OTP
      if (!validateOTP(otp)) {
        throw new Error('Invalid OTP format');
      }

      // In production, call real API
      // const response = await fetch('/api/auth/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber, otp }),
      // });
      // const data = await response.json();

      // Mock API call
      const result = await mockAPIResponses.verifyOTP(otp);

      if (!result.success) {
        throw new Error('Invalid OTP');
      }

      // Login user
      login(phoneNumber, {
        name: null,
        email: null,
        joinedAt: new Date().toISOString(),
      });

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [setLoading, clearError, setError, login, validateOTP]);

  /**
   * Logout user
   */
  const handleLogout = useCallback(() => {
    logout();
    clearError();
  }, [logout, clearError]);

  /**
   * Update user profile
   * @param {object} updates - Profile updates
   * @returns {Promise<object>} Response
   */
  const updateUserProfile = useCallback(async (updates) => {
    try {
      setLoading(true);
      clearError();

      // In production, call real API
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates),
      // });
      // const data = await response.json();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update local state
      updateProfile(updates);

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [setLoading, clearError, setError, updateProfile]);

  /**
   * Check if user has permission
   * @param {string} permission - Permission name
   * @returns {boolean}
   */
  const hasPermission = useCallback((permission) => {
    if (!isAuthenticated || !user) return false;
    
    // In production, check user.permissions
    // return user.permissions?.includes(permission);
    
    // For now, all authenticated users have all permissions
    return true;
  }, [isAuthenticated, user]);

  /**
   * Get user initials for avatar
   * @returns {string} User initials
   */
  const getUserInitials = useCallback(() => {
    if (!user) return '';
    
    if (user.name) {
      const names = user.name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.name[0].toUpperCase();
    }
    
    return 'U';
  }, [user]);

  /**
   * Get user display name
   * @returns {string} Display name
   */
  const getDisplayName = useCallback(() => {
    if (!user) return '';
    return user.name || user.phone || 'User';
  }, [user]);

  /**
   * Check if session is expired
   * @returns {boolean}
   */
  const isSessionExpired = useCallback(() => {
    if (!user || !user.joinedAt) return false;
    
    // Session expires after 30 days
    const sessionDuration = 30 * 24 * 60 * 60 * 1000;
    const joinedTime = new Date(user.joinedAt).getTime();
    const currentTime = Date.now();
    
    return (currentTime - joinedTime) > sessionDuration;
  }, [user]);

  /**
   * Refresh session
   */
  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);
      
      // In production, call refresh token endpoint
      // const response = await fetch('/api/auth/refresh', {
      //   method: 'POST',
      // });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update joined time to extend session
      if (user) {
        updateProfile({ joinedAt: new Date().toISOString() });
      }
      
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false };
    }
  }, [setLoading, setError, user, updateProfile]);

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    sendOTP,
    verifyOTP,
    logout: handleLogout,
    updateProfile: updateUserProfile,
    clearError,
    
    // Utilities
    validatePhoneNumber,
    validateOTP,
    hasPermission,
    getUserInitials,
    getDisplayName,
    isSessionExpired,
    refreshSession,
  };
};

export default useAuth;