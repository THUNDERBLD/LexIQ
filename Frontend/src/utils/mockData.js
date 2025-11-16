/**
 * Mock Data
 * Sample data for development and testing
 */

import { DOCUMENT_TYPES } from './documentTypes';

/**
 * Generate mock user data
 */
export const mockUsers = [
  {
    id: 1,
    phone: '+919876543210',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    avatar: null,
    joinedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    phone: '+919876543211',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    avatar: null,
    joinedAt: '2024-02-20T14:20:00Z',
  },
];

/**
 * Generate mock documents
 */
export const mockDocuments = [
  {
    id: 1,
    name: 'Land_Record_2024.pdf',
    size: 2456789,
    documentType: DOCUMENT_TYPES.LAND,
    uploadedAt: '2024-03-10T09:15:00Z',
    status: 'completed',
    analysis: {
      summary: 'This land record document confirms ownership of 2.5 acres of agricultural land in Village Ashta. The document is properly registered and contains all necessary details including survey numbers and boundaries.',
      keyPoints: [
        {
          id: 1,
          type: 'important',
          text: 'Land area: 2.5 acres (Survey No. 123/4)',
          details: 'The total area mentioned matches with revenue records',
        },
        {
          id: 2,
          type: 'positive',
          text: 'Clear title with no encumbrances',
          details: 'No mortgages, liens, or legal disputes registered',
        },
        {
          id: 3,
          type: 'neutral',
          text: 'Property tax paid up to March 2024',
        },
        {
          id: 4,
          type: 'important',
          text: 'Land use: Agricultural',
          details: 'Conversion to non-agricultural use requires permission',
        },
      ],
      simpleExplanation: 'This paper proves you own 2.5 acres of farming land in Ashta village. Everything is correct and legal. You have paid all taxes. The land is registered in your name with no problems or disputes.',
      nextSteps: [
        {
          id: 1,
          priority: 'high',
          timeline: 'immediate',
          action: 'Keep original document in safe place',
          completed: false,
        },
        {
          id: 2,
          priority: 'medium',
          timeline: 'month',
          action: 'Make certified copies for records',
          completed: false,
        },
      ],
      confidence: 95,
      analyzedDate: '2024-03-10T09:20:00Z',
    },
  },
  {
    id: 2,
    name: 'FIR_Copy_456.jpg',
    size: 1234567,
    documentType: DOCUMENT_TYPES.FIR,
    uploadedAt: '2024-03-08T14:30:00Z',
    status: 'completed',
    analysis: {
      summary: 'This is an FIR (First Information Report) registered at Police Station Ashta regarding a theft complaint. The FIR number is 456/2024 dated March 5, 2024.',
      keyPoints: [
        {
          id: 1,
          type: 'important',
          text: 'FIR No: 456/2024',
          details: 'Case Type: Theft (IPC Section 379)',
        },
        {
          id: 2,
          type: 'negative',
          text: 'Investigation pending',
          details: 'Status: Under investigation by IO Constable Ram Singh',
        },
        {
          id: 3,
          type: 'neutral',
          text: 'Registered at PS Ashta on 05-03-2024',
        },
      ],
      simpleExplanation: 'This is your police complaint copy about stolen items. The police have registered your complaint with number 456/2024. Investigation is ongoing. Keep this document safe as proof.',
      nextSteps: [
        {
          id: 1,
          priority: 'high',
          timeline: 'week',
          action: 'Follow up with investigating officer',
          completed: false,
        },
      ],
      confidence: 88,
      analyzedDate: '2024-03-08T14:35:00Z',
    },
  },
  {
    id: 3,
    name: 'Ration_Card.pdf',
    size: 987654,
    documentType: DOCUMENT_TYPES.RATION,
    uploadedAt: '2024-03-05T11:00:00Z',
    status: 'processing',
  },
  {
    id: 4,
    name: 'Court_Notice_2024.pdf',
    size: 3456789,
    documentType: DOCUMENT_TYPES.COURT,
    uploadedAt: '2024-03-01T16:45:00Z',
    status: 'failed',
  },
];

/**
 * Generate mock analysis for different document types
 */
export const mockAnalysis = {
  land: {
    summary: 'This document is a land ownership record (Patta/7-12) that establishes legal ownership of agricultural land. The document appears to be authentic and contains standard elements required for land records.',
    keyPoints: [
      {
        id: 1,
        type: 'important',
        text: 'Document establishes legal ownership',
        details: 'Contains owner name, survey number, and extent of land',
      },
      {
        id: 2,
        type: 'positive',
        text: 'No legal disputes or encumbrances mentioned',
      },
      {
        id: 3,
        type: 'neutral',
        text: 'Revenue payments appear to be up to date',
      },
      {
        id: 4,
        type: 'important',
        text: 'Boundaries clearly defined',
        tags: ['survey', 'boundaries'],
      },
    ],
    simpleExplanation: 'This paper proves that you own this piece of land. Think of it like a certificate that shows the land belongs to you. Keep it very safe because it is very important.',
    nextSteps: [
      {
        id: 1,
        priority: 'high',
        timeline: 'immediate',
        action: 'Store original in a safe, fireproof place',
        completed: false,
      },
      {
        id: 2,
        priority: 'medium',
        timeline: 'week',
        action: 'Get certified copies from revenue office',
        completed: false,
      },
    ],
    confidence: 92,
  },
  
  fir: {
    summary: 'This is a First Information Report (FIR) which is the first step in criminal proceedings. It documents the details of a cognizable offense and initiates police investigation.',
    keyPoints: [
      {
        id: 1,
        type: 'important',
        text: 'FIR registered under specific IPC sections',
      },
      {
        id: 2,
        type: 'negative',
        text: 'Legal proceedings may require your presence',
        details: 'You may need to appear for statements or court hearings',
      },
      {
        id: 3,
        type: 'neutral',
        text: 'Investigation officer assigned',
      },
    ],
    simpleExplanation: 'This is your complaint copy from the police station. The police have written down what you told them and given you this copy. Keep it safe and follow up regularly.',
    nextSteps: [
      {
        id: 1,
        priority: 'high',
        timeline: 'week',
        action: 'Contact investigating officer for case status',
        completed: false,
      },
      {
        id: 2,
        priority: 'high',
        timeline: 'immediate',
        action: 'Keep this document safe for court',
        completed: false,
      },
    ],
    confidence: 85,
  },
};

/**
 * Mock chat messages
 */
export const mockChatMessages = [
  {
    id: 1,
    role: 'assistant',
    content: 'Hello! I can help you understand your document better. What would you like to know?',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    role: 'user',
    content: 'What does this document mean?',
    timestamp: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    id: 3,
    role: 'assistant',
    content: 'Based on your land record document, this proves that you legally own 2.5 acres of agricultural land. The document shows all boundaries, survey numbers, and confirms there are no legal disputes on this property.',
    timestamp: new Date(Date.now() - 3400000).toISOString(),
  },
];

/**
 * Mock notifications
 */
export const mockNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Document Analysis Complete',
    message: 'Your land record has been analyzed successfully',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: false,
  },
  {
    id: 2,
    type: 'info',
    title: 'New Feature Available',
    message: 'You can now chat with AI about your documents',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
  },
  {
    id: 3,
    type: 'warning',
    title: 'Action Required',
    message: 'Court notice requires response within 15 days',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    read: false,
  },
];

/**
 * Mock statistics
 */
export const mockStats = {
  totalDocuments: 156,
  processingDocuments: 12,
  completedDocuments: 140,
  failedDocuments: 4,
  thisMonthDocuments: 23,
  averageConfidence: 89,
  totalUsers: 1247,
  activeUsers: 342,
};

/**
 * Generate random mock document
 */
export const generateMockDocument = () => {
  const types = Object.values(DOCUMENT_TYPES);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const statuses = ['pending', 'processing', 'completed', 'failed'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    id: Date.now(),
    name: `Document_${Date.now()}.pdf`,
    size: Math.floor(Math.random() * 5000000) + 500000,
    documentType: randomType,
    uploadedAt: new Date().toISOString(),
    status: randomStatus,
    analysis: randomStatus === 'completed' ? mockAnalysis.land : null,
  };
};

/**
 * Simulate API delay
 */
export const simulateAPIDelay = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Mock API responses
 */
export const mockAPIResponses = {
  login: async (phoneNumber) => {
    await simulateAPIDelay(1500);
    return {
      success: true,
      user: {
        phone: phoneNumber,
        name: 'Test User',
        email: 'test@example.com',
      },
      token: 'mock-jwt-token',
    };
  },

  verifyOTP: async (otp) => {
    await simulateAPIDelay(1000);
    return {
      success: otp === '123456',
      message: otp === '123456' ? 'OTP verified' : 'Invalid OTP',
    };
  },

  uploadDocument: async (file, documentType) => {
    await simulateAPIDelay(2000);
    return {
      success: true,
      document: {
        id: Date.now(),
        name: file.name,
        size: file.size,
        documentType,
        uploadedAt: new Date().toISOString(),
        status: 'processing',
      },
    };
  },

  analyzeDocument: async (documentId) => {
    await simulateAPIDelay(3000);
    return {
      success: true,
      analysis: mockAnalysis.land,
    };
  },

  chatMessage: async (message) => {
    await simulateAPIDelay(1500);
    return {
      success: true,
      response: `This is a mock response to your question: "${message}". In production, this would be an AI-generated answer based on your document.`,
    };
  },
};

/**
 * Mock search results
 */
export const mockSearchResults = [
  {
    id: 1,
    title: 'Land Record - Village Ashta',
    type: 'document',
    date: '2024-03-10',
    snippet: 'Agricultural land 2.5 acres...',
  },
  {
    id: 2,
    title: 'How to read land records',
    type: 'help',
    snippet: 'Learn how to understand your land documents...',
  },
];

export default {
  mockUsers,
  mockDocuments,
  mockAnalysis,
  mockChatMessages,
  mockNotifications,
  mockStats,
  generateMockDocument,
  simulateAPIDelay,
  mockAPIResponses,
  mockSearchResults,
};