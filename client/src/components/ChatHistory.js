import React, { useEffect, useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';

const ChatHistory = () => {
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // may need to be edited depending on schema structure
                query: `
                    query {
                        fetchChatHistory {
                            id
                            content
                        }
                    }
                `
            }),
        })
        .then(res => res.json())
        .then(data => {
            setChatHistory(data.data.fetchChatHistory);
        })
        .catch (err => console.error(err));
    }, []);

    return (
        <ul className='chat-history'>
            {chatHistory.map((message, index) => (
                <li key={index} className='chat-message'>
                    <FiMessageCircle size={20} color='#D9D9D9' />
                    <p>{message.content}</p>
                </li>
            ))}
        </ul>
    );
}

export default ChatHistory;