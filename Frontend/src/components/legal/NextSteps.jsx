import { useState } from 'react';
import { 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import Card from '../common/Card';
import AudioPlayer from '../common/AudioPlayer';
import Button from '../common/Button';

// Translation object
const NEXTSTEPS_TRANSLATIONS = {
  en: {
    title: 'What to Do Next',
    subtitle: 'Recommended actions based on your document',
    priority: 'Priority',
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority',
    timeline: 'Timeline',
    immediate: 'Immediate',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    flexible: 'Flexible',
    completed: 'Mark as Done',
    markComplete: 'Completed',
    findLawyer: 'Find a Lawyer',
    contactSupport: 'Contact Support',
    noSteps: 'No action items at this time',
    allDone: 'Great! All steps completed',
  },
  hi: {
    title: 'आगे क्या करें',
    subtitle: 'आपके दस्तावेज़ के आधार पर अनुशंसित कार्रवाई',
    priority: 'प्राथमिकता',
    high: 'उच्च प्राथमिकता',
    medium: 'मध्यम प्राथमिकता',
    low: 'निम्न प्राथमिकता',
    timeline: 'समय सीमा',
    immediate: 'तत्काल',
    thisWeek: 'इस सप्ताह',
    thisMonth: 'इस महीने',
    flexible: 'लचीला',
    completed: 'पूर्ण के रूप में चिह्नित करें',
    markComplete: 'पूर्ण',
    findLawyer: 'वकील खोजें',
    contactSupport: 'सहायता से संपर्क करें',
    noSteps: 'इस समय कोई कार्रवाई आइटम नहीं',
    allDone: 'बढ़िया! सभी चरण पूर्ण',
  },
  mr: {
    title: 'पुढे काय करायचे',
    subtitle: 'तुमच्या दस्तऐवजाच्या आधारावर शिफारस केलेल्या कृती',
    priority: 'प्राधान्य',
    high: 'उच्च प्राधान्य',
    medium: 'मध्यम प्राधान्य',
    low: 'कमी प्राधान्य',
    timeline: 'वेळरेखा',
    immediate: 'तात्काळ',
    thisWeek: 'या आठवड्यात',
    thisMonth: 'या महिन्यात',
    flexible: 'लवचिक',
    completed: 'पूर्ण म्हणून चिन्हांकित करा',
    markComplete: 'पूर्ण',
    findLawyer: 'वकील शोधा',
    contactSupport: 'समर्थनाशी संपर्क साधा',
    noSteps: 'या वेळी कोणत्याही कृती आयटम नाहीत',
    allDone: 'छान! सर्व पायऱ्या पूर्ण',
  },
};

const PriorityBadge = ({ priority, language }) => {
  const t = NEXTSTEPS_TRANSLATIONS[language] || NEXTSTEPS_TRANSLATIONS.en;
  
  const config = {
    high: {
      label: t.high,
      color: 'bg-red-100 text-red-800 border-red-300',
      icon: <AlertTriangle size={14} />,
    },
    medium: {
      label: t.medium,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: <Clock size={14} />,
    },
    low: {
      label: t.low,
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: <Info size={14} />,
    },
  };

  const { label, color, icon } = config[priority] || config.medium;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
      {icon}
      {label}
    </span>
  );
};

const TimelineBadge = ({ timeline, language }) => {
  const t = NEXTSTEPS_TRANSLATIONS[language] || NEXTSTEPS_TRANSLATIONS.en;
  
  const labels = {
    immediate: t.immediate,
    week: t.thisWeek,
    month: t.thisMonth,
    flexible: t.flexible,
  };

  return (
    <span className="text-sm text-gray-600 flex items-center gap-1.5">
      <Clock size={14} />
      {labels[timeline] || timeline}
    </span>
  );
};

const StepItem = ({ step, index, onComplete, language }) => {
  const t = NEXTSTEPS_TRANSLATIONS[language] || NEXTSTEPS_TRANSLATIONS.en;
  const [isCompleted, setIsCompleted] = useState(step.completed || false);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
    onComplete && onComplete(step.id, !isCompleted);
  };

  return (
    <div 
      className={`
        p-6 rounded-xl transition-all duration-200
        ${isCompleted 
          ? 'bg-green-50 border-2 border-green-200 opacity-75' 
          : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
        }
      `}
    >
      <div className="flex gap-4">
        {/* Step Number */}
        <div className={`
          flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl
          ${isCompleted 
            ? 'bg-green-600 text-white' 
            : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
          }
        `}>
          {isCompleted ? <CheckCircle2 size={24} /> : index + 1}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <PriorityBadge priority={step.priority} language={language} />
              <TimelineBadge timeline={step.timeline} language={language} />
            </div>
            <AudioPlayer text={step.action} showButton={!isCompleted} />
          </div>

          {/* Action Text */}
          <p className={`
            text-lg leading-relaxed mb-3
            ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800 font-medium'}
          `}>
            {step.action}
          </p>

          {/* Details */}
          {step.details && !isCompleted && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-gray-700 leading-relaxed">{step.details}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {!isCompleted ? (
              <>
                <Button
                  variant="success"
                  onClick={handleComplete}
                  icon={CheckCircle2}
                  className="text-sm py-2"
                >
                  {t.completed}
                </Button>
                {step.link && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(step.link, '_blank')}
                    icon={ExternalLink}
                    className="text-sm py-2"
                  >
                    Learn More
                  </Button>
                )}
              </>
            ) : (
              <Button
                variant="secondary"
                onClick={handleComplete}
                className="text-sm py-2"
              >
                Undo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NextSteps = ({ steps = [], onStepComplete, showActions = true }) => {
  const { language } = useLanguageStore();
  const t = NEXTSTEPS_TRANSLATIONS[language] || NEXTSTEPS_TRANSLATIONS.en;

  const completedCount = steps.filter(s => s.completed).length;
  const totalCount = steps.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Sort steps by priority and completion status
  const sortedSteps = [...steps].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return (priorityOrder[a.priority] || 1) - (priorityOrder[b.priority] || 1);
  });

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="bg-green-600 p-3 rounded-lg">
            <ChevronRight size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Progress: {completedCount}/{totalCount} completed
            </span>
            <span className="text-sm font-bold text-green-600">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Steps List */}
      {sortedSteps.length > 0 ? (
        <div className="space-y-4">
          {sortedSteps.map((step, index) => (
            <StepItem
              key={step.id || index}
              step={step}
              index={index}
              onComplete={onStepComplete}
              language={language}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
          <p className="text-xl font-semibold text-gray-700">{t.noSteps}</p>
        </div>
      )}

      {/* All Complete State */}
      {completedCount === totalCount && totalCount > 0 && (
        <div className="mt-6 p-6 bg-green-100 rounded-xl border-2 border-green-300 text-center">
          <CheckCircle2 size={48} className="mx-auto text-green-600 mb-3" />
          <p className="text-xl font-bold text-green-800 mb-2">{t.allDone}</p>
          <p className="text-sm text-green-700">You've completed all recommended actions</p>
        </div>
      )}

      {/* Action Buttons */}
      {showActions && (
        <div className="mt-6 pt-6 border-t border-green-200 flex flex-wrap gap-3">
          <Button variant="primary" icon={ExternalLink}>
            {t.findLawyer}
          </Button>
          <Button variant="secondary" icon={Info}>
            {t.contactSupport}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default NextSteps;