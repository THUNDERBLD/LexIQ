import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import Card from '../common/Card';
import AudioPlayer from '../common/AudioPlayer';

// Translation object
const SUMMARY_TRANSLATIONS = {
  en: {
    title: 'Document Summary',
    subtitle: 'AI-generated simple explanation of your document',
    readMore: 'Read More',
    readLess: 'Read Less',
    confidence: 'Confidence Score',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    disclaimer: 'This is an AI-generated summary. Please consult a legal professional for accurate advice.',
    documentType: 'Document Type',
    analyzedOn: 'Analyzed on',
    wordCount: 'words',
  },
  hi: {
    title: 'दस्तावेज़ सारांश',
    subtitle: 'आपके दस्तावेज़ की AI-जनित सरल व्याख्या',
    readMore: 'और पढ़ें',
    readLess: 'कम पढ़ें',
    confidence: 'विश्वास स्कोर',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'निम्न',
    disclaimer: 'यह एक AI-जनित सारांश है। सटीक सलाह के लिए कृपया एक कानूनी पेशेवर से परामर्श लें।',
    documentType: 'दस्तावेज़ प्रकार',
    analyzedOn: 'विश्लेषण किया गया',
    wordCount: 'शब्द',
  },
  mr: {
    title: 'दस्तऐवज सारांश',
    subtitle: 'तुमच्या दस्तऐवजाचे AI-निर्मित सोपे स्पष्टीकरण',
    readMore: 'अधिक वाचा',
    readLess: 'कमी वाचा',
    confidence: 'विश्वास स्कोअर',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कमी',
    disclaimer: 'हा एक AI-निर्मित सारांश आहे. अचूक सल्ला घेण्यासाठी कृपया कायदेशीर व्यावसायिकाचा सल्ला घ्या.',
    documentType: 'दस्तऐवज प्रकार',
    analyzedOn: 'विश्लेषण केले',
    wordCount: 'शब्द',
  },
};

const ConfidenceBadge = ({ score, language }) => {
  const t = SUMMARY_TRANSLATIONS[language] || SUMMARY_TRANSLATIONS.en;
  
  let level, color, icon;
  
  if (score >= 85) {
    level = t.high;
    color = 'bg-green-100 text-green-800 border-green-300';
    icon = <CheckCircle size={16} />;
  } else if (score >= 70) {
    level = t.medium;
    color = 'bg-yellow-100 text-yellow-800 border-yellow-300';
    icon = <AlertCircle size={16} />;
  } else {
    level = t.low;
    color = 'bg-red-100 text-red-800 border-red-300';
    icon = <AlertCircle size={16} />;
  }

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${color} font-semibold`}>
      {icon}
      <span className="text-sm">{level}: {score}%</span>
    </div>
  );
};

const LegalSummary = ({ 
  summary, 
  documentType, 
  confidence = 85, 
  analyzedDate,
  showMetadata = true,
  collapsible = true,
  maxLength = 300 
}) => {
  const { language } = useLanguageStore();
  const t = SUMMARY_TRANSLATIONS[language] || SUMMARY_TRANSLATIONS.en;
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = collapsible && summary.length > maxLength;
  const displayText = shouldTruncate && !isExpanded 
    ? summary.slice(0, maxLength) + '...' 
    : summary;

  const wordCount = summary.split(/\s+/).length;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="bg-blue-600 p-3 rounded-lg">
            <FileText size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
        </div>
        <AudioPlayer text={summary} />
      </div>

      {/* Metadata */}
      {showMetadata && (
        <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-blue-200">
          {documentType && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">{documentType.icon}</span>
              <div>
                <p className="text-xs text-gray-600">{t.documentType}</p>
                <p className="font-semibold text-gray-800">{documentType.name}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <ConfidenceBadge score={confidence} language={language} />
          </div>

          {analyzedDate && (
            <div>
              <p className="text-xs text-gray-600">{t.analyzedOn}</p>
              <p className="font-semibold text-gray-800">{formatDate(analyzedDate)}</p>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-600">Length</p>
            <p className="font-semibold text-gray-800">{wordCount} {t.wordCount}</p>
          </div>
        </div>
      )}

      {/* Summary Content */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
          {displayText}
        </p>

        {/* Read More/Less Button */}
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={20} />
                {t.readLess}
              </>
            ) : (
              <>
                <ChevronDown size={20} />
                {t.readMore}
              </>
            )}
          </button>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800 leading-relaxed">
            <strong className="font-semibold">Disclaimer:</strong> {t.disclaimer}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default LegalSummary;