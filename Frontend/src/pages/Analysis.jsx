import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { useDocumentStore } from '../store/documentStore';
import LegalSummary from '../components/legal/LegalSummary';
import KeyPoints from '../components/legal/KeyPoints';
import SimpleExplanation from '../components/legal/SimpleExplanation';
import NextSteps from '../components/legal/NextSteps';
import ChatInterface from '../components/chat/ChatInterface';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

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
  },
};

// Mock analysis data generator
const generateMockAnalysis = (documentType) => {
  return {
    summary: `This document is a ${documentType.name} that has been reviewed by our AI system. The document appears to be valid and contains important legal information that you should be aware of. Based on our analysis, this document requires your attention and may need action within a specific timeframe.`,
    
    keyPoints: [
      {
        id: 1,
        type: 'important',
        text: 'Document is legally valid and properly formatted',
        details: 'All required sections are present and the document follows proper legal format',
        tags: ['validity', 'format'],
      },
      {
        id: 2,
        type: 'positive',
        text: 'No immediate legal concerns identified',
        details: 'Our analysis did not find any urgent legal issues that require immediate attention',
      },
      {
        id: 3,
        type: 'neutral',
        text: 'Document registration date is within normal timeframe',
      },
      {
        id: 4,
        type: 'important',
        text: 'Multiple parties are mentioned in this document',
        details: 'Make sure to verify all parties mentioned and their roles',
        tags: ['parties', 'verification'],
      },
      {
        id: 5,
        type: 'negative',
        text: 'Action may be required within 30 days',
        details: 'Please consult with a legal professional about the specific deadlines',
        tags: ['deadline', 'urgent'],
      },
    ],
    
    simpleExplanation: `In simple words, this ${documentType.name} is a legal paper that shows important information. Think of it like a certificate that proves something about you or your property.\n\nThe document has been checked and looks correct. However, you may need to do something about it soon. It's a good idea to keep this document safe and show it to a lawyer if you have any questions.`,
    
    nextSteps: [
      {
        id: 1,
        priority: 'high',
        timeline: 'immediate',
        action: 'Keep this document in a safe place',
        details: 'Store the original document securely. Make copies and keep them separately.',
        completed: false,
      },
      {
        id: 2,
        priority: 'high',
        timeline: 'week',
        action: 'Consult with a legal professional',
        details: 'Visit a lawyer to understand all implications and required actions.',
        completed: false,
        link: '#find-lawyer',
      },
      {
        id: 3,
        priority: 'medium',
        timeline: 'week',
        action: 'Verify all information in the document',
        details: 'Check that all names, dates, and details are correct.',
        completed: false,
      },
      {
        id: 4,
        priority: 'medium',
        timeline: 'month',
        action: 'Gather supporting documents',
        details: 'Collect any related documents that may be needed.',
        completed: false,
      },
      {
        id: 5,
        priority: 'low',
        timeline: 'flexible',
        action: 'Inform relevant family members',
        details: 'Share this information with family members who may be affected.',
        completed: false,
      },
    ],
    
    confidence: 92,
    analyzedDate: new Date().toISOString(),
  };
};

const Analysis = ({ document, onNavigate }) => {
  const { language } = useLanguageStore();
  const { updateDocument } = useDocumentStore();
  const t = ANALYSIS_TRANSLATIONS[language] || ANALYSIS_TRANSLATIONS.en;

  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [readingLevel, setReadingLevel] = useState('simple');

  useEffect(() => {
    // Simulate API call to analyze document
    const analyzeDocument = async () => {
      setIsLoading(true);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock analysis
      const mockAnalysis = generateMockAnalysis(document.documentType);
      setAnalysis(mockAnalysis);
      
      // Update document in store
      updateDocument(document.id, {
        status: 'completed',
        analysis: mockAnalysis,
      });
      
      setIsLoading(false);
    };

    if (document && !document.analysis) {
      analyzeDocument();
    } else if (document?.analysis) {
      setAnalysis(document.analysis);
      setIsLoading(false);
    }
  }, [document]);

  const handleDownload = () => {
    // Generate and download report
    console.log('Downloading report...');
    alert('Report download feature coming soon!');
  };

  const handleShare = () => {
    // Share analysis
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
    // Update step completion status
    setAnalysis(prev => ({
      ...prev,
      nextSteps: prev.nextSteps.map(step =>
        step.id === stepId ? { ...step, completed } : step
      ),
    }));
  };

  const handleChatMessage = async (message) => {
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Based on your ${document.documentType.name}, here's what I can tell you: This is a demo response to your question "${message}". In production, this would use AI to provide specific answers about your document.`;
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <LoadingSpinner
          size="large"
          text={t.analyzing}
          fullScreen={false}
        />
        <div className="text-center mt-6">
          <p className="text-gray-600">{t.analyzingDesc}</p>
          <div className="mt-8 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">No analysis available</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => onNavigate('history')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {t.analysis}
        </h1>
        <p className="text-gray-600">{document.name}</p>
      </div>

      {/* Analysis Sections */}
      <div className="space-y-8">
        {/* Legal Summary */}
        <LegalSummary
          summary={analysis.summary}
          documentType={document.documentType}
          confidence={analysis.confidence}
          analyzedDate={analysis.analyzedDate}
          showMetadata={true}
          collapsible={true}
        />

        {/* Simple Explanation */}
        <SimpleExplanation
          explanation={analysis.simpleExplanation}
          level={readingLevel}
          onLevelChange={() => {
            const levels = ['elementary', 'simple', 'standard', 'technical'];
            const currentIndex = levels.indexOf(readingLevel);
            const nextIndex = (currentIndex + 1) % levels.length;
            setReadingLevel(levels[nextIndex]);
          }}
          showFeedback={true}
          showActions={true}
        />

        {/* Key Points */}
        <KeyPoints
          points={analysis.keyPoints}
          collapsible={true}
          initialShowCount={5}
        />

        {/* Next Steps */}
        <NextSteps
          steps={analysis.nextSteps}
          onStepComplete={handleStepComplete}
          showActions={true}
        />

        {/* Chat Interface */}
        <ChatInterface
          document={document}
          onSendMessage={handleChatMessage}
          compact={false}
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
  );
};

export default Analysis;