const User = require('../models/User');
const Chat = require('../models/Chat')
const { signToken } = require('../util/auth')
const callOpenAI = require('../util/openai')
const { elevenLabsAPI } = require('../util/elevenLabs');
require("dotenv").config()
const { ApolloError, AuthenticationError } = require('apollo-server-express');
const { text } = require('express');

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
        login: async (parent, { email, password }) => {
            console.log(email);
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        createChat: async (parent, { jobTitle, jobLevel, jobFunction, jobTechnology }, context) => {
            console.log(context.user);
            if (context.user) {
                console.log("CREATING CHAT")
                console.log(context.user)
                // create first prompt messages
                // create new chat
                const newChat = await Chat.create({
                    jobTitle, messages: [
                        {
                            role: "system",
                            content: `You are Rachel, an interviewer. The candidate you are interviewing is ${context.user.firstname} and they are interviewing for the ${jobLevel} ${jobTitle} role, which pertains to the ${jobFunction} field. Include questions about these technologies, if applicable: ${jobTechnology}. Please keep questions and responses brief and ask one question at a time--do not list questions and wait for a response before asking the next question. Start the interview by introducing yourself after the candidate prompts with 'Begin interview'.`
                        },
                        {
                            role: "user",
                            content: `Begin interview.`
                        }]
                });
                //this needs to be in a try catch then, we don't want to update the user if the chat isn't created.

                // add new chat to user
                await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { chats: newChat._id } },
                    { new: true, runValidators: true })

                //return newly created chat
                return newChat;
            };
            throw new AuthenticationError('You need to be logged in!');
        },
        promptChat: async (parent, { chatId, answer }, context) => {
            if (context.user) {
                // save user answer if one is sent and get current chat history
                let getChat;
                if (answer) {
                    getChat = await Chat.findOneAndUpdate({ _id: chatId }, {
                        $addToSet: { messages: { role: "user", content: answer } },
                    },
                        {
                            new: true,
                            runValidators: true,
                        }).lean();
                } else {
                    getChat = await Chat.findOne({ _id: chatId }).populate('messages').lean();
                }

                //get all messages
                const allMessages = getChat.messages;
                console.log('----------------allmessages--------------');
                console.log(allMessages)
                const allMessagesWithoutId = allMessages.map(({ _id, ...rest }) => rest);
                console.log('------------------allMessagesWithoutId--------------');
                console.log(allMessagesWithoutId);
                console.log('----------------------------------')

                //establish most recent conversation
                let currentMessages;
                if (allMessagesWithoutId?.length >= 7) {
                    currentMessages = allMessagesWithoutId.slice(0, 2).concat(allMessagesWithoutId.slice(-5))
                } else {
                    currentMessages = allMessagesWithoutId;
                };

                // make call to openAI with current messages
                const response = await callOpenAI(currentMessages)
                console.log("response successful")
                // console.log(response)
                console.log(`===========================================`)
                console.log(`===========================================`)
                var data = response?.data?.choices[0].message
                // extract and return next gpt question
                if (!data.content || !data.role) {
                    console.log("My api failed!")
                    throw new ApolloError("OpenAI call Failed")
                }
                //save gpt response to chat history
                await Chat.findOneAndUpdate({ _id: chatId }, {
                    $addToSet: { messages: data },
                },
                    {
                        new: true,
                        runValidators: true,
                    });


                const gptMessage = data.content.replace(/\n/g, "");
                console.log(gptMessage);
                return { gptMessage };
            };
            throw new AuthenticationError('You need to be logged in!');
        },
        generateAudio: async (parent, { textInput }) => {

            try {
                console.log(textInput);
                elevenLabsAPI(textInput);
                return "SUCCESS";
            } catch (err) {
                return "FAILED";
            }

        }

    }

};

module.exports = resolvers;