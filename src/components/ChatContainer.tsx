import React, { useState, useEffect, useRef } from 'react';
import { Message, Attachment } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { generateMockResponse } from '../data/mockData';
import { motion } from 'framer-motion';
import { Bot, ArrowDown } from 'lucide-react';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Sou o AgroTalk, seu assistente virtual para análise de dados agrícolas e financeiros. Como posso ajudar você hoje?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
      
      setShowScrollButton(isScrolledUp);
    };
    
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (content: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const response = generateMockResponse(content);
      
      const attachments: Attachment[] = response.attachments.map((att: any, index: number) => {
        if (att.type === 'chart') {
          return {
            id: `${Date.now()}-${index}`,
            type: 'chart',
            title: att.title,
            data: {
              type: att.chartType || 'bar',
              labels: att.data.labels,
              datasets: att.data.datasets,
            },
          };
        } else if (att.type === 'table') {
          return {
            id: `${Date.now()}-${index}`,
            type: 'table',
            title: att.title,
            data: att.data,
          };
        }
        return {
          id: `${Date.now()}-${index}`,
          type: att.type,
          data: att.data,
          title: att.title,
        };
      });
      
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.text,
        sender: 'ai',
        timestamp: new Date(),
        attachments,
      };
      
      setMessages((prev) => [...prev, newAiMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-neutral-50"
      >
        <div className="container-custom max-w-4xl">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex items-center space-x-2 text-neutral-500 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                <Bot size={16} />
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {showScrollButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToBottom}
          className="absolute bottom-20 right-4 md:right-8 bg-primary-600 text-white p-2 rounded-full shadow-md hover:bg-primary-700 transition-colors"
        >
          <ArrowDown size={20} />
        </motion.button>
      )}
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;