import React, { useState } from 'react';
import { 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown,
  Volume2,
  Copy,
  Share2,
  BookOpen,
  Smile
} from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import Card from '../common/Card';
import AudioPlayer from '../common/AudioPlayer';
import Button from '../common/Button';

// Translation object
const EXPLANATION_TRANSLATIONS = {
  en: {
    title: 'Simple Explanation',
    subtitle: 'Your document explained in easy words',
    inSimpleWords: 'In Simple Words',
    helpfulQuestion: 'Was this explanation helpful?',
    yes: 'Yes, helpful',
    no: 'Not clear',
    thankYou: 'Thank you for your feedback!',
    askQuestion: 'Ask a Question',
    copy: 'Copy Text',
    share: 'Share',
    copied: 'Copied!',
    readingLevel: 'Reading Level',
    elementary: 'Elementary',
    simple: 'Simple',
    standard: 'Standard',
    technical: 'Technical',
    changeLevel: 'Change Reading Level',
    noExplanation: 'No explanation available',
  },
  hi: {
    title: 'सरल व्याख्या',
    subtitle: 'आपका दस्तावेज़ आसान शब्दों में समझाया गया',
    inSimpleWords: 'सरल शब्दों में',
    helpfulQuestion: 'क्या यह व्याख्या उपयोगी थी?',
    yes: 'हां, उपयोगी',
    no: 'स्पष्ट नहीं',
    thankYou: 'आपकी प्रतिक्रिया के लिए धन्यवाद!',
    askQuestion: 'एक प्रश्न पूछें',
    copy: 'टेक्स्ट कॉपी करें',
    share: 'साझा करें',
    copied: 'कॉपी किया गया!',
    readingLevel: 'पठन स्तर',
    elementary: 'प्राथमिक',
    simple: 'सरल',
    standard: 'मानक',
    technical: 'तकनीकी',
    changeLevel: 'पठन स्तर बदलें',
    noExplanation: 'कोई व्याख्या उपलब्ध नहीं',
  },
  mr: {
    title: 'सोपे स्पष्टीकरण',
    subtitle: 'तुमचा दस्तऐवज सोप्या शब्दांत समजावला',
    inSimpleWords: 'सोप्या शब्दांत',
    helpfulQuestion: 'हे स्पष्टीकरण उपयुक्त होते का?',
    yes: 'होय, उपयुक्त',
    no: 'स्पष्ट नाही',
    thankYou: 'तुमच्या अभिप्रायाबद्दल धन्यवाद!',
    askQuestion: 'एक प्रश्न विचारा',
    copy: 'मजकूर कॉपी करा',
    share: 'सामायिक करा',
    copied: 'कॉपी केले!',
    readingLevel: 'वाचन स्तर',
    elementary: 'प्राथमिक',
    simple: 'सोपा',
    standard: 'मानक',
    technical: 'तांत्रिक',
    changeLevel: 'वाचन स्तर बदला',
    noExplanation: 'कोणतेही स्पष्टीकरण उपलब्ध नाही',
  },
};

const ReadingLevelBadge = ({ level, language, onClick }) => {
  const t = EXPLANATION_TRANSLATIONS[language] || EXPLANATION_TRANSLATIONS.en;
  
  const levels = {
    elementary: { label: t.elementary, color: 'bg-green-100 text-green-800', icon: '🌱' },
    simple: { label: t.simple, color: 'bg-blue-100 text-blue-800', icon: '📖' },
    standard: { label: t.standard, color: 'bg-purple-100 text-purple-800', icon: '📚' },
    technical: { label: t.technical, color: 'bg-gray-100 text-gray-800', icon: '🎓' },
  };

  const { label, color, icon } = levels[level] || levels.simple;

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${color} hover:opacity-80 transition-opacity`}
      title={t.changeLevel}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
};

const SimpleExplanation = ({ 
  explanation = '',
  level = 'simple',
  onLevelChange,
  showFeedback = true,
  showActions = true 
}) => {
  const { language } = useLanguageStore();
  const t = EXPLANATION_TRANSLATIONS[language] || EXPLANATION_TRANSLATIONS.en;

  const [feedback, setFeedback] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleFeedback = (isHelpful) => {
    setFeedback(isHelpful ? 'positive' : 'negative');
    // Here you would typically send feedback to your backend
    console.log('Feedback:', isHelpful ? 'positive' : 'negative');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(explanation);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Document Explanation',
          text: explanation,
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="bg-purple-600 p-3 rounded-lg">
            <MessageCircle size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
        </div>
        <AudioPlayer text={explanation} />
      </div>

      {/* Reading Level Selector */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">{t.readingLevel}:</span>
        <ReadingLevelBadge 
          level={level} 
          language={language}
          onClick={onLevelChange}
        />
      </div>

      {/* Explanation Content */}
      {explanation ? (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          {/* Icon Header */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
            <BookOpen size={20} className="text-purple-600" />
            <span className="font-semibold text-purple-900">{t.inSimpleWords}</span>
            <Smile size={20} className="text-yellow-500" />
          </div>

          {/* Main Text */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
              {explanation}
            </p>
          </div>

          {/* Quick Actions */}
          {showActions && (
            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                <Copy size={16} />
                {isCopied ? t.copied : t.copy}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                <Share2 size={16} />
                {t.share}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl p-12 shadow-sm mb-6 text-center">
          <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl font-semibold text-gray-700">{t.noExplanation}</p>
        </div>
      )}

      {/* Feedback Section */}
      {showFeedback && explanation && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          {feedback === null ? (
            <div>
              <p className="text-center font-semibold text-gray-800 mb-4">
                {t.helpfulQuestion}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleFeedback(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg font-semibold transition-colors"
                >
                  <ThumbsUp size={20} />
                  {t.yes}
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg font-semibold transition-colors"
                >
                  <ThumbsDown size={20} />
                  {t.no}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
                feedback === 'positive' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {feedback === 'positive' ? (
                  <ThumbsUp size={32} className="text-green-600" />
                ) : (
                  <ThumbsDown size={32} className="text-red-600" />
                )}
              </div>
              <p className="text-lg font-semibold text-gray-800 mb-2">
                {t.thankYou}
              </p>
              {feedback === 'negative' && (
                <Button
                  variant="primary"
                  icon={MessageCircle}
                  className="mt-4"
                >
                  {t.askQuestion}
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-l-4 border-purple-400">
        <div className="flex items-start gap-3">
          <BookOpen size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-purple-900 leading-relaxed">
            <strong className="font-semibold">How we explain:</strong> We use simple words and 
            everyday examples to help you understand legal language. If something is still unclear, 
            you can ask questions or contact a lawyer for detailed advice.
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SimpleExplanation;