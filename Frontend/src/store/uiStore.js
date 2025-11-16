import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * UI Store
 * Manages UI state like sidebar, modals, notifications, theme, etc.
 */

const useUIStore = create(
  persist(
    (set, get) => ({
      // State
      isSidebarOpen: false,
      isAudioEnabled: true,
      theme: 'light',
      notifications: [],
      modals: {
        preview: { isOpen: false, data: null },
        confirm: { isOpen: false, data: null },
      },
      toast: {
        isVisible: false,
        message: '',
        type: 'info', // 'success', 'error', 'warning', 'info'
      },

      // Sidebar Actions

      /**
       * Toggle sidebar open/closed
       */
      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
      },

      /**
       * Open sidebar
       */
      openSidebar: () => {
        set({ isSidebarOpen: true });
      },

      /**
       * Close sidebar
       */
      closeSidebar: () => {
        set({ isSidebarOpen: false });
      },

      // Audio Actions

      /**
       * Toggle audio on/off
       */
      toggleAudio: () => {
        set((state) => ({ isAudioEnabled: !state.isAudioEnabled }));
      },

      /**
       * Set audio enabled
       * @param {boolean} enabled - Audio enabled state
       */
      setAudioEnabled: (enabled) => {
        set({ isAudioEnabled: enabled });
      },

      // Theme Actions

      /**
       * Set theme
       * @param {string} theme - Theme name ('light', 'dark', 'auto')
       */
      setTheme: (theme) => {
        set({ theme });

        // Apply theme to document
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('light', 'dark');
          
          if (theme === 'auto') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.add(isDark ? 'dark' : 'light');
          } else {
            document.documentElement.classList.add(theme);
          }
        }
      },

      /**
       * Toggle theme between light and dark
       */
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      /**
       * Get current theme
       * @returns {string} Current theme
       */
      getTheme: () => {
        return get().theme;
      },

      // Modal Actions

      /**
       * Open modal
       * @param {string} modalName - Modal name
       * @param {any} data - Modal data
       */
      openModal: (modalName, data = null) => {
        set((state) => ({
          modals: {
            ...state.modals,
            [modalName]: { isOpen: true, data },
          },
        }));
      },

      /**
       * Close modal
       * @param {string} modalName - Modal name
       */
      closeModal: (modalName) => {
        set((state) => ({
          modals: {
            ...state.modals,
            [modalName]: { isOpen: false, data: null },
          },
        }));
      },

      /**
       * Close all modals
       */
      closeAllModals: () => {
        const modals = get().modals;
        const closedModals = Object.keys(modals).reduce((acc, key) => {
          acc[key] = { isOpen: false, data: null };
          return acc;
        }, {});
        set({ modals: closedModals });
      },

      // Toast/Notification Actions

      /**
       * Show toast notification
       * @param {string} message - Toast message
       * @param {string} type - Toast type ('success', 'error', 'warning', 'info')
       * @param {number} duration - Duration in ms (default: 3000)
       */
      showToast: (message, type = 'info', duration = 3000) => {
        set({
          toast: {
            isVisible: true,
            message,
            type,
          },
        });

        // Auto-hide after duration
        if (duration > 0) {
          setTimeout(() => {
            get().hideToast();
          }, duration);
        }
      },

      /**
       * Hide toast notification
       */
      hideToast: () => {
        set({
          toast: {
            isVisible: false,
            message: '',
            type: 'info',
          },
        });
      },

      /**
       * Show success toast
       * @param {string} message - Success message
       */
      showSuccess: (message) => {
        get().showToast(message, 'success');
      },

      /**
       * Show error toast
       * @param {string} message - Error message
       */
      showError: (message) => {
        get().showToast(message, 'error');
      },

      /**
       * Show warning toast
       * @param {string} message - Warning message
       */
      showWarning: (message) => {
        get().showToast(message, 'warning');
      },

      /**
       * Show info toast
       * @param {string} message - Info message
       */
      showInfo: (message) => {
        get().showToast(message, 'info');
      },

      // Notification Actions

      /**
       * Add notification
       * @param {object} notification - Notification object
       */
      addNotification: (notification) => {
        const newNotification = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          read: false,
          ...notification,
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },

      /**
       * Mark notification as read
       * @param {number} notificationId - Notification ID
       */
      markNotificationRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
        }));
      },

      /**
       * Mark all notifications as read
       */
      markAllNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      /**
       * Remove notification
       * @param {number} notificationId - Notification ID
       */
      removeNotification: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== notificationId),
        }));
      },

      /**
       * Clear all notifications
       */
      clearNotifications: () => {
        set({ notifications: [] });
      },

      /**
       * Get unread notification count
       * @returns {number} Unread count
       */
      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read).length;
      },

      // Loading State Actions

      /**
       * Set global loading state
       * @param {boolean} isLoading - Loading state
       */
      setLoading: (isLoading) => {
        set({ isLoading });
      },

      // Utility Actions

      /**
       * Reset UI state to defaults
       */
      resetUI: () => {
        set({
          isSidebarOpen: false,
          notifications: [],
          modals: {
            preview: { isOpen: false, data: null },
            confirm: { isOpen: false, data: null },
          },
          toast: {
            isVisible: false,
            message: '',
            type: 'info',
          },
        });
      },

      /**
       * Get modal state
       * @param {string} modalName - Modal name
       * @returns {object} Modal state
       */
      getModalState: (modalName) => {
        return get().modals[modalName] || { isOpen: false, data: null };
      },

      /**
       * Check if any modal is open
       * @returns {boolean}
       */
      isAnyModalOpen: () => {
        const modals = get().modals;
        return Object.values(modals).some((modal) => modal.isOpen);
      },
    }),
    {
      name: 'ui-storage', // localStorage key
      partialize: (state) => ({
        isAudioEnabled: state.isAudioEnabled,
        theme: state.theme,
      }),
    }
  )
);

export { 
    useUIStore
};