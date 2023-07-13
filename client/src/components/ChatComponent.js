import React, { useState, useEffect, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import { PacmanLoader } from 'react-spinners';
import { useMutation, useSubscription } from '@apollo/client';
import { MESSAGE_ADDED } from '../utils/subscriptions';
import { PROMPT_CHAT } from '../utils/mutations';

const ChatComponent = ({ state, chatId }) => {
  console.log(`ChatComponent state: ${state}`);
  console.log(`ChatComponent chatId: ${chatId}`);

  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Log when chatId changes
  useEffect(() => {
    console.log(`ChatId changed to: ${chatId}`);
  }, [chatId]);

  // Check mounting
  useEffect(() => {
    console.log('ChatComponent mounted');
    
    return () => {
      console.log('ChatComponent unmounted');
    };
  }, []);

  // Check when the props change
  useEffect(() => {
    console.log('ChatComponent state:', state);
    console.log('ChatComponent chatId:', chatId);
  }, [state, chatId]);

  // Subscribe to new messages
  const { data, error: subscriptionError } = useSubscription(MESSAGE_ADDED, { variables: { chatId } });
  const [promptChat, { loading: chatLoading, error: chatError }] = useMutation(PROMPT_CHAT);

  // Auto scroll to bottom 
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // Update local state when new message arrives
  useEffect(() => {
    if (data && data.messageAdded) {
      setMessages(prevMessages => [...prevMessages, data.messageAdded]);
      scrollToBottom();
    }
  }, [data]);

  const handleNewMessageChange = event => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async event => {
    event.preventDefault();

    // Clear the input field before sending the message
    setNewMessage('');

    try {
      const { data } = await promptChat({ variables: { chatId, answer: newMessage } });
      
      // Append the new message from the AI to the messages array
      if (data && data.promptChat) {
        setMessages(prevMessages => [...prevMessages, { role: 'AI', content: data.promptChat.gptMessage }]);
      }
    } catch (err) {
      console.error(err);
      // handle error here
    }
  };

  return (
    <div className="chat-component">
      {/* Display messages */}
      <div>
        {subscriptionError && <p>Error: {subscriptionError.message}</p>}
        {messages.map((message, index) => (
          <p key={index}>{message.role}: {message.content}</p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form 
        className={`chat-component-${state} absolute bottom-0 left-0 right-0 mx-auto w-full bg-brandGreen p-5 shadow-lg flex justify-center items-center`} 
        onSubmit={handleSendMessage}
      >
        <div className="relative w-full md:w-4/6">
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
      {chatError && <p>Error: {chatError.message}</p>}
    </div>
  );
}

export default ChatComponent;