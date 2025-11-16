import { useLanguageStore } from '../store/languageStore';
import DocumentList from '../components/document/DocumentList';

// Translation object
const HISTORY_TRANSLATIONS = {
  en: {
    title: 'Document History',
    subtitle: 'View and manage all your documents',
  },
  hi: {
    title: 'दस्तावेज़ इतिहास',
    subtitle: 'अपने सभी दस्तावेज़ देखें और प्रबंधित करें',
  },
  mr: {
    title: 'दस्तऐवज इतिहास',
    subtitle: 'तुमचे सर्व दस्तऐवज पहा आणि व्यवस्थापित करा',
  },
};

const History = ({ onNavigate }) => {
  const { language } = useLanguageStore();
  const t = HISTORY_TRANSLATIONS[language] || HISTORY_TRANSLATIONS.en;

  const handleUploadClick = () => {
    onNavigate('upload');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {t.title}
        </h1>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      {/* Document List Component */}
      <DocumentList onUploadClick={handleUploadClick} />
    </div>
  );
};

export default History;