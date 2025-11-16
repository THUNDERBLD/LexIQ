import { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Download, 
  Trash2,
  Search,
  Filter,
  Calendar
} from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import { useDocumentStore } from '../../store/documentStore';
import Card from '../common/Card';
import Button from '../common/Button';
import DocumentPreview from './DocumentPreview';

// Translation object
const LIST_TRANSLATIONS = {
  en: {
    title: 'My Documents',
    searchPlaceholder: 'Search documents...',
    filterAll: 'All',
    filterProcessing: 'Processing',
    filterCompleted: 'Completed',
    filterFailed: 'Failed',
    noDocuments: 'No documents found',
    noDocumentsDesc: 'Upload your first document to get started',
    uploadNow: 'Upload Document',
    view: 'View',
    download: 'Download',
    delete: 'Delete',
    uploadedOn: 'Uploaded on',
    status: 'Status',
    processing: 'Processing',
    completed: 'Completed',
    failed: 'Failed',
    confidence: 'Confidence',
  },
  hi: {
    title: 'मेरे दस्तावेज़',
    searchPlaceholder: 'दस्तावेज़ खोजें...',
    filterAll: 'सभी',
    filterProcessing: 'प्रोसेसिंग',
    filterCompleted: 'पूर्ण',
    filterFailed: 'विफल',
    noDocuments: 'कोई दस्तावेज़ नहीं मिला',
    noDocumentsDesc: 'शुरू करने के लिए अपना पहला दस्तावेज़ अपलोड करें',
    uploadNow: 'दस्तावेज़ अपलोड करें',
    view: 'देखें',
    download: 'डाउनलोड',
    delete: 'हटाएं',
    uploadedOn: 'अपलोड किया गया',
    status: 'स्थिति',
    processing: 'प्रोसेसिंग',
    completed: 'पूर्ण',
    failed: 'विफल',
    confidence: 'विश्वास',
  },
  mr: {
    title: 'माझे दस्तऐवज',
    searchPlaceholder: 'दस्तऐवज शोधा...',
    filterAll: 'सर्व',
    filterProcessing: 'प्रक्रिया',
    filterCompleted: 'पूर्ण',
    filterFailed: 'अयशस्वी',
    noDocuments: 'कोणतेही दस्तऐवज आढळले नाहीत',
    noDocumentsDesc: 'सुरू करण्यासाठी तुमचा पहिला दस्तऐवज अपलोड करा',
    uploadNow: 'दस्तऐवज अपलोड करा',
    view: 'पहा',
    download: 'डाउनलोड',
    delete: 'हटवा',
    uploadedOn: 'अपलोड केले',
    status: 'स्थिती',
    processing: 'प्रक्रिया',
    completed: 'पूर्ण',
    failed: 'अयशस्वी',
    confidence: 'आत्मविश्वास',
  },
};

const StatusBadge = ({ status, language }) => {
  const t = LIST_TRANSLATIONS[language] || LIST_TRANSLATIONS.en;
  
  const statusConfig = {
    processing: {
      label: t.processing,
      icon: Clock,
      color: 'text-yellow-700 bg-yellow-100 border-yellow-300',
    },
    completed: {
      label: t.completed,
      icon: CheckCircle,
      color: 'text-green-700 bg-green-100 border-green-300',
    },
    failed: {
      label: t.failed,
      icon: AlertCircle,
      color: 'text-red-700 bg-red-100 border-red-300',
    },
  };

  const config = statusConfig[status] || statusConfig.processing;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
      <Icon size={14} />
      {config.label}
    </span>
  );
};

const DocumentCard = ({ document, onView, onDownload, onDelete, language }) => {
  const t = LIST_TRANSLATIONS[language] || LIST_TRANSLATIONS.en;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card hover className="transition-all duration-200 hover:scale-[1.02]">
      <div className="flex items-start gap-4">
        {/* Document Icon */}
        <div className={`p-4 rounded-xl ${document.documentType.color} bg-opacity-20 flex-shrink-0`}>
          <span className="text-3xl">{document.documentType.icon}</span>
        </div>

        {/* Document Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-gray-800 truncate mb-1">
                {document.name}
              </h3>
              <p className="text-sm text-gray-600">
                {document.documentType.name}
              </p>
            </div>
            <StatusBadge status={document.status} language={language} />
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(document.uploadedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <FileText size={14} />
              {(document.size / 1024).toFixed(2)} KB
            </span>
            {document.analysis?.confidence && (
              <span className="flex items-center gap-1.5 text-green-600 font-medium">
                <CheckCircle size={14} />
                {t.confidence}: {document.analysis.confidence}%
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              onClick={() => onView(document)}
              icon={Eye}
              className="text-sm py-2"
            >
              {t.view}
            </Button>
            <Button
              variant="secondary"
              onClick={() => onDownload(document)}
              icon={Download}
              className="text-sm py-2"
            >
              {t.download}
            </Button>
            <Button
              variant="danger"
              onClick={() => onDelete(document)}
              icon={Trash2}
              className="text-sm py-2"
            >
              {t.delete}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const DocumentList = ({ onUploadClick }) => {
  const { language } = useLanguageStore();
  const { documents, removeDocument } = useDocumentStore();
  const t = LIST_TRANSLATIONS[language] || LIST_TRANSLATIONS.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [previewDocument, setPreviewDocument] = useState(null);

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.documentType.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleView = (document) => {
    setPreviewDocument(document);
  };

  const handleDownload = (document) => {
    if (document.file) {
      const url = URL.createObjectURL(document.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = document.file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = (document) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      removeDocument(document.id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">
          {documents.length} {documents.length === 1 ? 'document' : 'documents'}
        </p>
      </div>

      {/* Search and Filter */}
      {documents.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {['all', 'processing', 'completed', 'failed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? t.filterAll : 
                 status === 'processing' ? t.filterProcessing :
                 status === 'completed' ? t.filterCompleted : t.filterFailed}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Document List */}
      {filteredDocuments.length > 0 ? (
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onView={handleView}
              onDownload={handleDownload}
              onDelete={handleDelete}
              language={language}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <FileText size={48} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {t.noDocuments}
          </h3>
          <p className="text-gray-600 mb-6">{t.noDocumentsDesc}</p>
          <Button onClick={onUploadClick} icon={FileText}>
            {t.uploadNow}
          </Button>
        </Card>
      )}

      {/* Document Preview Modal */}
      {previewDocument && (
        <DocumentPreview
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
        />
      )}
    </div>
  );
};

export default DocumentList;