import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Share2, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';


// Translation object
const ANALYSIS_TRANSLATIONS = {
  en: {
    analyzing: 'Analyzing Your Document',
    analyzingDesc: 'Our AI is reading and understanding your document...',
    analysis: 'Document Analysis',
    back: 'Back to Documents',
    download: 'Download Report',
    share: 'Share Analysis',
    askQuestions: 'Have Questions?',
    chatPrompt: 'Ask me anything about your document',
    summary: 'Legal Summary',
    keyPoints: 'Key Points',
    explanation: 'Simple Explanation',
    nextSteps: 'Next Steps',
    confidence: 'Confidence Score',
    analyzed: 'Analyzed on',
    sendMessage: 'Send Message',
    typeMessage: 'Type your message...',
  },
  hi: {
    analyzing: 'आपके दस्तावेज़ का विश्लेषण',
    analyzingDesc: 'हमारा AI आपके दस्तावेज़ को पढ़ रहा और समझ रहा है...',
    analysis: 'दस्तावेज़ विश्लेषण',
    back: 'दस्तावेज़ों पर वापस जाएं',
    download: 'रिपोर्ट डाउनलोड करें',
    share: 'विश्लेषण साझा करें',
    askQuestions: 'सवाल हैं?',
    chatPrompt: 'अपने दस्तावेज़ के बारे में मुझसे कुछ भी पूछें',
    summary: 'कानूनी सारांश',
    keyPoints: 'मुख्य बिंदु',
    explanation: 'सरल व्याख्या',
    nextSteps: 'अगले कदम',
    confidence: 'विश्वास स्कोर',
    analyzed: 'विश्लेषण की तारीख',
    sendMessage: 'संदेश भेजें',
    typeMessage: 'अपना संदेश टाइप करें...',
  },
  mr: {
    analyzing: 'तुमच्या दस्तऐवजाचे विश्लेषण',
    analyzingDesc: 'आमचा AI तुमचा दस्तऐवज वाचत आणि समजत आहे...',
    analysis: 'दस्तऐवज विश्लेषण',
    back: 'दस्तऐवजांकडे परत जा',
    download: 'अहवाल डाउनलोड करा',
    share: 'विश्लेषण सामायिक करा',
    askQuestions: 'प्रश्न आहेत?',
    chatPrompt: 'तुमच्या दस्तऐवजाबद्दल मला काहीही विचारा',
    summary: 'कायदेशीर सारांश',
    keyPoints: 'मुख्य मुद्दे',
    explanation: 'सोपे स्पष्टीकरण',
    nextSteps: 'पुढील पायऱ्या',
    confidence: 'विश्वास गुण',
    analyzed: 'विश्लेषण केले',
    sendMessage: 'संदेश पाठवा',
    typeMessage: 'तुमचा संदेश टाइप करा...',
  },
};

// Mock analysis data generator
const generateMockAnalysis = (documentType) => {
  const typeName = documentType?.name || 'Legal Document';
  
  return {
    summary: `This document is a ${typeName} that has been reviewed by our AI system. The document appears to be valid and contains important legal information that you should be aware of. Based on our analysis, this document requires your attention and may need action within a specific timeframe. The document structure follows standard legal formatting and includes all necessary sections for a valid ${typeName}.`,
    
    keyPoints: [
      {
        id: 1,
        type: 'important',
        text: 'Document is legally valid and properly formatted',
        details: 'All required sections are present and the document follows proper legal format as per Indian legal standards',
        tags: ['validity', 'format'],
      },
      {
        id: 2,
        type: 'positive',
        text: 'No immediate legal concerns identified',
        details: 'Our analysis did not find any urgent legal issues that require immediate attention. The document appears to be in good standing.',
      },
      {
        id: 3,
        type: 'neutral',
        text: 'Document registration date is within normal timeframe',
        details: 'The dates mentioned in the document are consistent and fall within acceptable legal timeframes.',
      },
      {
        id: 4,
        type: 'important',
        text: 'Multiple parties are mentioned in this document',
        details: 'Make sure to verify all parties mentioned and their roles. Cross-check signatures and identification details.',
        tags: ['parties', 'verification'],
      },
      {
        id: 5,
        type: 'negative',
        text: 'Action may be required within 30 days',
        details: 'Please consult with a legal professional about the specific deadlines. Missing deadlines could have legal implications.',
        tags: ['deadline', 'urgent'],
      },
    ],
    
    simpleExplanation: `In simple words, this ${typeName} is a legal paper that shows important information. Think of it like a certificate that proves something about you or your property.\n\nThe document has been checked and looks correct. However, you may need to do something about it soon. It's a good idea to keep this document safe and show it to a lawyer if you have any questions.\n\nThis document is important because it can affect your legal rights. Make sure all the information in it is correct, and keep it in a safe place where you can find it when you need it.`,
    
    nextSteps: [
      {
        id: 1,
        priority: 'high',
        timeline: 'immediate',
        action: 'Keep this document in a safe place',
        details: 'Store the original document securely. Make copies and keep them separately. Consider keeping a digital copy as well.',
        completed: false,
      },
      {
        id: 2,
        priority: 'high',
        timeline: 'week',
        action: 'Consult with a legal professional',
        details: 'Visit a lawyer to understand all implications and required actions. They can explain your rights and responsibilities.',
        completed: false,
        link: '#find-lawyer',
      },
      {
        id: 3,
        priority: 'medium',
        timeline: 'week',
        action: 'Verify all information in the document',
        details: 'Check that all names, dates, and details are correct. Look for any spelling mistakes or incorrect information.',
        completed: false,
      },
      {
        id: 4,
        priority: 'medium',
        timeline: 'month',
        action: 'Gather supporting documents',
        details: 'Collect any related documents that may be needed, such as ID proofs, previous agreements, or certificates.',
        completed: false,
      },
      {
        id: 5,
        priority: 'low',
        timeline: 'flexible',
        action: 'Inform relevant family members',
        details: 'Share this information with family members who may be affected. Keep them updated on any actions you take.',
        completed: false,
      },
    ],
    
    confidence: 92,
    analyzedDate: new Date().toISOString(),
  };
};

// Button Component
const Button = ({ children, variant = 'primary', icon: Icon, onClick, fullWidth, className = '' }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 justify-center';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-700/50 text-white hover:bg-slate-600/50 backdrop-blur-sm border border-slate-600',
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

// Loading Spinner Component
const LoadingSpinner = ({ text, fullScreen }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-12'}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      {text && <p className="mt-4 text-lg text-gray-300">{text}</p>}
    </div>
  );
};

// Card Component
const Card = ({ children, title, collapsible, className = '' }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className={`bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl overflow-hidden ${className}`}>
      {title && (
        <div 
          className={`px-6 py-4 border-b border-slate-700/50 bg-slate-800/60 ${collapsible ? 'cursor-pointer' : ''}`}
          onClick={() => collapsible && setIsOpen(!isOpen)}
        >
          <h2 className="text-xl font-bold text-white flex items-center justify-between">
            {title}
            {collapsible && (
              <span className="text-2xl text-gray-400">{isOpen ? '−' : '+'}</span>
            )}
          </h2>
        </div>
      )}
      {isOpen && <div className="p-6">{children}</div>}
    </div>
  );
};

// Legal Summary Component
const LegalSummary = ({ summary, documentType, confidence, analyzedDate, language = 'en' }) => {
  const t = ANALYSIS_TRANSLATIONS[language];

  
  return (
    <Card title={t.summary} collapsible>
      <p className="text-gray-300 leading-relaxed mb-4">{summary}</p>
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-700/50">
        <div className="flex items-center gap-2">
          <CheckCircle size={20} className="text-green-400" />
          <span className="text-sm text-gray-300">
            <span className="font-semibold">{t.confidence}:</span> {confidence}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-blue-400" />
          <span className="text-sm text-gray-300">
            <span className="font-semibold">{t.analyzed}:</span>{' '}
            {new Date(analyzedDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Card>
  );
};

// Key Points Component
const KeyPoints = ({ points, language = 'en' }) => {
  const t = ANALYSIS_TRANSLATIONS[language];

  const [showAll, setShowAll] = useState(false);
  const displayPoints = showAll ? points : points.slice(0, 3);
  
  const getIcon = (type) => {
    switch (type) {
      case 'positive':
        return <CheckCircle size={20} className="text-green-400 flex-shrink-0" />;
      case 'negative':
        return <AlertCircle size={20} className="text-red-400 flex-shrink-0" />;
      case 'important':
        return <AlertCircle size={20} className="text-orange-400 flex-shrink-0" />;
      default:
        return <Info size={20} className="text-blue-400 flex-shrink-0" />;
    }
  };
  
  return (
    <Card title={t.keyPoints} collapsible>
      <div className="space-y-4">
        {displayPoints.map((point) => (
          <div key={point.id} className="flex gap-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
            {getIcon(point.type)}
            <div className="flex-1">
              <p className="font-semibold text-white mb-1">{point.text}</p>
              {point.details && (
                <p className="text-sm text-gray-400">{point.details}</p>
              )}
              {point.tags && (
                <div className="flex gap-2 mt-2">
                  {point.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {points.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
        >
          {showAll ? 'Show Less' : `Show All (${points.length})`}
        </button>
      )}
    </Card>
  );
};

// Simple Explanation Component
const SimpleExplanation = ({ explanation, language = 'en' }) => {
  const t = ANALYSIS_TRANSLATIONS[language];

  
  return (
    <Card title={t.explanation} collapsible>
      <div className="prose prose-lg max-w-none">
        {explanation.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-gray-300 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </Card>
  );
};

// Next Steps Component
const NextSteps = ({ steps, onStepComplete, language = 'en' }) => {
  const t = ANALYSIS_TRANSLATIONS[language];

  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      default:
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
    }
  };
  
  return (
    <Card title={t.nextSteps} collapsible>
      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-4 border-2 rounded-lg transition-all ${
              step.completed ? 'border-green-500/50 bg-green-500/10' : 'border-slate-600/50 bg-slate-700/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={step.completed}
                onChange={(e) => onStepComplete(step.id, e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 cursor-pointer rounded"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded font-semibold ${getPriorityColor(
                      step.priority
                    )}`}
                  >
                    {step.priority.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">
                    {step.timeline}
                  </span>
                </div>
                <p className={`font-semibold mb-1 ${step.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                  {step.action}
                </p>
                <p className="text-sm text-gray-400">{step.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Chat Interface Component
const ChatInterface = ({ document, onSendMessage, language = 'en' }) => {
  const t = ANALYSIS_TRANSLATIONS[language];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    const response = await onSendMessage(input);
    setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };
  
  return (
    <Card title={t.askQuestions}>
      <div className="space-y-4">
        <div className="h-64 overflow-y-auto space-y-3 p-4 bg-slate-900/40 rounded-lg border border-slate-700/50">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">{t.chatPrompt}</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white ml-auto max-w-[80%]'
                    : 'bg-slate-700/50 text-gray-200 mr-auto max-w-[80%]'
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-400">
              <div className="animate-bounce">●</div>
              <div className="animate-bounce delay-100">●</div>
              <div className="animate-bounce delay-200">●</div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.typeMessage}
            className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleSend} disabled={!input.trim() || isLoading}>
            {t.sendMessage}
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Main Analysis Component
const Analysis = () => {
  const { language } = useLanguageStore();
  const t = ANALYSIS_TRANSLATIONS[language];


  const document = {
    id: '123',
    name: 'Sample Legal Document.pdf',
    documentType: { name: 'Property Deed' },
  };

  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const analyzeDocument = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const docType = document?.documentType || { name: 'Legal Document' };
        const mockAnalysis = generateMockAnalysis(docType);
        setAnalysis(mockAnalysis);
        setIsLoading(false);
      } catch (error) {
        console.error('Analysis error:', error);
        setIsLoading(false);
      }
    };

    if (!document) {
      setIsLoading(false);
      return;
    }

    if (document.analysis) {
      setAnalysis(document.analysis);
      setIsLoading(false);
    } else {
      analyzeDocument();
    }
  }, []);

  const handleDownload = () => {
    alert('Report download feature coming soon!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Document Analysis',
        text: analysis.summary,
      }).catch(err => console.log('Share cancelled'));
    } else {
      alert('Share feature not available on this device');
    }
  };

  const handleStepComplete = (stepId, completed) => {
    setAnalysis(prev => ({
      ...prev,
      nextSteps: prev.nextSteps.map(step =>
        step.id === stepId ? { ...step, completed } : step
      ),
    }));
  };

  const handleChatMessage = async (message) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Based on your ${document.documentType.name}, here's what I can tell you: This is a demo response to your question "${message}". In production, this would use AI to provide specific answers about your document.`;
  };

  const handleBack = () => {
    console.log('Navigate back to documents');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto p-6">
          <LoadingSpinner text={t.analyzing} fullScreen={false} />
          <div className="text-center mt-6">
            <p className="text-gray-300">{t.analyzingDesc}</p>
            <div className="mt-8 space-y-3">
              <div className="h-4 bg-slate-700/50 rounded w-3/4 mx-auto animate-pulse" />
              <div className="h-4 bg-slate-700/50 rounded w-1/2 mx-auto animate-pulse" />
              <div className="h-4 bg-slate-700/50 rounded w-5/6 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center py-16">
          <p className="text-xl text-gray-300">No analysis available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            {t.back}
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              icon={Download}
              onClick={handleDownload}
              className="hidden sm:flex"
            >
              {t.download}
            </Button>
            <Button
              variant="secondary"
              icon={Share2}
              onClick={handleShare}
              className="hidden sm:flex"
            >
              {t.share}
            </Button>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {t.analysis}
          </h1>
          <p className="text-gray-400">{document.name}</p>
        </div>

        {/* Analysis Sections */}
        <div className="space-y-8">
          <LegalSummary
            summary={analysis.summary}
            documentType={document.documentType}
            confidence={analysis.confidence}
            analyzedDate={analysis.analyzedDate}
            language={language}
          />

          <SimpleExplanation 
            explanation={analysis.simpleExplanation} 
            language={language}
          />

          <KeyPoints 
            points={analysis.keyPoints} 
            language={language}
          />

          <NextSteps
            steps={analysis.nextSteps}
            onStepComplete={handleStepComplete}
            language={language}
          />

          <ChatInterface
            document={document}
            onSendMessage={handleChatMessage}
            language={language}
          />
        </div>

        {/* Mobile Action Buttons */}
        <div className="sm:hidden fixed bottom-4 left-4 right-4 flex gap-2 z-40">
          <Button
            variant="secondary"
            icon={Download}
            onClick={handleDownload}
            fullWidth
          >
            {t.download}
          </Button>
          <Button
            variant="secondary"
            icon={Share2}
            onClick={handleShare}
            fullWidth
          >
            {t.share}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Analysis;