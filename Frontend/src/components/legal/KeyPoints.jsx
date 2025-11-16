import { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  XCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb
} from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import Card from '../common/Card';
import AudioPlayer from '../common/AudioPlayer';

// Translation object
const KEYPOINTS_TRANSLATIONS = {
  en: {
    title: 'Key Points',
    subtitle: 'Important information from your document',
    showAll: 'Show All Points',
    showLess: 'Show Less',
    important: 'Important',
    positive: 'Positive',
    negative: 'Warning',
    neutral: 'Information',
    noPoints: 'No key points identified',
    readAloud: 'Read all points aloud',
  },
  hi: {
    title: 'मुख्य बिंदु',
    subtitle: 'आपके दस्तावेज़ से महत्वपूर्ण जानकारी',
    showAll: 'सभी बिंदु दिखाएं',
    showLess: 'कम दिखाएं',
    important: 'महत्वपूर्ण',
    positive: 'सकारात्मक',
    negative: 'चेतावनी',
    neutral: 'जानकारी',
    noPoints: 'कोई मुख्य बिंदु नहीं मिला',
    readAloud: 'सभी बिंदुओं को जोर से पढ़ें',
  },
  mr: {
    title: 'मुख्य मुद्दे',
    subtitle: 'तुमच्या दस्तऐवजातून महत्त्वाची माहिती',
    showAll: 'सर्व मुद्दे दाखवा',
    showLess: 'कमी दाखवा',
    important: 'महत्त्वाचे',
    positive: 'सकारात्मक',
    negative: 'चेतावणी',
    neutral: 'माहिती',
    noPoints: 'कोणतेही मुख्य मुद्दे आढळले नाहीत',
    readAloud: 'सर्व मुद्दे मोठ्याने वाचा',
  },
};

const PointIcon = ({ type }) => {
  const iconConfig = {
    important: { 
      icon: AlertCircle, 
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    positive: { 
      icon: CheckCircle, 
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    negative: { 
      icon: XCircle, 
      color: 'text-red-600',
      bg: 'bg-red-100',
    },
    neutral: { 
      icon: Info, 
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
  };

  const config = iconConfig[type] || iconConfig.neutral;
  const Icon = config.icon;

  return (
    <div className={`p-3 rounded-full ${config.bg} flex-shrink-0`}>
      <Icon size={24} className={config.color} />
    </div>
  );
};

const TypeBadge = ({ type, language }) => {
  const t = KEYPOINTS_TRANSLATIONS[language] || KEYPOINTS_TRANSLATIONS.en;
  
  const config = {
    important: {
      label: t.important,
      color: 'bg-orange-100 text-orange-800 border-orange-300',
    },
    positive: {
      label: t.positive,
      color: 'bg-green-100 text-green-800 border-green-300',
    },
    negative: {
      label: t.negative,
      color: 'bg-red-100 text-red-800 border-red-300',
    },
    neutral: {
      label: t.neutral,
      color: 'bg-blue-100 text-blue-800 border-blue-300',
    },
  };

  const { label, color } = config[type] || config.neutral;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${color}`}>
      {label}
    </span>
  );
};

const KeyPointItem = ({ point, index, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border-2 border-gray-100 hover:border-blue-200">
      <div className="flex gap-4">
        {/* Icon */}
        <PointIcon type={point.type} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-400 text-lg">#{index + 1}</span>
              <TypeBadge type={point.type} language={language} />
            </div>
            <AudioPlayer text={point.text} />
          </div>

          {/* Main Text */}
          <p className="text-base leading-relaxed text-gray-800 font-medium mb-2">
            {point.text}
          </p>

          {/* Additional Details */}
          {point.details && (
            <div>
              <p 
                className={`text-sm text-gray-600 leading-relaxed transition-all duration-200 ${
                  isExpanded ? '' : 'line-clamp-2'
                }`}
              >
                {point.details}
              </p>
              {point.details.length > 100 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp size={16} />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Show More
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Tags/Labels */}
          {point.tags && point.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {point.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const KeyPoints = ({ points = [], collapsible = true, initialShowCount = 5 }) => {
  const { language } = useLanguageStore();
  const t = KEYPOINTS_TRANSLATIONS[language] || KEYPOINTS_TRANSLATIONS.en;
  const [showAll, setShowAll] = useState(!collapsible);

  const displayPoints = showAll ? points : points.slice(0, initialShowCount);
  const hasMore = points.length > initialShowCount;

  // Prepare text for audio player
  const allPointsText = points.map((p, i) => `Point ${i + 1}: ${p.text}`).join('. ');

  // Count by type
  const typeCounts = points.reduce((acc, point) => {
    acc[point.type] = (acc[point.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="bg-orange-600 p-3 rounded-lg">
            <Lightbulb size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
        </div>
        {points.length > 0 && (
          <AudioPlayer text={allPointsText} />
        )}
      </div>

      {/* Summary Stats */}
      {points.length > 0 && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{points.length}</p>
              <p className="text-xs text-gray-600">Total Points</p>
            </div>
            {Object.entries(typeCounts).map(([type, count]) => (
              <div key={type} className="text-center">
                <p className="text-2xl font-bold text-gray-800">{count}</p>
                <TypeBadge type={type} language={language} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Points List */}
      {points.length > 0 ? (
        <>
          <div className="space-y-4 mb-6">
            {displayPoints.map((point, index) => (
              <KeyPointItem
                key={point.id || index}
                point={point}
                index={index}
                language={language}
              />
            ))}
          </div>

          {/* Show More/Less Button */}
          {collapsible && hasMore && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 mx-auto"
              >
                {showAll ? (
                  <>
                    <ChevronUp size={20} />
                    {t.showLess}
                  </>
                ) : (
                  <>
                    <ChevronDown size={20} />
                    {t.showAll} ({points.length - initialShowCount} more)
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <Info size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl font-semibold text-gray-700">{t.noPoints}</p>
        </div>
      )}

      {/* Help Tip */}
      {points.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong className="font-semibold">Tip:</strong> Pay special attention to points 
              marked as "Important" or "Warning". These may require immediate action or legal consultation.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default KeyPoints;