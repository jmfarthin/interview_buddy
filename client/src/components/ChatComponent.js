import React, { useState } from 'react';
import { FiSend, FiMic } from 'react-icons/fi';
import { useReactMediaRecorder } from "react-media-recorder";


// const ChatComponent = ({ state }) => {

const ChatComponent = ({ state }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
    
  // const {
  //   status,
  //   startRecording,
  //   stopRecording,
  //   mediaBlobUrl,
  // } = useReactMediaRecorder({ audio: true });

  const handleNewMessageChange = event => {
    setNewMessage(event.target.value);
  };

  const handleListen = async (event) => {
    event.preventDefault();

    // if (status === "recording") {
    //   stopRecording();
    // } else {
    //   startRecording();
    // }
  };

  const handleSendMessage = async event => {
    event.preventDefault();

    // let fetchUrl = 'http://localhost:3001/graphql';
    // let fetchOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     query: `
    //       mutation {
    //         createMessage(input: {
    //           content: "${newMessage}"
    //         }) {
    //           id
    //           content
    //         }
    //       }
    //     `,
    //   }),
    // };


    // if (mediaBlobUrl) {
    //   const audioBlob = await fetch(mediaBlobUrl).then(res => res.blob());

    //   let formData = new FormData();
    //   formData.append('audio', audioBlob, 'audio.wav');

    //   fetchUrl = 'http://localhost:3001/api/voice';
    //   fetchOptions = {
    //     method: 'POST',
    //     body: formData,
    //   };
    // }

    // fetch(fetchUrl, fetchOptions)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     // will handle the response data or error here
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     // will handle any network errors here
    //   });

    setNewMessage('');
  };

  
    return (<form 
      className={`chat-component chat-component-${state} absolute bottom-0 left-0 right-0 mx-auto w-full bg-brandGreen p-5 shadow-lg flex justify-center items-center`} 
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
          {/* <button onClick={handleListen} type='button' className='absolute right-12 top-1/2 transform -translate-y-1/2 p-3 bg-brandGray text-white rounded-md'> */}

          <button onClick={handleListen} type='button' className='absolute right-12 top-1/2 transform -translate-y-1/2 p-3 bg-brandGray text-white rounded-md'>
              <FiMic size={23} color={isListening ? '#ff0000' : '#8C52FF'} />
          </button>
          <button type='submit' className='absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-brandGray text-white rounded-md'>
              <FiSend size={23} color='#8C52FF' />
          </button>
      </div>
  </form>
  );
}

    
export default ChatComponent;
