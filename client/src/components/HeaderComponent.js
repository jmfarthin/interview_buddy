import React, { useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import NewInterviewForm from './NewInterviewForm';
import { FaPlus } from 'react-icons/fa';
import logo from '../InterviewBuddy-Logo2.png';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const buttonRef = useRef(null);
    const formRef = useRef(null);
    const { styles, attributes } = usePopper(buttonRef.current, formRef.current, {
      placement: 'bottom-end',
    });

    const handleLogout = () => {
        localStorage.removeItem('token'); // placeholder until auth is fully configured
        navigate('/login');
    };

    return (
        <header className="container flex justify-between px-4 md:px-8 lg:px-12 xl:px-16 mt-5">
            <img src={logo} alt="Interview Buddy Logo" className="w-12 md:w-14 lg:w-18 xl:w-24 h-auto" />
            <div ref={buttonRef} className="flex items-center">
                <button onClick={() => setShowForm(!showForm)} className="flex items-center bg-gradient rounded-full p-4">
                    <FaPlus style={{ color: '#34BB9A' }} className="mr-2" />
                    <span className="brand-font-bold text-white text-lg">New Interview</span>
                </button>
            </div>
            <NewInterviewForm showForm={showForm} ref={formRef} styles={styles.popper} attributes={attributes.popper} />
        </header>
    );
}

export default HeaderComponent;