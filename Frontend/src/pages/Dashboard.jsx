import React from 'react';
import { useNavigate } from "react-router-dom";


import { 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import useAuthStore from '../store/authStore';
import { useDocumentStore } from '../store/documentStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Translation object
const DASHBOARD_TRANSLATIONS = {
  en: {
    welcome: 'Welcome back',
    quickActions: 'Quick Actions',
    uploadNew: 'Upload New Document',
    viewHistory: 'View All Documents',
    recentDocs: 'Recent Documents',
    noDocuments: 'No documents yet',
    uploadFirst: 'Upload your first document to get started',
    stats: {
      total: 'Total Documents',
      processing: 'Processing',
      completed: 'Completed',
      thisMonth: 'This Month',
    },
    recentActivity: 'Recent Activity',
    viewDetails: 'View Details',
    continue: 'Continue',
    tipsTitle: 'Getting Started Tips',
  },
  hi: {
    welcome: 'वापस स्वागत है',
    quickActions: 'त्वरित क्रियाएं',
    uploadNew: 'नया दस्तावेज़ अपलोड करें',
    viewHistory: 'सभी दस्तावेज़ देखें',
    recentDocs: 'हाल के दस्तावेज़',
    noDocuments: 'अभी तक कोई दस्तावेज़ नहीं',
    uploadFirst: 'शुरू करने के लिए अपना पहला दस्तावेज़ अपलोड करें',
    stats: {
      total: 'कुल दस्तावेज़',
      processing: 'प्रोसेसिंग',
      completed: 'पूर्ण',
      thisMonth: 'इस महीने',
    },
    recentActivity: 'हाल की गतिविधि',
    viewDetails: 'विवरण देखें',
    continue: 'जारी रखें',
    tipsTitle: 'शुरुआती सुझाव',
  },
  mr: {
    welcome: 'परत स्वागत आहे',
    quickActions: 'द्रुत क्रिया',
    uploadNew: 'नवीन दस्तऐवज अपलोड करा',
    viewHistory: 'सर्व दस्तऐवज पहा',
    recentDocs: 'अलीकडील दस्तऐवज',
    noDocuments: 'अद्याप दस्तऐवज नाहीत',
    uploadFirst: 'सुरू करण्यासाठी तुमचा पहिला दस्तऐवज अपलोड करा',
    stats: {
      total: 'एकूण दस्तऐवज',
      processing: 'प्रक्रिया',
      completed: 'पूर्ण',
      thisMonth: 'या महिन्यात',
    },
    recentActivity: 'अलीकडील क्रियाकलाप',
    viewDetails: 'तपशील पहा',
    continue: 'सुरू ठेवा',
    tipsTitle: 'सुरुवातीचे टिपा',
  },
};

// Mock documents for demonstration
const MOCK_DOCUMENTS = [
  {
    id: 1,
    name: 'Land_Record_2024.pdf',
    documentType: {
      id: 'land',
      name: 'Land Records',
      icon: '🏡',
      color: 'bg-green-500',
    },
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    analysis: { confidence: 95 },
  },
  {
    id: 2,
    name: 'Court_Notice_2024.pdf',
    documentType: {
      id: 'court',
      name: 'Court Notice',
      icon: '⚖️',
      color: 'bg-blue-500',
    },
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    analysis: { confidence: 88 },
  },
  {
    id: 3,
    name: 'Ration_Card.jpg',
    documentType: {
      id: 'ration',
      name: 'Ration Card',
      icon: '🍚',
      color: 'bg-orange-500',
    },
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'processing',
  },
];

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
  <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-400 mb-2">{label}</p>
        <p className="text-4xl font-bold text-white mb-1">{value}</p>
        {trend && (
          <div className="flex items-center gap-1 text-sm text-green-400 font-medium">
            <TrendingUp size={16} />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className={`p-4 rounded-xl ${color} bg-opacity-20`}>
        <Icon size={36} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
  </Card>
);

const RecentDocumentCard = ({ document, onView, language }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const statusConfig = {
    processing: { icon: Clock, color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30', label: 'Processing' },
    completed: { icon: CheckCircle, color: 'text-green-400 bg-green-500/20 border-green-500/30', label: 'Completed' },
    failed: { icon: AlertCircle, color: 'text-red-400 bg-red-500/20 border-red-500/30', label: 'Failed' },
  };

  const status = statusConfig[document.status] || statusConfig.processing;
  const StatusIcon = status.icon;

  return (
    <Card 
      hover 
      onClick={onView} 
      className="cursor-pointer bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className={`p-4 rounded-xl ${document.documentType.color} bg-opacity-20 flex-shrink-0`}>
          <span className="text-4xl">{document.documentType.icon}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-bold text-white text-lg truncate">{document.name}</h3>
            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${status.color}`}>
              <StatusIcon size={14} />
              {status.label}
            </span>
          </div>
          
          <p className="text-sm text-slate-400 mb-3">{document.documentType.name}</p>
          
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(document.uploadedAt)}
            </span>
            {document.analysis?.confidence && (
              <span className="text-green-400 font-semibold">
                ✓ {document.analysis.confidence}% confidence
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

const Dashboard = ({ onNavigate }) => {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const { documents } = useDocumentStore();
  const t = DASHBOARD_TRANSLATIONS[language] || DASHBOARD_TRANSLATIONS.en;

  // Use mock documents if no real documents exist
  const displayDocuments = documents.length > 0 ? documents : MOCK_DOCUMENTS;

  // Calculate stats
  const totalDocs = displayDocuments.length;
  const processingDocs = displayDocuments.filter(d => d.status === 'processing').length;
  const completedDocs = displayDocuments.filter(d => d.status === 'completed').length;
  
  // Get this month's documents
  const currentMonth = new Date().getMonth();
  const thisMonthDocs = displayDocuments.filter(d => {
    const docMonth = new Date(d.uploadedAt).getMonth();
    return docMonth === currentMonth;
  }).length;

  // Get recent documents (last 5)
  const recentDocuments = [...displayDocuments]
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto ">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {t.welcome}, {user?.name || user?.phone || 'User'}! 👋
          </h1>
          <p className="text-slate-400 text-lg">Here's what's happening with your documents</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={FileText}
            label={t.stats.total}
            value={totalDocs}
            color="bg-blue-500"
            trend={thisMonthDocs > 0 ? `+${thisMonthDocs} ${t.stats.thisMonth}` : null}
          />
          <StatCard
            icon={Clock}
            label={t.stats.processing}
            value={processingDocs}
            color="bg-yellow-500"
          />
          <StatCard
            icon={CheckCircle}
            label={t.stats.completed}
            value={completedDocs}
            color="bg-green-500"
          />
          <StatCard
            icon={TrendingUp}
            label={t.stats.thisMonth}
            value={thisMonthDocs}
            color="bg-purple-500"
          />
        </div>

        {/* Quick Actions */}
        <Card className="mb-10 bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6">{t.quickActions}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => navigate('/upload')}
              icon={Upload}
              className="py-4 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50"
              fullWidth
            >
              {t.uploadNew}
            </Button>
            <Button
              onClick={() => navigate('/history')}
              variant="secondary"
              icon={FileText}
              className="py-4 text-lg bg-slate-700 hover:bg-slate-600 text-white"
              fullWidth
            >
              {t.viewHistory}
            </Button>
          </div>
        </Card>

        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">{t.recentDocs}</h2>
            {recentDocuments.length > 0 && (
              <button
                onClick={() => onNavigate('history')}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                {t.viewHistory}
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {recentDocuments.length > 0 ? (
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <RecentDocumentCard
                  key={doc.id}
                  document={doc}
                  onView={() => onNavigate('analysis', doc)}
                  language={language}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <Card className="text-center py-20 bg-slate-800 border-slate-700">
              <div className="inline-flex items-center justify-center w-28 h-28 bg-slate-700 rounded-full mb-6">
                <FileText size={56} className="text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t.noDocuments}</h3>
              <p className="text-slate-400 mb-8 text-lg">{t.uploadFirst}</p>
              <Button onClick={() => onNavigate('upload')} icon={Upload} className="px-8 py-3 text-lg">
                {t.uploadNew}
              </Button>
            </Card>
          )}
        </div>

        {/* Tips Section - Always show for better UX */}
        <Card className="mt-10 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <div className="flex items-start gap-4">
            <div className="bg-green-600 p-3 rounded-lg flex-shrink-0">
              <AlertCircle size={28} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl mb-4">{t.tipsTitle}</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold text-xl">•</span>
                  <span className="leading-relaxed">Upload clear photos or scanned copies of your documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold text-xl">•</span>
                  <span className="leading-relaxed">Supported formats: JPG, PNG, PDF (Max 10MB)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold text-xl">•</span>
                  <span className="leading-relaxed">All documents are private, encrypted and secure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold text-xl">•</span>
                  <span className="leading-relaxed">Get instant AI analysis in your preferred language</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;