import { useState } from 'react';
import { useLanguageStore } from '../store/languageStore';
import DocumentTypeSelector from '../components/document/DocumentTypeSelector';
import DocumentUpload from '../components/document/DocumentUpload';

// Translation object
const UPLOAD_TRANSLATIONS = {
  en: {
    title: 'Upload Document',
    subtitle: 'Select document type and upload',
  },
  hi: {
    title: 'दस्तावेज़ अपलोड करें',
    subtitle: 'दस्तावेज़ प्रकार चुनें और अपलोड करें',
  },
  mr: {
    title: 'दस्तऐवज अपलोड करा',
    subtitle: 'दस्तऐवज प्रकार निवडा आणि अपलोड करा',
  },
};

const Upload = ({ onNavigate }) => {
  const { language } = useLanguageStore();
  const t = UPLOAD_TRANSLATIONS[language] || UPLOAD_TRANSLATIONS.en;

  const [step, setStep] = useState('select'); // 'select' or 'upload'
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);

  const handleTypeSelect = (docType) => {
    setSelectedDocumentType(docType);
    setStep('upload');
  };

  const handleBack = () => {
    setStep('select');
    setSelectedDocumentType(null);
  };

  const handleUploadComplete = (document) => {
    // Navigate to analysis page with the document
    onNavigate('analysis', document);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header with gradient background */}
        {step === 'select' && (
          <div className="text-center mb-12 relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 relative">
              {t.title}
            </h1>
            <p className="text-blue-200/80 text-lg md:text-xl relative">{t.subtitle}</p>
            
            {/* Decorative line */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded"></div>
            </div>
          </div>
        )}

        {/* Content with card background */}
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-xl"></div>
          
          {/* Main content card */}
          <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-6 md:p-8">
            {step === 'select' ? (
              <DocumentTypeSelector onSelect={handleTypeSelect} />
            ) : (
              <DocumentUpload
                documentType={selectedDocumentType}
                onBack={handleBack}
                onComplete={handleUploadComplete}
              />
            )}
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="mt-8 flex justify-center gap-2 opacity-30">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Upload;