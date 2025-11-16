import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Paperclip, Smile } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';

// Translation object
const INPUT_TRANSLATIONS = {
  en: {
    placeholder: 'Type your question here...',
    send: 'Send',
    recording: 'Recording...',
    stopRecording: 'Stop',
    attach: 'Attach file',
    emoji: 'Add emoji',
    maxLength: 'Maximum 500 characters',
  },
  hi: {
    placeholder: 'यहां अपना सवाल टाइप करें...',
    send: 'भेजें',
    recording: 'रिकॉर्डिंग...',
    stopRecording: 'रोकें',
    attach: 'फ़ाइल संलग्न करें',
    emoji: 'इमोजी जोड़ें',
    maxLength: 'अधिकतम 500 वर्ण',
  },
  mr: {
    placeholder: 'तुमचा प्रश्न येथे टाइप करा...',
    send: 'पाठवा',
    recording: 'रेकॉर्डिंग...',
    stopRecording: 'थांबवा',
    attach: 'फाइल जोडा',
    emoji: 'इमोजी जोडा',
    maxLength: 'कमाल 500 वर्ण',
  },
};

const ChatInput = ({ 
  onSend, 
  disabled = false,
  maxLength = 500,
  showVoice = true,
  showAttach = false 
}) => {
  const { language } = useLanguageStore();
  const t = INPUT_TRANSLATIONS[language] || INPUT_TRANSLATIONS.en;

  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks = [];
        mediaRecorder.addEventListener('dataavailable', (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          // Here you would typically send the audio to a speech-to-text API
          console.log('Audio recorded:', audioBlob);
          
          // For demo, just show a message
          setInput(prev => prev + '[Voice message recorded]');
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
        });

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Could not access microphone. Please check permissions.');
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  const handleAttach = () => {
    // Trigger file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,.pdf';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('File selected:', file);
        // Here you would typically handle file upload
        setInput(prev => prev + `[Attached: ${file.name}]`);
      }
    };
    fileInput.click();
  };

  const remainingChars = maxLength - input.length;
  const isOverLimit = remainingChars < 0;

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={`
        flex items-end gap-2 p-3 rounded-xl border-2 transition-all
        ${isFocused ? 'border-blue-500 shadow-md' : 'border-gray-300'}
        ${disabled ? 'bg-gray-100 opacity-60' : 'bg-white'}
      `}>
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isRecording ? t.recording : t.placeholder}
          disabled={disabled || isRecording}
          rows={1}
          maxLength={maxLength}
          className="flex-1 resize-none outline-none bg-transparent max-h-32 text-gray-800 placeholder-gray-400"
          style={{ minHeight: '24px' }}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Voice Input Button */}
          {showVoice && (
            <button
              type="button"
              onClick={toggleRecording}
              disabled={disabled}
              className={`p-2 rounded-lg transition-all ${
                isRecording
                  ? 'bg-red-100 text-red-600 animate-pulse'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
              }`}
              title={isRecording ? t.stopRecording : 'Voice input'}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          )}

          {/* Attach Button */}
          {showAttach && (
            <button
              type="button"
              onClick={handleAttach}
              disabled={disabled}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors"
              title={t.attach}
            >
              <Paperclip size={20} />
            </button>
          )}

          {/* Send Button */}
          <button
            type="submit"
            disabled={disabled || !input.trim() || isOverLimit || isRecording}
            className={`p-2 rounded-lg transition-all ${
              input.trim() && !isOverLimit && !isRecording && !disabled
                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            title={t.send}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Character Counter */}
      {input.length > 0 && (
        <div className={`text-xs mt-1 text-right ${
          isOverLimit ? 'text-red-600 font-semibold' : 'text-gray-500'
        }`}>
          {remainingChars} / {maxLength}
        </div>
      )}

      {/* Recording Indicator */}
      {isRecording && (
        <div className="absolute -top-12 left-0 right-0 bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
            <span className="font-semibold">{t.recording}</span>
          </div>
          <button
            onClick={toggleRecording}
            className="text-sm font-semibold hover:underline"
          >
            {t.stopRecording}
          </button>
        </div>
      )}
    </form>
  );
};

export default ChatInput;