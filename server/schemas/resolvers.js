const User = require('../models/User');
const Chat = require('../models/Chat')
const callOpenAI = require('../util/openai')
require("dotenv").config()
const { ApolloError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('chats');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        chat: async (parent, { chatId }) => {
            return Chat.findOne({ _id: chatId }).populate('messages');
        },
    },
    Mutation: {
        addUser: async (parent, { firstname, email, password }) => {
            const user = await User.create({ firstname, email, password });
            const token = signToken(user);
            return { token, user };
        },
        createChat: async (parent, { jobTitle, jobLevel, jobFunction, technologies }, context) => {
            if (context.user) {
                // create first propmpt messages
                const firstGptPrompt = {
                    role: "system", content: `You are Rachel, an interviewer. Your current candidate is interviewing 
        for the ${jobLevel} ${jobTitle} role, which pertains to the ${jobFunction} field. 
         Include questions about these technologies: ${technologies}. 
         Please keep questions brief and wait for a response before asking the next question.`};
                const firstUserPrompt = {
                    role: "user",
                    content: `Hi, my name is ${context.user.firstname}, I'm here for the interview.`
                }
                // create new chat
                const newChat = await Chat.create({ jobTitle, messages: { firstGptPrompt, firstUserPrompt } });

                // add new chat to user
                await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { chats: newChat } },
                    { new: true, runValidators: true })

                //return newly created chat
                return newChat;
            };
            throw new AuthenticationError('You need to be logged in!');
        },
        promptChat: async (parent, { chatId, answer }, context) => {
            if (context.user) {
                // save user answer
                await Chat.findOneAndUpdate({ _id: chatId }, {
                    $addToSet: { messages: { role: "user", content: answer } },
                },
                    {
                        new: true,
                        runValidators: true,
                    });

                //get all messages
                const currentChat = await Chat.findOne({ _id: chatId }).populate('messages');
                const allMessages = currentChat.messages;

                //establish most recent conversation
                let currentMessages;
                if (allMessages?.length >= 7) {
                    currentMessages = allMessages.slice(0, 2).concat(allMessages.slice(-5))
                } else {
                    currentMessages = allMessages;
                };

                // make call to openAI with current messages
                const response = await callOpenAI(currentMessages)
                console.log("response successful")
                // console.log(response)
                console.log(`===========================================`)
                console.log(`===========================================`)
                var data = response?.data?.choices[0].message

                //save gpt response to chat history
                await Chat.findOneAndUpdate({ _id: chatId }, {
                    $addToSet: { messages: data },
                },
                    {
                        new: true,
                        runValidators: true,
                    });

                // extract and return next gpt question
                var gptMessage = response?.data?.choices[0].message.content;
                if (!gptMessage) {
                    console.log("My api failed!")
                    throw new ApolloError("OpenAI call Failed")
                }
                // const gptResponse = result.replace(`/\n/g`, "");
                console.log(data);
                console.log(gptMessage);
                return { gptMessage };
            };
            throw new AuthenticationError('You need to be logged in!');
        },
        saveMessage: async (parent, { chatId, role, content }, context) => {
            try {
                return await Chat.findOneAndUpdate(
                    { _id: chatId },
                    {
                        $addToSet: { messages: { role: role, content: content } },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            } catch (error) {
                throw new Error(`Failed to save message: ${error.message}`);
            }
        },
    }

};

module.exports = resolvers;