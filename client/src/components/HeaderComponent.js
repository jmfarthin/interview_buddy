import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';


const HeaderComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // placeholder until auth is fully configured

        history.push('/login');
    };

    return (
        <header>
            <img src="#" alt="Interview Buddy Logo" />
            <button onClick={() => setShowForm(!showForm)}>
                <FaPlus style={{ color: '#34BB9A' }} /> New Interview
            </button>
            {showForm && <NewInterviewForm />}
            <GiHamburgerMenu onClick={handleMenuClick} />
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