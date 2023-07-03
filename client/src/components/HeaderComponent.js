import React, { useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import NewInterviewForm from './NewInterviewForm';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../InterviewBuddy-Logo.png';

const HeaderComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const buttonRef = useRef(null);
    const formRef = useRef(null);
    const { styles, attributes } = usePopper(buttonRef.current, formRef.current, {
      placement: 'bottom-start',
    });

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // placeholder until auth is fully configured

        navigate('/login');
    };

    return (
        <header className="container flex justify-between px-4 md:px-8 lg:px-12 xl:px-16">
            <img src={logo} alt="Interview Buddy Logo" className="w-16 md:w-20 lg:w-24 xl:w-32 h-auto" />
            <div ref={buttonRef} className="flex items-center">
                <button onClick={() => setShowForm(!showForm)} className="flex items-center bg-brandPurple rounded-full p-3">
                    <FaPlus style={{ color: '#34BB9A' }} className="mr-2" />
                    <span className="brand-font-bold text-brandGray text-lg">New Interview</span>
                </button>
            </div>
            {showForm && <NewInterviewForm ref={formRef} styles={styles.popper} attributes={attributes.popper} />}
            <GiHamburgerMenu onClick={handleMenuClick} className="text-brandPurple rounded-full text-3xl mt-9"/>
            {showMenu && (
                <div className="menu">
                    <Link className="menu-item" to="/account">Account</Link>
                    <Link className="menu-item" to="/plans">View Plans</Link>
                    <Link className="menu-item" to="/billing">Billing/Payments</Link>
                    <button className="menu-item logout-button" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </header>
    );
}

export default HeaderComponent;