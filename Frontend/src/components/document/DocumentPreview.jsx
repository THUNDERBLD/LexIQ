import { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize2,
  FileText,
  Image as ImageIcon,
  File
} from 'lucide-react';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const DocumentPreview = ({ document, onClose }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (document?.file) {
      generatePreview(document.file);
    }
  }, [document]);

  const generatePreview = (file) => {
    setIsLoading(true);
    setError(null);

    try {
      const fileType = file.type;

      // Handle images
      if (fileType.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target.result);
          setIsLoading(false);
        };
        reader.onerror = () => {
          setError('Failed to load image');
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      }
      // Handle PDFs
      else if (fileType === 'application/pdf') {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setIsLoading(false);
      }
      // Unsupported file types
      else {
        setError('Preview not available for this file type');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Failed to generate preview');
      setIsLoading(false);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = () => {
    if (document?.file) {
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

  const getFileIcon = () => {
    if (!document?.file) return <File size={48} />;
    
    const fileType = document.file.type;
    if (fileType.startsWith('image/')) return <ImageIcon size={48} />;
    if (fileType === 'application/pdf') return <FileText size={48} />;
    return <File size={48} />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="text-blue-600">
              {getFileIcon()}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-lg text-gray-800 truncate">
                {document?.name || document?.file?.name || 'Document Preview'}
              </h3>
              <p className="text-sm text-gray-500">
                {document?.file && `${(document.file.size / 1024).toFixed(2)} KB`}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Zoom Out"
              disabled={zoom <= 50}
            >
              <ZoomOut size={20} />
            </button>
            
            <span className="text-sm font-medium text-gray-600 min-w-[60px] text-center">
              {zoom}%
            </span>
            
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Zoom In"
              disabled={zoom >= 200}
            >
              <ZoomIn size={20} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <button
              onClick={handleRotate}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Rotate"
            >
              <RotateCw size={20} />
            </button>

            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download"
            >
              <Download size={20} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <button
              onClick={onClose}
              className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <LoadingSpinner size="large" text="Loading preview..." />
            </div>
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <File size={64} className="text-gray-400" />
              <p className="text-gray-600 font-medium">{error}</p>
              <Button onClick={handleDownload} icon={Download}>
                Download File
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-full">
              {document?.file?.type === 'application/pdf' ? (
                /* PDF Preview */
                <iframe
                  src={previewUrl}
                  className="w-full h-full min-h-[600px] border-0 rounded-lg shadow-lg"
                  title="PDF Preview"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transformOrigin: 'center center',
                  }}
                />
              ) : (
                /* Image Preview */
                <img
                  src={previewUrl}
                  alt="Document preview"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.2s ease-out',
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Maximize2 size={16} />
              <span>Use scroll to zoom, drag to pan</span>
            </div>
            <Button onClick={onClose} variant="secondary">
              Close Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;