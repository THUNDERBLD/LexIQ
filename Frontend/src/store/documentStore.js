import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Document Store
 * Manages document uploads, analysis, and history
 */

const useDocumentStore = create(
  persist(
    (set, get) => ({
      // State
      documents: [],
      currentDocument: null,
      isUploading: false,
      isAnalyzing: false,
      uploadProgress: 0,
      error: null,

      // Actions

      /**
       * Add new document
       * @param {object} document - Document object
       * @returns {object} Added document with ID
       */
      addDocument: (document) => {
        const newDocument = {
          ...document,
          id: Date.now(),
          uploadedAt: document.uploadedAt || new Date().toISOString(),
          status: document.status || 'processing',
          analysis: document.analysis || null,
        };

        set((state) => ({
          documents: [newDocument, ...state.documents],
          currentDocument: newDocument,
        }));

        return newDocument;
      },

      /**
       * Update existing document
       * @param {number} documentId - Document ID
       * @param {object} updates - Fields to update
       */
      updateDocument: (documentId, updates) => {
        set((state) => {
          const updatedDocuments = state.documents.map((doc) =>
            doc.id === documentId ? { ...doc, ...updates } : doc
          );

          return {
            documents: updatedDocuments,
            currentDocument:
              state.currentDocument?.id === documentId
                ? { ...state.currentDocument, ...updates }
                : state.currentDocument,
          };
        });
      },

      /**
       * Remove document
       * @param {number} documentId - Document ID
       */
      removeDocument: (documentId) => {
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== documentId),
          currentDocument:
            state.currentDocument?.id === documentId
              ? null
              : state.currentDocument,
        }));
      },

      /**
       * Set current document
       * @param {object} document - Document object
       */
      setCurrentDocument: (document) => {
        set({ currentDocument: document });
      },

      /**
       * Get document by ID
       * @param {number} documentId - Document ID
       * @returns {object|null}
       */
      getDocumentById: (documentId) => {
        return get().documents.find((doc) => doc.id === documentId) || null;
      },

      /**
       * Get documents by status
       * @param {string} status - Document status (processing, completed, failed)
       * @returns {array}
       */
      getDocumentsByStatus: (status) => {
        return get().documents.filter((doc) => doc.status === status);
      },

      /**
       * Get documents by type
       * @param {string} typeId - Document type ID
       * @returns {array}
       */
      getDocumentsByType: (typeId) => {
        return get().documents.filter((doc) => doc.documentType.id === typeId);
      },

      /**
       * Search documents
       * @param {string} query - Search query
       * @returns {array}
       */
      searchDocuments: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().documents.filter(
          (doc) =>
            doc.name.toLowerCase().includes(lowerQuery) ||
            doc.documentType.name.toLowerCase().includes(lowerQuery)
        );
      },

      /**
       * Get recent documents
       * @param {number} limit - Number of documents to return
       * @returns {array}
       */
      getRecentDocuments: (limit = 5) => {
        return [...get().documents]
          .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
          .slice(0, limit);
      },

      /**
       * Clear all documents
       */
      clearDocuments: () => {
        set({
          documents: [],
          currentDocument: null,
        });
      },

      /**
       * Set upload progress
       * @param {number} progress - Progress percentage (0-100)
       */
      setUploadProgress: (progress) => {
        set({ uploadProgress: progress });
      },

      /**
       * Set uploading state
       * @param {boolean} uploading - Uploading state
       */
      setUploading: (uploading) => {
        set({ isUploading: uploading });
      },

      /**
       * Set analyzing state
       * @param {boolean} analyzing - Analyzing state
       */
      setAnalyzing: (analyzing) => {
        set({ isAnalyzing: analyzing });
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
       * Get statistics
       * @returns {object} Document statistics
       */
      getStats: () => {
        const docs = get().documents;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return {
          total: docs.length,
          processing: docs.filter((d) => d.status === 'processing').length,
          completed: docs.filter((d) => d.status === 'completed').length,
          failed: docs.filter((d) => d.status === 'failed').length,
          thisMonth: docs.filter((d) => {
            const docDate = new Date(d.uploadedAt);
            return (
              docDate.getMonth() === currentMonth &&
              docDate.getFullYear() === currentYear
            );
          }).length,
          byType: docs.reduce((acc, doc) => {
            const typeId = doc.documentType.id;
            acc[typeId] = (acc[typeId] || 0) + 1;
            return acc;
          }, {}),
        };
      },

      /**
       * Upload document (mock implementation)
       * @param {File} file - File to upload
       * @param {object} documentType - Document type
       * @returns {Promise<object>}
       */
      uploadDocument: async (file, documentType) => {
        set({ isUploading: true, uploadProgress: 0, error: null });

        try {
          // Simulate upload progress
          for (let i = 0; i <= 100; i += 10) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            set({ uploadProgress: i });
          }

          // Create document object
          const document = {
            file,
            documentType,
            name: file.name,
            size: file.size,
            uploadedAt: new Date().toISOString(),
            status: 'processing',
          };

          const addedDoc = get().addDocument(document);

          set({ isUploading: false, uploadProgress: 0 });
          return addedDoc;
        } catch (error) {
          set({
            isUploading: false,
            uploadProgress: 0,
            error: error.message,
          });
          throw error;
        }
      },

      /**
       * Analyze document (mock implementation)
       * @param {number} documentId - Document ID
       * @returns {Promise<object>}
       */
      analyzeDocument: async (documentId) => {
        set({ isAnalyzing: true, error: null });

        try {
          // Simulate analysis time
          await new Promise((resolve) => setTimeout(resolve, 3000));

          // Mock analysis result
          const analysis = {
            summary: 'This is a mock analysis of your document.',
            keyPoints: [
              { id: 1, type: 'important', text: 'Key point 1' },
              { id: 2, type: 'positive', text: 'Key point 2' },
            ],
            nextSteps: [
              {
                id: 1,
                priority: 'high',
                timeline: 'immediate',
                action: 'Take action 1',
              },
            ],
            confidence: 90,
            analyzedDate: new Date().toISOString(),
          };

          get().updateDocument(documentId, {
            status: 'completed',
            analysis,
          });

          set({ isAnalyzing: false });
          return analysis;
        } catch (error) {
          get().updateDocument(documentId, { status: 'failed' });
          set({ isAnalyzing: false, error: error.message });
          throw error;
        }
      },
    }),
    {
      name: 'document-storage', // localStorage key
      partialize: (state) => ({
        documents: state.documents,
        currentDocument: state.currentDocument,
      }),
    }
  )
);

export {
    useDocumentStore
};