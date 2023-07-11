const voice = require('elevenlabs-node');
const fs = require('fs');

const apiKey = '8a22f6f4cd89d5b28eebeaf307521dc8'; // Your API key from Elevenlabs
const voiceID = '21m00Tcm4TlvDq8ikWAM';            // The ID of the voice you want to get
const fileName = './audios/audio.mp3';                      // The name of your audio file
// const textInput = 'Hello and welcome to your web development interview';                 // The text you wish to convert to speech


module.exports = {
    elevenLabsAPI : async (text) => {
        // console.log(text)
        
        try {
            return await voice.textToSpeech(apiKey, voiceID, fileName, text);
        } catch (err) {
            return err;
        }
        
        // console.log(text);
        // return text;
    }
}

// find a react/JS audio library

