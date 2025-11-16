import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minimize2, Maximize2, Trash2 } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Card from '../common/Card';
import Button from '../common/Button';

// Translation object
const CHAT_TRANSLATIONS = {
  en: {
    title: 'Ask Questions',
    subtitle: 'Get answers about your document',
    placeholder: 'Type your question here...',
    clearChat: 'Clear Chat',
    minimize: 'Minimize',
    maximize: 'Maximize',
    close: 'Close',
    welcomeMessage: 'Hello! I can help you understand your document better. What would you like to know?',
    exampleQuestions: 'Example questions:',
    examples: [
      'What does this document mean?',
      'What should I do next?',
      'Are there any important deadlines?',
      'Do I need a lawyer for this?',
    ],
    clearConfirm: 'Are you sure you want to clear the chat history?',
    typing: 'AI is typing...',
  },
  hi: {
    title: 'सवाल पूछें',
    subtitle: 'अपने दस्तावेज़ के बारे में जवाब पाएं',
    placeholder: 'यहां अपना सवाल टाइप करें...',
    clearChat: 'चैट साफ़ करें',
    minimize: 'छोटा करें',
    maximize: 'बड़ा करें',
    close: 'बंद करें',
    welcomeMessage: 'नमस्ते! मैं आपको आपके दस्तावेज़ को बेहतर तरीके से समझने में मदद कर सकता हूं। आप क्या जानना चाहेंगे?',
    exampleQuestions: 'उदाहरण प्रश्न:',
    examples: [
      'इस दस्तावेज़ का क्या मतलब है?',
      'मुझे आगे क्या करना चाहिए?',
      'क्या कोई महत्वपूर्ण समय सीमा है?',
      'क्या मुझे इसके लिए वकील की ज़रूरत है?',
    ],
    clearConfirm: 'क्या आप वाकई चैट इतिहास साफ़ करना चाहते हैं?',
    typing: 'AI टाइप कर रहा है...',
  },
  mr: {
    title: 'प्रश्न विचारा',
    subtitle: 'तुमच्या दस्तऐवजाबद्दल उत्तरे मिळवा',
    placeholder: 'तुमचा प्रश्न येथे टाइप करा...',
    clearChat: 'चॅट साफ करा',
    minimize: 'लहान करा',
    maximize: 'मोठे करा',
    close: 'बंद करा',
    welcomeMessage: 'नमस्कार! मी तुम्हाला तुमचा दस्तऐवज चांगल्या प्रकारे समजून घेण्यास मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?',
    exampleQuestions: 'उदाहरण प्रश्न:',
    examples: [
      'या दस्तऐवजाचा अर्थ काय आहे?',
      'मला पुढे काय करावे?',
      'काही महत्त्वाच्या मुदती आहेत का?',
      'यासाठी मला वकिलाची गरज आहे का?',
    ],
    clearConfirm: 'तुम्हाला खात्री आहे की तुम्ही चॅट इतिहास साफ करू इच्छिता?',
    typing: 'AI टाइप करत आहे...',
  },
};

const ChatInterface = ({ 
  document,
  initialMessages = [],
  onSendMessage,
  compact = false,
  floating = false 
}) => {
  const { language } = useLanguageStore();
  const t = CHAT_TRANSLATIONS[language] || CHAT_TRANSLATIONS.en;

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: t.welcomeMessage,
      timestamp: new Date().toISOString(),
    },
    ...initialMessages,
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Call parent handler if provided
      if (onSendMessage) {
        const response = await onSendMessage(content);
        
        // Add assistant response
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: response,
          timestamp: new Date().toISOString(),
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Mock response for demo
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        const mockResponse = {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'This is a demo response. In production, this would be an AI-generated answer based on your document and question.',
          timestamp: new Date().toISOString(),
        };
        
        setMessages((prev) => [...prev, mockResponse]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
        isError: true,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleExampleClick = (example) => {
    handleSendMessage(example);
  };

  const handleClearChat = () => {
    if (window.confirm(t.clearConfirm)) {
      setMessages([
        {
          id: 1,
          role: 'assistant',
          content: t.welcomeMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  if (floating) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${isMinimized ? 'w-auto' : 'w-96'} max-w-[calc(100vw-2rem)]`}>
        <Card className="shadow-2xl border-2 border-blue-500">
          {/* Floating Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-xl">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span className="font-bold">{t.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-blue-500 rounded transition-colors"
                title={isMinimized ? t.maximize : t.minimize}
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
            </div>
          </div>

          {/* Floating Content */}
          {!isMinimized && (
            <>
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span>{t.typing}</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 border-t">
                <ChatInput onSend={handleSendMessage} disabled={isTyping} />
              </div>
            </>
          )}
        </Card>
      </div>
    );
  }

  return (
    <Card className={`${compact ? '' : 'max-w-4xl mx-auto'} bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-3 rounded-lg">
            <MessageCircle size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={handleClearChat}
          icon={Trash2}
          className="text-sm"
        >
          {t.clearChat}
        </Button>
      </div>

      {/* Example Questions */}
      {messages.length === 1 && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <p className="font-semibold text-gray-700 mb-3">{t.exampleQuestions}</p>
          <div className="space-y-2">
            {t.examples.map((example, idx) => (
              <button
                key={idx}
                onClick={() => handleExampleClick(example)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg text-sm text-gray-700 hover:text-blue-700 transition-colors border border-gray-200 hover:border-blue-300"
              >
                💬 {example}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
              <span>{t.typing}</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </Card>
  );
};

export default ChatInterface;