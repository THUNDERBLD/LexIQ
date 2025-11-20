import { FileText, Image, File } from 'lucide-react';

export const mockDocuments = [
  {
    id: 101,
    name: 'Rental_Agreement_2024.pdf',
    type: 'legal',
    size: '2.4 MB',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    status: 'completed',
    documentType: {
      id: 'legal',
      name: 'Legal Contract',
      icon: '⚖️',
      color: 'bg-blue-500',
    },
    analysis: {
      confidence: 98,
      summary: 'Standard residential lease agreement with standard clauses.',
    }
  },
  {
    id: 102,
    name: 'Tax_Return_FY23.pdf',
    type: 'financial',
    size: '1.8 MB',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    status: 'processing',
    documentType: {
      id: 'financial',
      name: 'Financial Record',
      icon: '💰',
      color: 'bg-green-500',
    },
    analysis: null
  },
  {
    id: 103,
    name: 'Medical_Report_Oct.jpg',
    type: 'personal',
    size: '4.2 MB',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    status: 'completed',
    documentType: {
      id: 'personal',
      name: 'Personal Document',
      icon: '👤',
      color: 'bg-purple-500',
    },
    analysis: {
      confidence: 92,
      summary: 'Medical report indicating normal vitals.',
    }
  },
  {
    id: 104,
    name: 'Employment_Contract_v2.pdf',
    type: 'legal',
    size: '3.1 MB',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    status: 'failed',
    documentType: {
      id: 'legal',
      name: 'Legal Contract',
      icon: '⚖️',
      color: 'bg-blue-500',
    },
    analysis: {
      error: 'Unable to extract text from document.',
    }
  },
  {
    id: 105,
    name: 'Utility_Bill_Sept.pdf',
    type: 'financial',
    size: '1.2 MB',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
    status: 'completed',
    documentType: {
      id: 'financial',
      name: 'Financial Record',
      icon: '💰',
      color: 'bg-green-500',
    },
    analysis: {
      confidence: 99,
      summary: 'Electricity bill for September 2024.',
    }
  }
];