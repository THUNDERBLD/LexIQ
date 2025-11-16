/**
 * useTextToSpeech Hook
 * Custom hook for text-to-speech functionality
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useLanguageStore } from '../store/languageStore';
import { useUIStore } from '../store/uiStore';

const useTextToSpeech = () => {
  const { language } = useLanguageStore();
  const { isAudioEnabled } = useUIStore();
  const [isSupported, setIsSupported] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const utteranceRef = useRef(null);

  /**
   * Check browser support for Speech Synthesis
   */
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      console.warn('Speech Synthesis API is not supported in this browser');
    }
  }, []);

  /**
   * Load available voices
   */
  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Auto-select voice for current language
      if (!selectedVoice && availableVoices.length > 0) {
        const voice = getVoiceForLanguage(language, availableVoices);
        setSelectedVoice(voice);
      }
    };

    loadVoices();

    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [isSupported, language, selectedVoice]);

  /**
   * Get appropriate voice for language
   * @param {string} lang - Language code
   * @param {array} voiceList - Available voices
   * @returns {object|null} Voice object
   */
  const getVoiceForLanguage = useCallback((lang, voiceList = voices) => {
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
      const voice = voiceList.find(v => v.lang.startsWith(prefLang));
      if (voice) return voice;
    }

    return voiceList[0] || null;
  }, [voices]);

  /**
   * Speak text
   * @param {string} text - Text to speak
   * @param {object} options - Speech options
   */
  const speak = useCallback((text, options = {}) => {
    if (!isSupported || !isAudioEnabled || !text) {
      return;
    }

    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Set voice
    const voice = selectedVoice || getVoiceForLanguage(language);
    if (voice) {
      utterance.voice = voice;
    }

    // Set speech parameters
    utterance.rate = options.rate || 0.9; // Slightly slower for clarity
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    // Event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
      if (options.onError) options.onError(event);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported, isAudioEnabled, language, selectedVoice, getVoiceForLanguage]);

  /**
   * Stop speaking
   */
  const stop = useCallback(() => {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    }
  }, []);

  /**
   * Pause speaking
   */
  const pause = useCallback(() => {
    if (window.speechSynthesis && window.speechSynthesis.speaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPaused]);

  /**
   * Resume speaking
   */
  const resume = useCallback(() => {
    if (window.speechSynthesis && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  /**
   * Toggle speak/stop
   * @param {string} text - Text to speak
   */
  const toggle = useCallback((text) => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  }, [isSpeaking, speak, stop]);

  /**
   * Get available voices for language
   * @param {string} lang - Language code
   * @returns {array} Available voices
   */
  const getVoicesForLanguage = useCallback((lang) => {
    return voices.filter(voice => voice.lang.startsWith(lang));
  }, [voices]);

  /**
   * Change voice
   * @param {object} voice - Voice object
   */
  const changeVoice = useCallback((voice) => {
    setSelectedVoice(voice);
  }, []);

  /**
   * Speak with queue (multiple texts)
   * @param {array} texts - Array of texts to speak
   */
  const speakQueue = useCallback((texts) => {
    if (!isSupported || !isAudioEnabled || texts.length === 0) {
      return;
    }

    const speakNext = (index) => {
      if (index >= texts.length) return;

      speak(texts[index], {
        onEnd: () => {
          setTimeout(() => speakNext(index + 1), 300);
        },
      });
    };

    speakNext(0);
  }, [isSupported, isAudioEnabled, speak]);

  /**
   * Speak text in chunks (for long text)
   * @param {string} text - Long text to speak
   * @param {number} chunkSize - Size of each chunk
   */
  const speakLongText = useCallback((text, chunkSize = 200) => {
    if (!text) return;

    // Split text into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    // Group sentences into chunks
    const chunks = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > chunkSize && currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += ' ' + sentence;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    speakQueue(chunks);
  }, [speakQueue]);

  /**
   * Get speech rate options
   * @returns {array} Rate options
   */
  const getRateOptions = useCallback(() => {
    return [
      { label: 'Very Slow', value: 0.5 },
      { label: 'Slow', value: 0.75 },
      { label: 'Normal', value: 1 },
      { label: 'Fast', value: 1.25 },
      { label: 'Very Fast', value: 1.5 },
    ];
  }, []);

  /**
   * Check if browser is speaking
   * @returns {boolean}
   */
  const isBrowserSpeaking = useCallback(() => {
    return window.speechSynthesis && window.speechSynthesis.speaking;
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    // State
    isSupported,
    isSpeaking,
    isPaused,
    voices,
    selectedVoice,
    isAudioEnabled,

    // Actions
    speak,
    stop,
    pause,
    resume,
    toggle,
    speakQueue,
    speakLongText,

    // Utilities
    getVoicesForLanguage,
    changeVoice,
    getVoiceForLanguage,
    getRateOptions,
    isBrowserSpeaking,
  };
};

export default useTextToSpeech;