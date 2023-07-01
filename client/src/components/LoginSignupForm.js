import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { LOGIN_MUTATION, REGISTER_MUTATION } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

const LoginSignupForm = ({ onLogin }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    // const [login] = useMutation(LOGIN_MUTATION);
    // const [register] = useMutation(REGISTER_MUTATION);

    const navigate = useNavigate();

    const handleLogin = async event => {
        event.preventDefault();
        // Simulating login process
        if (loginEmail === 'test@test.com' && loginPassword === 'test') {
            setErrorMessage('Logged in successfully!');
            onLogin();
            navigate('/app');  // Redirect to the main app page
        } else {
            setErrorMessage('Login failed');
        }
    };

    const handleRegister = async event => {
        event.preventDefault();
        if (registerPassword !== registerConfirmPassword) {
            setErrorMessage('Passwords do not match. Please try again');
            return;
        }
        // Simulating registration process
        setErrorMessage(`Registered successfully with email: ${registerEmail}`);
        onLogin();
        navigate('/app');  // Redirect to the main app page
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type='email' placeholder='Email' value={loginEmail} onChange={event => setLoginEmail(event.target.value)} />
                <input type='password' placeholder='Password' value={loginPassword} onChange={event => setLoginPassword(event.target.value)} />
                <button type='submit'>Login</button>
            </form>

            <h2>Create a new account</h2>
            <form onSubmit={handleRegister}>
                <input type='email' placeholder='Email' value={registerEmail} onChange={event => setRegisterEmail(event.target.value)} />
                <input type='password' placeholder='Password' value={registerPassword} onChange={event => setRegisterPassword(event.target.value)} />
                <input type='password' placeholder='Confirm Password' value={registerConfirmPassword} onChange={event => setRegisterConfirmPassword(event.target.value)} />
                <button type='submit'>Register</button>
            </form>

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default LoginSignupForm;