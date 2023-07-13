const User = require('../models/User');
const Chat = require('../models/Chat')
const { signToken } = require('../util/auth')
const callOpenAI = require('../util/openai')
require("dotenv").config()
const { ApolloError, AuthenticationError } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

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
        createChat: async (parent, { jobTitle, jobLevel, jobFunction, technologies }, context) => {
            console.log(context);
            if (context.user) {
                console.log("CREATING CHAT")
                console.log(context.user)
        
                // create initial prompt messages
                const initialMessages = [
                    {
                        role: "system",
                        content: `You are Rachel, an interviewer. The candidate you are interviewing is ${context.user.firstname} and they are interviewing for the ${jobLevel} ${jobTitle} role, which pertains to the ${jobFunction} field. Include questions about these technologies, if applicable: ${technologies}. Please keep questions and responses brief and ask one question at a time--do not list questions and wait for a response before asking the next question. Start the interview by introducing yourself after the candidate prompts with 'Begin interview'.`
                    },
                    {
                        role: "user",
                        content: `Begin interview.`
                    }
                ];
                
                // create new chat with the initial messages
                const newChat = await Chat.create({ jobTitle, messages: initialMessages });
        
                try {
                    // Call OpenAI API with the initial messages
                    const aiResponse = await callOpenAI(initialMessages);
                    console.log(aiResponse);
        
                    // Append the AI's response to the chat
                    const aiMessage = {
                        role: "Rachel",
                        content: aiResponse.data.choices[0].message.content // take the first choice's content as the AI's message
                    };
                    newChat.messages.push(aiMessage);
        
                    // Save the chat with the new message
                    await newChat.save();
        
                    // Add new chat to user
                    await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { chats: newChat._id } },
                        { new: true, runValidators: true })

                    // Publish the new message
                    pubsub.publish(`MESSAGE_ADDED_${newChat._id}`, { messageAdded: aiMessage });
        
                    // Return newly created chat
                    return newChat;
                } catch (err) {
                    console.error(err);
                    throw new Error('Failed to get AI response');
                }
            }
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
                let response;
                try {
                    response = await callOpenAI(currentMessages)
                    console.log("response successful")
                } catch (error) {
                    console.log("OpenAI call failed: ", error.message);
                    throw new ApolloError("Failed to call OpenAI API");
                }
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
        
                // Publish the new message
                pubsub.publish(`MESSAGE_ADDED_${chatId}`, { messageAdded: data });
        
                const gptMessage = data.content.replace(/\n/g, "");
                console.log(gptMessage);
                return { gptMessage };
            };
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Subscription: {
        messageAdded: {
            subscribe: (parent, { chatId }) => pubsub.asyncIterator([`MESSAGE_ADDED_${chatId}`])
        },
    },
};

module.exports = resolvers;