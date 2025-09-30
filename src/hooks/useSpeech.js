import { useState, useEffect, useCallback } from 'react';

export const useSpeech = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      // Load voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Try to select a child-friendly voice (higher pitch, female voice)
        const childFriendlyVoice = availableVoices.find(voice => 
          voice.name.includes('female') || 
          voice.name.includes('Female') ||
          voice.name.includes('woman') ||
          voice.name.includes('Girl')
        ) || availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];
        
        setSelectedVoice(childFriendlyVoice);
      };

      loadVoices();
      
      // Voices might load asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const speak = useCallback((text, options = {}) => {
    if (!isSupported || !text) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure utterance for child-friendly speech
    utterance.rate = options.rate || 0.8; // Slightly slower for children
    utterance.pitch = options.pitch || 1.2; // Higher pitch for friendliness
    utterance.volume = options.volume || 1;
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    // Speak the text
    window.speechSynthesis.speak(utterance);
  }, [isSupported, selectedVoice]);

  const pause = useCallback(() => {
    if (isSupported && isSpeaking) {
      window.speechSynthesis.pause();
    }
  }, [isSupported, isSpeaking]);

  const resume = useCallback(() => {
    if (isSupported && isPaused) {
      window.speechSynthesis.resume();
    }
  }, [isSupported, isPaused]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, [isSupported]);

  const toggle = useCallback(() => {
    if (isSpeaking && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    }
  }, [isSpeaking, isPaused, pause, resume]);

  return {
    isSupported,
    isSpeaking,
    isPaused,
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    pause,
    resume,
    stop,
    toggle
  };
};

export default useSpeech;