import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isListening, setIsListening] = useState(false);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);
  
  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      resetTranscript();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
    }
  };

  const clearInput = () => {
    setMessage('');
    resetTranscript();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-t border-neutral-200 py-3 px-4">
      <div className="container-custom">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem ou faça uma pergunta..."
            className="w-full rounded-lg border border-neutral-300 bg-white pl-3 pr-24 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[52px] max-h-32"
            rows={1}
            disabled={isLoading}
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <AnimatePresence>
              {message && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={clearInput}
                  className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
                >
                  <X size={16} />
                </motion.button>
              )}
            </AnimatePresence>
            
            {browserSupportsSpeechRecognition && (
              <button
                type="button"
                onClick={toggleListening}
                className={`p-1.5 rounded-full ${
                  isListening
                    ? 'text-red-500 hover:text-red-600 hover:bg-red-50'
                    : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            )}
            
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className={`p-1.5 rounded-full ${
                !message.trim() || isLoading
                  ? 'text-neutral-400 cursor-not-allowed'
                  : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-2 flex items-center text-xs text-red-500"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Ouvindo... Fale sua mensagem
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default ChatInput;