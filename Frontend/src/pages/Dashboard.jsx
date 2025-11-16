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
import { useAuthStore } from '../store/authStore';
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
  },
};

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        {trend && (
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <TrendingUp size={16} />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className={`p-4 rounded-xl ${color} bg-opacity-20`}>
        <Icon size={32} className={color.replace('bg-', 'text-')} />
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
    processing: { icon: Clock, color: 'text-yellow-600 bg-yellow-100', label: 'Processing' },
    completed: { icon: CheckCircle, color: 'text-green-600 bg-green-100', label: 'Completed' },
    failed: { icon: AlertCircle, color: 'text-red-600 bg-red-100', label: 'Failed' },
  };

  const status = statusConfig[document.status] || statusConfig.processing;
  const StatusIcon = status.icon;

  return (
    <Card hover onClick={onView} className="cursor-pointer">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${document.documentType.color} bg-opacity-20 flex-shrink-0`}>
          <span className="text-3xl">{document.documentType.icon}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-gray-800 truncate">{document.name}</h3>
            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${status.color}`}>
              <StatusIcon size={12} />
              {status.label}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{document.documentType.name}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(document.uploadedAt)}
            </span>
            {document.analysis?.confidence && (
              <span className="text-green-600 font-semibold">
                {document.analysis.confidence}% confidence
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

const Dashboard = ({ onNavigate }) => {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const { documents } = useDocumentStore();
  const t = DASHBOARD_TRANSLATIONS[language] || DASHBOARD_TRANSLATIONS.en;

  // Calculate stats
  const totalDocs = documents.length;
  const processingDocs = documents.filter(d => d.status === 'processing').length;
  const completedDocs = documents.filter(d => d.status === 'completed').length;
  
  // Get this month's documents
  const currentMonth = new Date().getMonth();
  const thisMonthDocs = documents.filter(d => {
    const docMonth = new Date(d.uploadedAt).getMonth();
    return docMonth === currentMonth;
  }).length;

  // Get recent documents (last 5)
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {t.welcome}, {user?.name || user?.phone || 'User'}! 👋
        </h1>
        <p className="text-gray-600">Here's what's happening with your documents</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
      <Card className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t.quickActions}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={() => onNavigate('upload')}
            icon={Upload}
            className="py-4 text-lg"
            fullWidth
          >
            {t.uploadNew}
          </Button>
          <Button
            onClick={() => onNavigate('history')}
            variant="secondary"
            icon={FileText}
            className="py-4 text-lg"
            fullWidth
          >
            {t.viewHistory}
          </Button>
        </div>
      </Card>

      {/* Recent Documents */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{t.recentDocs}</h2>
          {recentDocuments.length > 0 && (
            <button
              onClick={() => onNavigate('history')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
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
          <Card className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <FileText size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.noDocuments}</h3>
            <p className="text-gray-600 mb-6">{t.uploadFirst}</p>
            <Button onClick={() => onNavigate('upload')} icon={Upload}>
              {t.uploadNew}
            </Button>
          </Card>
        )}
      </div>

      {/* Tips Section */}
      {totalDocs === 0 && (
        <Card className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="flex items-start gap-4">
            <div className="bg-green-600 p-3 rounded-lg flex-shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Getting Started Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Upload clear photos or scanned copies of your documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Supported formats: JPG, PNG, PDF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>All documents are private and encrypted</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;