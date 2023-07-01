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
        <form className='chat-component' onSubmit={handleSendMessage}>
            <input
                className='chat-input'
                type='text'
                placeholder='Send Reply'
                value={newMessage}
                onChange={handleNewMessageChange}
            />
            <button type='submit'>
                <FiSend size={20} color='#8C52FF' />
            </button>
        </form>
    );
}

export default ChatComponent;