import { useState, useEffect } from 'react';
import textToSpeech from '../utils/elevenLabsAPI';

const AudioPlayer = () => {
  // Define a state variable to hold the audio URL
  const [audioURL, setAudioURL] = useState(null);

  // Define a function to fetch the audio data and set the URL state variable
  const handleAudioFetch = async () => {
    // Call the textToSpeech function to generate the audio data for the text "Hello welcome"
    const data = await textToSpeech("Hello welcome Everybody")
    // Create a new Blob object from the audio data with MIME type 'audio/mpeg'
    const blob = new Blob([data], { type: 'audio/mpeg' });
    // Create a URL for the blob object
    const url = URL.createObjectURL(blob);
    // Set the audio URL state variable to the newly created URL
    setAudioURL(url);
  };

  // Use the useEffect hook to call the handleAudioFetch function once when the component mounts
  useEffect(() => {
    handleAudioFetch()
  }, []);

  // Render an audio element with the URL if it is not null
  return (
    <div>
      {audioURL && (
        <audio autoPlay controls>
          <source src={audioURL} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;

// FROM CHAT COMPONENT

  // const {
  //   status,
  //   startRecording,
  //   stopRecording,
  //   mediaBlobUrl,
  // } = useReactMediaRecorder({ audio: true });

  // const handleListen = async (event) => {
  //   event.preventDefault();

    // if (status === "recording") {
    //   stopRecording();
    // } else {
    //   startRecording();
    // }
  // };
  // const [newMessage, setNewMessage] = useState('');
  // const [isListening, setIsListening] = useState(false);



  // const handleNewMessageChange = event => {
  //   setNewMessage(event.target.value);
  // };



  // const handleSendMessage = async event => {
  //   event.preventDefault();

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

    // setNewMessage('');
  // };

/* <button onClick={handleListen} type='button' className='absolute right-12 top-1/2 transform -translate-y-1/2 p-3 bg-brandGray text-white rounded-md'> */

/* <button onClick={handleListen} type='button' className='absolute right-12 top-1/2 transform -translate-y-1/2 p-3 bg-brandGray text-white rounded-md'>
        <FiMic size={23} color={isListening ? '#ff0000' : '#8C52FF'} />
    </button> */