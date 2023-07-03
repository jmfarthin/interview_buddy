import React, { useEffect, useState } from 'react';
import { FiMessageCircle, FiMoreHorizontal, FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const ChatHistory = ({ onMenuToggle }) => {
    const [chatHistory, setChatHistory] = useState([
        { id: 1, content: 'Chat History 1' },
        { id: 2, content: 'Chat History 2' },
        { id: 3, content: 'Chat History 3' },
    ]);

    const [showMenu, setShowMenu] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const navigate = useNavigate();

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // placeholder until auth is fully configured
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        const newMenuState = !openMobileMenu;
        setOpenMobileMenu(newMenuState);
        onMenuToggle(newMenuState);
    };

    useEffect(() => {
        // Once backend is ready, we will replace the mock data with real server data
        // fetch('http://localhost:3001/graphql', ...)
    }, []);

    return (
        <>
            {!openMobileMenu && (
                <div className="xl:hidden fixed top-0 right-0 z-20 p-4">
                    <button onClick={toggleMobileMenu}>
                        <FiMenu className="text-brandPurple h-10 w-10" />
                    </button>
                </div>
            )}
            {openMobileMenu && (
                <div className="xl:hidden fixed top-0 right-44 z-20 pr-4 pt-2">
                    <button onClick={toggleMobileMenu}>
                        <FiX className="text-brandGreen h-8 w-8" />
                    </button>
                </div>
            )}
            <aside className={`chat-history fixed top-0 right-0 transform transition-transform duration-200 ease-in-out ${openMobileMenu ? 'translate-x-0' : 'translate-x-full'} xl:translate-x-0 w-56 h-screen bg-gray-600 overflow-y-auto overflow-x-hidden p-3`}>
                <h2 className='brand-font-bold text-white text-center text-xl mb-4 custom-border-top pl-2'>Interview History</h2>
                {chatHistory.map((message) => (
                    <div key={message.id} className='chat-message flex items-center p-2'>
                        <FiMessageCircle size={22} className='text-gray-300' />
                        <p className='text-gray-200 ml-2'>{message.content}</p>
                    </div>
                ))}
                <div className='absolute bottom-0 w-full bg-gray-600 text-white p-4 pb-6 flex justify-between items-center custom-border-bottom mr-2' onClick={handleMenuClick}>
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
        </>
    );
}

export default ChatHistory;