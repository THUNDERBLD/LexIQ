import { useState, useRef } from 'react';
import { Upload, X, FileCheck, AlertCircle } from 'lucide-react';

const FileUpload = ({ 
  onFileSelect, 
  acceptedFormats = 'image/*,.pdf',
  maxSizeInMB = 10,
  multiple = false,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const maxSize = maxSizeInMB * 1024 * 1024; // Convert MB to bytes
    
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSizeInMB}MB`);
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles);
    const validFiles = fileArray.filter(validateFile);
    
    if (validFiles.length > 0) {
      if (multiple) {
        setFiles([...files, ...validFiles]);
        onFileSelect && onFileSelect([...files, ...validFiles]);
      } else {
        setFiles([validFiles[0]]);
        onFileSelect && onFileSelect(validFiles[0]);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileSelect && onFileSelect(multiple ? newFiles : null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={triggerFileInput}
        className={`
          border-4 border-dashed rounded-xl p-12 
          text-center transition-all cursor-pointer
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-25'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept={acceptedFormats}
          multiple={multiple}
        />
        
        <Upload 
          size={64} 
          className={`mx-auto mb-4 transition-colors ${
            isDragging ? 'text-blue-500' : 'text-gray-400'
          }`} 
        />
        
        <p className="text-xl font-semibold mb-2 text-gray-700">
          {isDragging ? 'Drop your files here' : 'Drag and drop or click to select'}
        </p>
        
        <p className="text-gray-500 text-sm">
          Supported formats: Images (JPG, PNG) and PDF
        </p>
        
        <p className="text-gray-400 text-xs mt-2">
          Maximum file size: {maxSizeInMB}MB
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FileCheck size={24} className="text-green-600 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-800 truncate">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex-shrink-0"
                aria-label="Remove file"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;