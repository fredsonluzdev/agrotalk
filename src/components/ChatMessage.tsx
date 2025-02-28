import React from 'react';
import { Message } from '../types';
import { User, Bot } from 'lucide-react';
import ChatAttachment from './ChatAttachment';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-2 flex-shrink-0">
          <Bot size={16} />
        </div>
      )}
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`message ${isUser ? 'message-user' : 'message-ai'}`}>
          <p className="text-sm">{message.content}</p>
        </div>
        
        {message.attachments && message.attachments.length > 0 && (
          <div className={`mt-2 ${isUser ? 'mr-0' : 'ml-0'} w-full max-w-md`}>
            {message.attachments.map((attachment) => (
              <ChatAttachment key={attachment.id} attachment={attachment} />
            ))}
          </div>
        )}
        
        <span className="text-xs text-neutral-500 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-700 ml-2 flex-shrink-0">
          <User size={16} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;