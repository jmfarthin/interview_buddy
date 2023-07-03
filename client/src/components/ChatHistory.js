import React, { useEffect, useState } from 'react';
import { FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const ChatHistory = () => {
    const [chatHistory, setChatHistory] = useState([
        // placeholders for 'ChatHistory' state until backend ready
        { id: 1, content: 'Chat History 1' },
        { id: 2, content: 'Chat History 2' },
        { id: 3, content: 'Chat History 3' },
    ]);

    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // placeholder until auth is fully configured
        navigate('/login');
    };

    useEffect(() => {
        // Once backend is ready, we will replace the mock data with real server data
        // fetch('http://localhost:3001/graphql', ...)
    }, []);

    return (
        <aside className='chat-history absolute top-0 right-0 w-72 h-screen bg-gray-600 overflow-y-auto overflow-x-hidden p-3'>
            <h2 className='brand-font-bold text-white text-center text-2xl mb-4 custom-border-top'>Interview History</h2>
            {chatHistory.map((message) => (
                <div key={message.id} className='chat-message flex items-center p-2'>
                    <FiMessageCircle size={20} className='text-gray-300' />
                    <p className='text-gray-200 ml-2'>{message.content}</p>
                </div>
            ))}
            <div className='absolute bottom-0 w-full bg-gray-600 text-white p-4 flex justify-between items-center custom-border-bottom mr-2' onClick={handleMenuClick}>
                <p>user@example.com</p>
                <FiMoreHorizontal className='text-gray-200 mr-3' />
            </div>
            {showMenu && (
                <div className="menu absolute bottom-full w-full bg-gray-800 p-4">
                    <Link className="menu-item text-gray-200 block py-2" to="/account">Account</Link>
                    <Link className="menu-item text-gray-200 block py-2" to="/plans">View Plans</Link>
                    <Link className="menu-item text-gray-200 block py-2" to="/billing">Billing/Payments</Link>
                    <button className="menu-item logout-button text-gray-200 block py-2" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </aside>
    );
}

export default ChatHistory;