import React, { useState } from 'react';
import { Bot, User, Copy, Check, ThumbsUp, ThumbsDown, Volume2 } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import AudioPlayer from '../common/AudioPlayer';

// Translation object
const MESSAGE_TRANSLATIONS = {
  en: {
    copy: 'Copy',
    copied: 'Copied!',
    helpful: 'Helpful',
    notHelpful: 'Not helpful',
    you: 'You',
    assistant: 'Legal Assistant',
  },
  hi: {
    copy: 'कॉपी करें',
    copied: 'कॉपी किया गया!',
    helpful: 'उपयोगी',
    notHelpful: 'उपयोगी नहीं',
    you: 'आप',
    assistant: 'कानूनी सहायक',
  },
  mr: {
    copy: 'कॉपी करा',
    copied: 'कॉपी केले!',
    helpful: 'उपयुक्त',
    notHelpful: 'उपयुक्त नाही',
    you: 'तुम्ही',
    assistant: 'कायदेशीर सहाय्यक',
  },
};

const ChatMessage = ({ message }) => {
  const { language } = useLanguageStore();
  const t = MESSAGE_TRANSLATIONS[language] || MESSAGE_TRANSLATIONS.en;

  const [isCopied, setIsCopied] = useState(false);
  const [feedback, setFeedback] = useState(message.feedback || null);

  const isUser = message.role === 'user';
  const isError = message.isError;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleFeedback = (type) => {
    setFeedback(type);
    // Here you would typically send feedback to your backend
    console.log('Feedback:', type, 'for message:', message.id);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : isError
          ? 'bg-red-600 text-white'
          : 'bg-gradient-to-br from-purple-600 to-blue-600 text-white'
      }`}>
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Sender Name & Time */}
        <div className={`flex items-center gap-2 mb-1 text-xs text-gray-500 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="font-semibold">
            {isUser ? t.you : t.assistant}
          </span>
          <span>•</span>
          <span>{formatTimestamp(message.timestamp)}</span>
        </div>

        {/* Message Bubble */}
        <div className={`
          rounded-2xl px-4 py-3 shadow-sm
          ${isUser 
            ? 'bg-blue-600 text-white rounded-tr-none' 
            : isError
            ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-none'
            : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
          }
        `}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        {/* Actions (only for assistant messages) */}
        {!isUser && !isError && (
          <div className="flex items-center gap-2 mt-2">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-800"
              title={isCopied ? t.copied : t.copy}
            >
              {isCopied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            </button>

            {/* Audio Button */}
            <AudioPlayer text={message.content} showButton={true} className="!p-1.5" />

            {/* Feedback Buttons */}
            <div className="flex items-center gap-1 ml-2 border-l pl-2">
              <button
                onClick={() => handleFeedback('positive')}
                className={`p-1.5 rounded-lg transition-colors ${
                  feedback === 'positive'
                    ? 'bg-green-100 text-green-600'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-green-600'
                }`}
                title={t.helpful}
              >
                <ThumbsUp size={16} />
              </button>
              <button
                onClick={() => handleFeedback('negative')}
                className={`p-1.5 rounded-lg transition-colors ${
                  feedback === 'negative'
                    ? 'bg-red-100 text-red-600'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-red-600'
                }`}
                title={t.notHelpful}
              >
                <ThumbsDown size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;