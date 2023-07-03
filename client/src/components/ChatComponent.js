import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ChatComponent = () => {
    const [newMessage, setNewMessage] = useState('');

    const handleNewMessageChange = event => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = event => {
        event.preventDefault();

        // this call may need to be revised once backend details are finalized.
        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        createMessage(input: {
                            content: "${newMessage}"
                        }) {
                            id
                            content
                        }
                    }
                `
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // will handle the response data or error here
        })
        .catch(err => {
            console.error(err);
            // will handle any network errors here
        });

        setNewMessage('');
    };

    return (
        <form 
            className='chat-component absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-brandGreen p-5 shadow-lg flex justify-center items-center' 
            onSubmit={handleSendMessage}
        >
            <div className="relative w-1/2">
                <input
                    className='chat-input flex-grow bg-brandGray p-3 rounded-full w-full'
                    type='text'
                    placeholder='Send Reply'
                    value={newMessage}
                    onChange={handleNewMessageChange}
                />
                <button type='submit' className='absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-brandGray text-white rounded-md'>
                    <FiSend size={23} color='#8C52FF' />
                </button>
            </div>
        </form>
    );
}

export default ChatComponent;