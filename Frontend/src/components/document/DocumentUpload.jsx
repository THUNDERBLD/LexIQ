import { useState } from 'react';
import { Upload, ChevronRight, ArrowLeft, FileCheck, AlertCircle, CheckCircle } from 'lucide-react';

// Mock stores
const useLanguageStore = () => ({ language: 'en' });
const useDocumentStore = () => ({ 
  addDocument: (doc) => console.log('Document added:', doc) 
});

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
    dragDrop: 'Drag and drop your file here, or',
    browse: 'browse',
    supportedFormats: 'Supported formats: PDF, JPG, PNG (Max 10MB)',
    tipsTitle: 'Tips for Better Results',
    tips: [
      'Ensure the document is clear and readable',
      'Upload high-quality scans or photos',
      'Make sure all important text is visible',
      'PDF format works best for multi-page documents'
    ]
  },
};

// Mock FileUpload Component
const FileUpload = ({ onFileSelect, acceptedFormats, maxSizeInMB }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all
          ${isDragging 
            ? 'border-blue-400 bg-blue-500/10' 
            : 'border-slate-600/50 bg-slate-800/40 hover:border-blue-500/50 hover:bg-slate-800/60'
          }
        `}
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept={acceptedFormats}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-500/30">
            <Upload size={40} className="text-blue-400" />
          </div>
          
          <div>
            <p className="text-lg text-slate-200 mb-2">
              <span className="text-slate-300">Drag and drop your file here, or </span>
              <span className="text-blue-400 font-semibold">browse</span>
            </p>
            <p className="text-sm text-slate-400">
              Supported formats: PDF, JPG, PNG (Max {maxSizeInMB}MB)
            </p>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <CheckCircle size={24} className="text-green-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-green-200 truncate">{selectedFile.name}</p>
            <p className="text-sm text-green-300/70">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const DocumentUpload = ({ 
  documentType = {
    icon: '📄',
    name: 'Document',
    color: 'bg-blue-500'
  }, 
  onBack = () => {}, 
  onComplete = () => {} 
}) => {
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

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      setUploadProgress(100);

      const newDocument = {
        file: selectedFile,
        documentType: documentType,
        uploadedAt: new Date().toISOString(),
        status: 'processing',
        name: selectedFile.name,
        size: selectedFile.size,
      };

      addDocument(newDocument);

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
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-3 hover:bg-slate-700/50 rounded-lg transition-all border border-slate-600/30 hover:border-blue-500/50 group"
        >
          <ArrowLeft size={24} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-white">{t.title}</h2>
          <p className="text-blue-200/70 mt-1">{t.description}</p>
        </div>
      </div>

      {/* Selected Document Type Display */}
      <div className="border-2 border-blue-500/30 bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className={`text-5xl p-4 rounded-xl ${documentType.color} bg-opacity-20 border border-slate-600/30`}>
              {documentType.icon}
            </div>
            <div>
              <p className="text-sm text-blue-300/70 font-medium mb-1">{t.selectedType}</p>
              <h3 className="text-xl font-bold text-white">{documentType.name}</h3>
            </div>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-blue-500/50 rounded-lg text-slate-200 hover:text-white font-medium transition-all"
          >
            {t.change}
          </button>
        </div>
      </div>

      {/* Upload Section */}
      {!isUploading ? (
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-xl">
          <FileUpload
            onFileSelect={handleFileSelect}
            acceptedFormats="image/*,.pdf"
            maxSizeInMB={10}
          />

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/30 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 font-medium">{error}</p>
            </div>
          )}

          {/* Action Button */}
          {selectedFile && (
            <div className="mt-6">
              <button
                onClick={handleUpload}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{t.analyze}</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Upload Progress */
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 shadow-xl text-center">
          <div className="py-8">
            {/* Animated Upload Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-500/20 rounded-full mb-6 animate-pulse border-2 border-blue-500/30">
              <Upload size={48} className="text-blue-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">{t.analyzing}</h3>
            <p className="text-blue-200/70 mb-6">{t.analyzingDesc}</p>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden border border-slate-600/50">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-full transition-all duration-300 ease-out shadow-lg shadow-blue-500/50"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-blue-300 mt-3 font-semibold">
                {uploadProgress}% Complete
              </p>
            </div>

            {/* File Info */}
            <div className="mt-8 inline-flex items-center gap-3 px-6 py-4 bg-slate-700/40 border border-slate-600/50 rounded-lg">
              <FileCheck size={24} className="text-green-400" />
              <div className="text-left">
                <p className="font-semibold text-white">{selectedFile.name}</p>
                <p className="text-sm text-slate-400">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      {!isUploading && (
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-2 border-blue-500/30 rounded-xl p-6 shadow-xl">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-200">
            <AlertCircle size={20} className="text-blue-400" />
            Tips for Better Results
          </h4>
          <ul className="space-y-3 text-sm text-blue-100/80">
            {t.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-400 font-bold text-lg">•</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;