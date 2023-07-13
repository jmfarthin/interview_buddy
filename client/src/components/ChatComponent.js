import React, { useState, useEffect, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import { PacmanLoader } from 'react-spinners';
import { useMutation, useSubscription } from '@apollo/client';
import { MESSAGE_ADDED } from '../utils/subscriptions';
import { PROMPT_CHAT } from '../utils/mutations';

const ChatComponent = ({ chatId, initialMessage }) => {
  console.log(currentChatId);

  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingMessage, setTypingMessage] = useState({ role: '', content: '', index: 0 });
  const messagesEndRef = useRef(null);

  const { data, error: subscriptionError } = useSubscription(MESSAGE_ADDED, { variables: { chatId } });
  const [promptChat, { loading: chatLoading, error: chatError }] = useMutation(PROMPT_CHAT);

  const startTyping = (message) => {
    setTyping(true);
    setTypingMessage({ role: message.role, content: '', index: 0 });

    const typingInterval = setInterval(() => {
      setTypingMessage((typingMessage) => {
        if (typingMessage.index < message.content.length) {
          return {
            role: typingMessage.role,
            content: typingMessage.content + message.content[typingMessage.index],
            index: typingMessage.index + 1,
          };
        } else {
          clearInterval(typingInterval);
          setMessages((prevMessages) => [...prevMessages, { role: message.role, content: message.content }]);
          setTyping(false);
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
          }
          return { role: '', content: '', index: 0 };
        }
      });
    }, 50);
  };

  useEffect(() => {
    if (data && data.messageAdded && (!messages.length || messages[messages.length - 1].content !== data.messageAdded.content)) {
      startTyping(data.messageAdded);
    }
  }, [data, messages]);

  useEffect(() => {
    if (initialMessage) {
      startTyping(initialMessage);
    }
  }, [initialMessage]);

  const handleNewMessageChange = event => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async event => {
    console.log('Chat ID in handleSendMessage:', chatId);
    event.preventDefault();
    const userMessage = newMessage;
    setNewMessage('');
    try {
      setMessages((prevMessages) => [...prevMessages, { role: 'User', content: userMessage }]);
      const { data } = await promptChat({ variables: { chatId, answer: userMessage } });
      if (data && data.promptChat) {
        startTyping({ role: 'Rachel', content: data.promptChat.gptMessage });
      } else {
        throw new Error("Failed to get AI response");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div 
          className="chat-wrapper"
          style={{
            display: 'flex',
            flexDirection: 'column',  // changed from 'column-reverse'
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 120px)', // adjust based on the actual height of your HeaderComponent and form
            width: '100%',
            maxWidth: '60%',
            padding: '4rem',
            boxSizing: 'border-box',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            position: 'absolute', // make it absolute
            bottom: '60px', // adjust based on the actual height of your form
          }}
        >
          <div ref={messagesEndRef} />
          {(typing && typingMessage.role) ? <p className="pb-2"><span className="bg-brandGreen p-1 rounded-md">{typingMessage.role}</span>  {typingMessage.content}<span className='typing-indicator'>|</span></p> : null}
          {messages.map((message, index) => (
            <p key={index} className="pb-2"><span className="bg-brandGreen p-1 rounded-md">{message.role}</span> {message.content}</p>
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            background: '#34BB9A',
            padding: '1rem',
            boxSizing: 'border-box',
          }}
        >
          <div className="relative w-full md:w-4/6 mx-auto">
            <input
              className='chat-input flex-grow bg-brandGray p-3 rounded-full w-full'
              type='text'
              placeholder='Send Reply'
              value={newMessage}
              onChange={handleNewMessageChange}
            />
            <button type='submit' className='absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-brandGray text-white rounded-md' disabled={chatLoading}>
              {chatLoading ? <PacmanLoader /> : <FiSend size={23} color='#8C52FF' />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChatComponent;