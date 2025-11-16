/**
 * useDocument Hook
 * Custom hook for document operations
 */

import { useCallback } from 'react';
import useDocumentStore from '../store/documentStore';
import { FILE_CONFIG } from '../utils/constants';
import { mockAPIResponses } from '../utils/mockData';
import { formatFileSize } from '../utils/formatters';

const useDocument = () => {
  const {
    documents,
    currentDocument,
    isUploading,
    isAnalyzing,
    uploadProgress,
    error,
    addDocument,
    updateDocument,
    removeDocument,
    setCurrentDocument,
    getDocumentById,
    getDocumentsByStatus,
    getDocumentsByType,
    searchDocuments,
    getRecentDocuments,
    clearDocuments,
    setUploadProgress,
    setUploading,
    setAnalyzing,
    setError,
    clearError,
    getStats,
  } = useDocumentStore();

  /**
   * Validate file
   * @param {File} file - File to validate
   * @returns {object} Validation result
   */
  const validateFile = useCallback((file) => {
    if (!file) {
      return { valid: false, error: 'No file selected' };
    }

    // Check file size
    if (file.size > FILE_CONFIG.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size exceeds ${formatFileSize(FILE_CONFIG.MAX_FILE_SIZE)} limit`,
      };
    }

    // Check file type
    if (!FILE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Only images (JPG, PNG) and PDFs are allowed',
      };
    }

    return { valid: true };
  }, []);

  /**
   * Upload document
   * @param {File} file - File to upload
   * @param {object} documentType - Document type
   * @returns {Promise<object>} Upload result
   */
  const uploadDocument = useCallback(async (file, documentType) => {
    try {
      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      setUploading(true);
      setUploadProgress(0);
      clearError();

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // In production, call real API with FormData
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('documentType', documentType.id);
      // const response = await fetch('/api/documents/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();

      // Mock API call
      const result = await mockAPIResponses.uploadDocument(file, documentType);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Add document to store
      const newDocument = addDocument({
        file,
        documentType,
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'processing',
      });

      // Wait a moment to show 100% progress
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);

      return { success: true, document: newDocument };
    } catch (err) {
      setError(err.message);
      setUploading(false);
      setUploadProgress(0);
      return { success: false, error: err.message };
    }
  }, [
    validateFile,
    setUploading,
    setUploadProgress,
    clearError,
    setError,
    addDocument,
  ]);

  /**
   * Analyze document
   * @param {number} documentId - Document ID
   * @returns {Promise<object>} Analysis result
   */
  const analyzeDocument = useCallback(async (documentId) => {
    try {
      setAnalyzing(true);
      clearError();

      // In production, call real API
      // const response = await fetch(`/api/documents/${documentId}/analyze`, {
      //   method: 'POST',
      // });
      // const data = await response.json();

      // Mock API call
      const result = await mockAPIResponses.analyzeDocument(documentId);

      // Update document with analysis
      updateDocument(documentId, {
        status: 'completed',
        analysis: result.analysis,
      });

      setAnalyzing(false);
      return { success: true, analysis: result.analysis };
    } catch (err) {
      setError(err.message);
      updateDocument(documentId, { status: 'failed' });
      setAnalyzing(false);
      return { success: false, error: err.message };
    }
  }, [setAnalyzing, clearError, setError, updateDocument]);

  /**
   * Delete document
   * @param {number} documentId - Document ID
   * @returns {Promise<object>} Delete result
   */
  const deleteDocument = useCallback(async (documentId) => {
    try {
      clearError();

      // In production, call real API
      // const response = await fetch(`/api/documents/${documentId}`, {
      //   method: 'DELETE',
      // });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Remove from store
      removeDocument(documentId);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [clearError, setError, removeDocument]);

  /**
   * Download document
   * @param {object} document - Document to download
   */
  const downloadDocument = useCallback((document) => {
    try {
      if (!document.file) {
        throw new Error('File not available for download');
      }

      const url = URL.createObjectURL(document.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = document.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [setError]);

  /**
   * Share document analysis
   * @param {object} document - Document to share
   * @returns {Promise<object>} Share result
   */
  const shareDocument = useCallback(async (document) => {
    try {
      if (!document.analysis) {
        throw new Error('No analysis available to share');
      }

      const shareText = `Document Analysis:\n\n${document.analysis.summary}`;

      if (navigator.share) {
        await navigator.share({
          title: `${document.documentType.name} - Analysis`,
          text: shareText,
        });
        return { success: true };
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareText);
        return { success: true, fallback: true };
      }
    } catch (err) {
      // User cancelled or error occurred
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
      return { success: false, error: err.message };
    }
  }, [setError]);

  /**
   * Get document statistics
   * @returns {object} Statistics
   */
  const getDocumentStats = useCallback(() => {
    return getStats();
  }, [getStats]);

  /**
   * Filter documents
   * @param {object} filters - Filter options
   * @returns {array} Filtered documents
   */
  const filterDocuments = useCallback((filters = {}) => {
    let filtered = [...documents];

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(doc => doc.status === filters.status);
    }

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(doc => doc.documentType.id === filters.type);
    }

    // Filter by date range
    if (filters.startDate) {
      filtered = filtered.filter(
        doc => new Date(doc.uploadedAt) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(
        doc => new Date(doc.uploadedAt) <= new Date(filters.endDate)
      );
    }

    // Filter by search query
    if (filters.query) {
      filtered = searchDocuments(filters.query);
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        if (filters.sortBy === 'date') {
          return new Date(b.uploadedAt) - new Date(a.uploadedAt);
        }
        if (filters.sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (filters.sortBy === 'size') {
          return b.size - a.size;
        }
        return 0;
      });
    }

    return filtered;
  }, [documents, searchDocuments]);

  /**
   * Check if document can be analyzed
   * @param {object} document - Document to check
   * @returns {boolean}
   */
  const canAnalyze = useCallback((document) => {
    return (
      document &&
      document.status === 'processing' &&
      !document.analysis
    );
  }, []);

  /**
   * Check if document is ready
   * @param {object} document - Document to check
   * @returns {boolean}
   */
  const isDocumentReady = useCallback((document) => {
    return document && document.status === 'completed' && document.analysis;
  }, []);

  /**
   * Get document by ID with error handling
   * @param {number} documentId - Document ID
   * @returns {object|null} Document or null
   */
  const getDocument = useCallback((documentId) => {
    try {
      return getDocumentById(documentId);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [getDocumentById, setError]);

  return {
    // State
    documents,
    currentDocument,
    isUploading,
    isAnalyzing,
    uploadProgress,
    error,

    // Actions
    uploadDocument,
    analyzeDocument,
    deleteDocument,
    downloadDocument,
    shareDocument,
    setCurrentDocument,
    clearDocuments,
    clearError,

    // Queries
    getDocument,
    getDocumentsByStatus,
    getDocumentsByType,
    searchDocuments,
    getRecentDocuments,
    filterDocuments,
    getDocumentStats,

    // Utilities
    validateFile,
    canAnalyze,
    isDocumentReady,
  };
};

export default useDocument;