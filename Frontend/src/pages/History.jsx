import { useState } from 'react';
import { FileText, Calendar, CheckCircle, Clock, AlertCircle, Trash2, Eye, Upload, Search, Filter } from 'lucide-react';

// Translation object
const HISTORY_TRANSLATIONS = {
  en: {
    title: 'Document History',
    subtitle: 'View and manage all your documents',
    uploadNew: 'Upload New Document',
    search: 'Search documents...',
    filterAll: 'All',
    filterCompleted: 'Completed',
    filterPending: 'Pending',
    noDocuments: 'No documents found',
    noDocumentsDesc: 'Upload your first document to get started',
    view: 'View Analysis',
    delete: 'Delete',
    uploaded: 'Uploaded',
    status: 'Status',
    completed: 'Completed',
    pending: 'Pending',
    processing: 'Processing',
    failed: 'Failed',
  },
  hi: {
    title: 'दस्तावेज़ इतिहास',
    subtitle: 'अपने सभी दस्तावेज़ देखें और प्रबंधित करें',
    uploadNew: 'नया दस्तावेज़ अपलोड करें',
    search: 'दस्तावेज़ खोजें...',
    filterAll: 'सभी',
    filterCompleted: 'पूर्ण',
    filterPending: 'लंबित',
    noDocuments: 'कोई दस्तावेज़ नहीं मिला',
    noDocumentsDesc: 'शुरू करने के लिए अपना पहला दस्तावेज़ अपलोड करें',
    view: 'विश्लेषण देखें',
    delete: 'हटाएं',
    uploaded: 'अपलोड किया गया',
    status: 'स्थिति',
    completed: 'पूर्ण',
    pending: 'लंबित',
    processing: 'प्रसंस्करण',
    failed: 'असफल',
  },
  mr: {
    title: 'दस्तऐवज इतिहास',
    subtitle: 'तुमचे सर्व दस्तऐवज पहा आणि व्यवस्थापित करा',
    uploadNew: 'नवीन दस्तऐवज अपलोड करा',
    search: 'दस्तऐवज शोधा...',
    filterAll: 'सर्व',
    filterCompleted: 'पूर्ण',
    filterPending: 'प्रलंबित',
    noDocuments: 'कोणतेही दस्तऐवज आढळले नाहीत',
    noDocumentsDesc: 'सुरू करण्यासाठी तुमचा पहिला दस्तऐवज अपलोड करा',
    view: 'विश्लेषण पहा',
    delete: 'हटवा',
    uploaded: 'अपलोड केले',
    status: 'स्थिती',
    completed: 'पूर्ण',
    pending: 'प्रलंबित',
    processing: 'प्रक्रिया',
    failed: 'अयशस्वी',
  },
};

// Mock document data
const generateMockDocuments = () => {
  return [
    {
      id: '1',
      name: 'Property Sale Deed.pdf',
      documentType: { name: 'Sale Deed', icon: '📄' },
      uploadDate: new Date('2024-11-18'),
      status: 'completed',
      size: '2.4 MB',
      confidence: 94,
    },
    {
      id: '2',
      name: 'Rental Agreement 2024.pdf',
      documentType: { name: 'Rental Agreement', icon: '🏠' },
      uploadDate: new Date('2024-11-15'),
      status: 'completed',
      size: '1.8 MB',
      confidence: 89,
    },
    {
      id: '3',
      name: 'Court Notice - Family Matter.pdf',
      documentType: { name: 'Court Notice', icon: '⚖️' },
      uploadDate: new Date('2024-11-12'),
      status: 'completed',
      size: '3.1 MB',
      confidence: 92,
    },
    {
      id: '4',
      name: 'Power of Attorney.pdf',
      documentType: { name: 'Power of Attorney', icon: '📋' },
      uploadDate: new Date('2024-11-10'),
      status: 'processing',
      size: '1.5 MB',
    },
    {
      id: '5',
      name: 'Land Registry Document.pdf',
      documentType: { name: 'Registry Document', icon: '🏛️' },
      uploadDate: new Date('2024-11-08'),
      status: 'completed',
      size: '4.2 MB',
      confidence: 96,
    },
    {
      id: '6',
      name: 'Marriage Certificate.pdf',
      documentType: { name: 'Certificate', icon: '💍' },
      uploadDate: new Date('2024-11-05'),
      status: 'completed',
      size: '0.9 MB',
      confidence: 98,
    },
    {
      id: '7',
      name: 'Legal Notice - Pending Case.pdf',
      documentType: { name: 'Legal Notice', icon: '📨' },
      uploadDate: new Date('2024-11-01'),
      status: 'pending',
      size: '2.1 MB',
    },
    {
      id: '8',
      name: 'Will Testament.pdf',
      documentType: { name: 'Will', icon: '📜' },
      uploadDate: new Date('2024-10-28'),
      status: 'completed',
      size: '1.3 MB',
      confidence: 91,
    },
  ];
};

// Button Component
const Button = ({ children, variant = 'primary', icon: Icon, onClick, fullWidth, className = '' }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 justify-center';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-700/50 text-white hover:bg-slate-600/50 backdrop-blur-sm border border-slate-600',
    danger: 'bg-red-600/80 text-white hover:bg-red-600 backdrop-blur-sm',
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

// Document Card Component
const DocumentCard = ({ document, onView, onDelete, language }) => {
  const t = HISTORY_TRANSLATIONS[language];
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-green-400" />;
      case 'processing':
        return <Clock size={20} className="text-blue-400 animate-pulse" />;
      case 'pending':
        return <AlertCircle size={20} className="text-yellow-400" />;
      case 'failed':
        return <AlertCircle size={20} className="text-red-400" />;
      default:
        return <FileText size={20} className="text-gray-400" />;
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return t.completed;
      case 'processing':
        return t.processing;
      case 'pending':
        return t.pending;
      case 'failed':
        return t.failed;
      default:
        return status;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
    }
  };
  
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all p-6 border border-slate-700/50 hover:border-slate-600/50 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-3xl">{document.documentType.icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-lg mb-1 truncate">
              {document.name}
            </h3>
            <p className="text-sm text-gray-400 mb-2">{document.documentType.name}</p>
            <div className="flex items-center gap-2">
              {getStatusIcon(document.status)}
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(document.status)}`}>
                {getStatusText(document.status)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{document.uploadDate.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <FileText size={16} />
          <span>{document.size}</span>
        </div>
        {document.confidence && (
          <div className="flex items-center gap-1">
            <CheckCircle size={16} className="text-green-400" />
            <span>{document.confidence}%</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        {document.status === 'completed' && (
          <Button
            variant="primary"
            icon={Eye}
            onClick={() => onView(document)}
            fullWidth
          >
            {t.view}
          </Button>
        )}
        <Button
          variant="danger"
          icon={Trash2}
          onClick={() => onDelete(document.id)}
          className={document.status === 'completed' ? '' : 'flex-1'}
        >
          {t.delete}
        </Button>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ onUploadClick, language }) => {
  const t = HISTORY_TRANSLATIONS[language];
  
  return (
    <div className="text-center py-16 bg-slate-800/40 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50">
      <div className="text-6xl mb-4">📄</div>
      <h3 className="text-xl font-semibold text-white mb-2">{t.noDocuments}</h3>
      <p className="text-gray-400 mb-6">{t.noDocumentsDesc}</p>
      <Button variant="primary" icon={Upload} onClick={onUploadClick}>
        {t.uploadNew}
      </Button>
    </div>
  );
};

// Main History Component
const History = () => {
  const [language] = useState('en');
  const t = HISTORY_TRANSLATIONS[language];
  
  const [documents, setDocuments] = useState(generateMockDocuments());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const handleUploadClick = () => {
    console.log('Navigate to upload page');
  };
  
  const handleView = (document) => {
    console.log('View document:', document);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };
  
  // Filter documents based on search and status
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.documentType.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {t.title}
              </h1>
              <p className="text-gray-300 text-lg">{t.subtitle}</p>
            </div>
            <Button
              variant="primary"
              icon={Upload}
              onClick={handleUploadClick}
              className="hidden md:flex"
            >
              {t.uploadNew}
            </Button>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/60 backdrop-blur-sm border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 backdrop-blur-sm border border-slate-600'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  statusFilter === 'completed'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 backdrop-blur-sm border border-slate-600'
                }`}
              >
                {t.filterCompleted}
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  statusFilter === 'pending'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 backdrop-blur-sm border border-slate-600'
                }`}
              >
                {t.filterPending}
              </button>
            </div>
          </div>
        </div>

        {/* Document List */}
        {filteredDocuments.length === 0 ? (
          <EmptyState onUploadClick={handleUploadClick} language={language} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                onView={handleView}
                onDelete={handleDelete}
                language={language}
              />
            ))}
          </div>
        )}
        
        {/* Mobile Upload Button */}
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={handleUploadClick}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-700 transition-all hover:scale-110"
          >
            <Upload size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;