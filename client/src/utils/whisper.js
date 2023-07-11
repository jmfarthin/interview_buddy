const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const fs = require("fs");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// function to convert recorded user audio to text
const convertAudio = async (audio) => {
    try {
        const resp = await openai.createTranscription(
            fs.createReadStream(audio),
            "whisper-1",
        );
        console.log(resp.data.text);
        const convertedAudio = resp.data.text;
        return convertedAudio;
    } catch (error) {
        console.log(error);
        throw new Error("Call to Whisper failed!");
    }

};

// const testAudio = "test.m4a"

// convertAudio(testAudio);

module.exports = convertAudio;


