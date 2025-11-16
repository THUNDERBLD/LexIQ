import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import { useUIStore } from '../../store/uiStore';

const AudioPlayer = ({ 
  text, 
  autoPlay = false,
  showButton = true,
  onStart,
  onEnd,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const { language } = useLanguageStore();
  const { isAudioEnabled } = useUIStore();

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      console.warn('Speech Synthesis API is not supported in this browser');
    }
  }, []);

  useEffect(() => {
    if (autoPlay && text && isAudioEnabled && isSupported) {
      speak();
    }
    // Cleanup: stop speech when component unmounts
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, autoPlay]);

  const getVoiceForLanguage = (lang) => {
    const voices = window.speechSynthesis.getVoices();
    
    const languageMap = {
      hi: ['hi-IN', 'hi'],
      mr: ['mr-IN', 'mr'],
      gu: ['gu-IN', 'gu'],
      ta: ['ta-IN', 'ta'],
      te: ['te-IN', 'te'],
      kn: ['kn-IN', 'kn'],
      bn: ['bn-IN', 'bn'],
      en: ['en-IN', 'en-US', 'en-GB', 'en'],
    };

    const preferredLangs = languageMap[lang] || ['en'];
    
    for (const prefLang of preferredLangs) {
      const voice = voices.find(v => v.lang.startsWith(prefLang));
      if (voice) return voice;
    }
    
    return voices[0]; // Fallback to first available voice
  };

  const speak = () => {
    if (!isSupported || !isAudioEnabled || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice based on selected language
    const voice = getVoiceForLanguage(language);
    if (voice) {
      utterance.voice = voice;
    }
    
    // Configure speech parameters
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      onStart && onStart();
    };

    utterance.onend = () => {
      setIsPlaying(false);
      onEnd && onEnd();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const toggleSpeech = () => {
    if (isPlaying) {
      stop();
    } else {
      speak();
    }
  };

  if (!isAudioEnabled || !isSupported || !showButton) {
    return null;
  }

  return (
    <button
      onClick={toggleSpeech}
      disabled={!text}
      className={`
        p-2 rounded-full transition-all duration-200
        ${isPlaying 
          ? 'bg-blue-100 text-blue-600 animate-pulse' 
          : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
        }
        ${!text ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
        ${className}
      `}
      aria-label={isPlaying ? 'Stop reading' : 'Read aloud'}
      title={isPlaying ? 'Stop reading' : 'Read aloud'}
    >
      {isPlaying ? <Pause size={20} /> : <Volume2 size={20} />}
    </button>
  );
};

// Global audio control toggle
export const AudioToggle = () => {
  const { isAudioEnabled, toggleAudio } = useUIStore();

  return (
    <button
      onClick={toggleAudio}
      className={`
        p-2 button-spacing rounded-full transition-all
        ${isAudioEnabled 
          ? 'bg-blue-100 text-blue-600' 
          : 'bg-gray-100 text-gray-400'
        }
        hover:scale-110
      `}
      aria-label={isAudioEnabled ? 'Disable audio' : 'Enable audio'}
      title={isAudioEnabled ? 'Disable audio' : 'Enable audio'}
    >
      {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
};

export default AudioPlayer;