import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { PROMPT_CHAT } from '../utils/mutations';
import { useMutation } from '@apollo/client';




const ChatComponent = ({ state, setMessages, messages, chatId }) => {
  const [promptChat, { error }] = useMutation(PROMPT_CHAT);
  const [newAnswer, setNewAnswer] = useState('');

  const handleAnswerRachel = async (e) => {
    e.preventDefault();
    try {
      var answerHolder = newAnswer;
      setNewAnswer('');
      setMessages([...messages, {text: answerHolder, isUser: true }]);
      const message = await promptChat({ variables: { chatId, answer: answerHolder } });
      if (!message) {
        throw new Error('Failed openAI call!')
      }
      setMessages([...messages, { text: newAnswer, isUser: true }, { text: message.data.promptChat.gptMessage, isUser: false }]);
    } catch (error) {
      console.log(error);
    };
  };


  return (<form
    className={`chat-component chat-component-${state} absolute bottom-0 left-0 right-0 mx-auto w-full bg-brandGreen p-5 shadow-lg flex justify-center items-center`} onSubmit={handleAnswerRachel}
  >
    <div className="relative w-full md:w-4/6">
      <input
        className='chat-input flex-grow bg-brandGray p-3 rounded-full w-full'
        type='text'
        placeholder='Send Reply'
        value={newAnswer}
        onChange={(answer) => setNewAnswer(answer.target.value)}
      />
      <button  type='submit' className='absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-brandGray text-white rounded-md'>
        <FiSend size={23} color='#8C52FF' />
      </button>
    </div>
  </form>
  );
}


export default ChatComponent;
