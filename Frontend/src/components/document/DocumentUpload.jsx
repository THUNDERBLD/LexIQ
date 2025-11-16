import { useState } from 'react';
import { Upload, ChevronRight, ArrowLeft, FileCheck, AlertCircle } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import { useDocumentStore } from '../../store/documentStore';
import FileUpload from '../common/FileUpload';
import Button from '../common/Button';
import Card from '../common/Card';

// Translation object
const UPLOAD_TRANSLATIONS = {
  en: {
    title: 'Upload Your Document',
    description: 'Select your document type and upload the file for AI analysis',
    selectedType: 'Document Type',
    uploadFile: 'Upload Document',
    change: 'Change',
    analyzing: 'Analyzing Document',
    analyzingDesc: 'Our AI is processing your document. This may take a few moments...',
    analyze: 'Analyze Document',
    uploadSuccess: 'Document uploaded successfully!',
    back: 'Back to Selection',
  },
  hi: {
    title: 'अपना दस्तावेज़ अपलोड करें',
    description: 'अपने दस्तावेज़ प्रकार का चयन करें और AI विश्लेषण के लिए फ़ाइल अपलोड करें',
    selectedType: 'दस्तावेज़ प्रकार',
    uploadFile: 'दस्तावेज़ अपलोड करें',
    change: 'बदलें',
    analyzing: 'दस्तावेज़ का विश्लेषण',
    analyzingDesc: 'हमारा AI आपके दस्तावेज़ को संसाधित कर रहा है। इसमें कुछ समय लग सकता है...',
    analyze: 'दस्तावेज़ का विश्लेषण करें',
    uploadSuccess: 'दस्तावेज़ सफलतापूर्वक अपलोड किया गया!',
    back: 'चयन पर वापस जाएं',
  },
  mr: {
    title: 'तुमचा दस्तऐवज अपलोड करा',
    description: 'तुमचा दस्तऐवज प्रकार निवडा आणि AI विश्लेषणासाठी फाइल अपलोड करा',
    selectedType: 'दस्तऐवज प्रकार',
    uploadFile: 'दस्तऐवज अपलोड करा',
    change: 'बदला',
    analyzing: 'दस्तऐवज विश्लेषण',
    analyzingDesc: 'आमचा AI तुमचा दस्तऐवज प्रक्रिया करत आहे. यास काही क्षण लागू शकतात...',
    analyze: 'दस्तऐवज विश्लेषण करा',
    uploadSuccess: 'दस्तऐवज यशस्वीरित्या अपलोड केला!',
    back: 'निवडीकडे परत जा',
  },
};

const DocumentUpload = ({ documentType, onBack, onComplete }) => {
  const { language } = useLanguageStore();
  const { addDocument } = useDocumentStore();
  const t = UPLOAD_TRANSLATIONS[language] || UPLOAD_TRANSLATIONS.en;

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call - Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Create document object
      const newDocument = {
        file: selectedFile,
        documentType: documentType,
        uploadedAt: new Date().toISOString(),
        status: 'processing',
        name: selectedFile.name,
        size: selectedFile.size,
      };

      // Add to store
      addDocument(newDocument);

      // Wait a moment to show 100% progress
      setTimeout(() => {
        setIsUploading(false);
        onComplete && onComplete(newDocument);
      }, 500);

    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload document. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{t.title}</h2>
          <p className="text-gray-600 mt-1">{t.description}</p>
        </div>
      </div>

      {/* Selected Document Type Display */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`text-5xl p-3 rounded-xl ${documentType.color} bg-opacity-20`}>
              {documentType.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">{t.selectedType}</p>
              <h3 className="text-xl font-bold text-gray-800">{documentType.name}</h3>
            </div>
          </div>
          <Button variant="outline" onClick={onBack} className="hidden sm:flex">
            {t.change}
          </Button>
        </div>
      </Card>

      {/* Upload Section */}
      {!isUploading ? (
        <Card>
          <FileUpload
            onFileSelect={handleFileSelect}
            acceptedFormats="image/*,.pdf"
            maxSizeInMB={10}
            multiple={false}
          />

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          {selectedFile && (
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleUpload}
                icon={ChevronRight}
                fullWidth
                className="text-lg py-4"
              >
                {t.analyze}
              </Button>
            </div>
          )}
        </Card>
      ) : (
        /* Upload Progress */
        <Card className="text-center">
          <div className="py-12">
            {/* Animated Upload Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6 animate-pulse">
              <Upload size={48} className="text-blue-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.analyzing}</h3>
            <p className="text-gray-600 mb-6">{t.analyzingDesc}</p>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-semibold">
                {uploadProgress}% Complete
              </p>
            </div>

            {/* File Info */}
            <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-lg">
              <FileCheck size={24} className="text-green-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Tips Section */}
      {!isUploading && (
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
            <AlertCircle size={20} className="text-blue-600" />
            Tips for Better Results
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Ensure the document is clear and readable</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Upload high-quality scans or photos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Make sure all important text is visible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>PDF format works best for multi-page documents</span>
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
};

export default DocumentUpload;