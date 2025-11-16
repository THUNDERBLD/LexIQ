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
    <div className="max-w-7xl mx-auto">
      {/* Page Header (only show on select step) */}
      {step === 'select' && (
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {t.title}
          </h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </div>
      )}

      {/* Content */}
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
  );
};

export default Upload;