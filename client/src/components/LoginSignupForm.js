import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import logo from '../InterviewBuddy-Logo2.png';
import myAnimation from '../121995-interview-purple.json';

const LoginSignupForm = ({ onLogin }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    // Simulating login process
    if (loginEmail === 'test@test.com' && loginPassword === 'test') {
      setErrorMessage('Logged in successfully!');
      onLogin();
      navigate('/app'); // Redirect to the main app page
    } else {
      setErrorMessage('Login failed');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setErrorMessage('Passwords do not match. Please try again');
      return;
    }
    // Simulating registration process
    setErrorMessage(`Registered successfully with email: ${registerEmail}`);
    onLogin();
    navigate('/app'); // Redirect to the main app page
  };

  return (
    <div className="max-w-max mx-auto">
        <div className="flex flex-wrap w-full items-center justify-center lg:justify-start">
        <div className="w-full lg:w-1/2 mt-16 p-4">
            <div className="absolute top-5 left-5">
                <img
                src={logo}
                alt="Logo"
                className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24"
                />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <Lottie animationData={myAnimation} className="w-full sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-full mx-auto" />

                <div className="max-w-2xl text-center">
                    <p className="text-gray-700 brand-font-bold text-xl">
                        Master the art of the job interview with Interview Buddy! Practice makes perfect, and we're here to make practice easy. Gear up, have fun, and land your dream job with confidence!
                    </p>
                </div>
            </div>

        </div>

        <div className="w-full lg:w-1/2">
            <div className="max-w-sm bg-gray-700 mt-20 mb-6 p-8 rounded-lg mx-auto">
                <h2 className="text-2xl brand-font-bold text-white mb-3">Login</h2>
                <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="loginEmail" className="block text-sm brand-font-bold text-white">
                    Email
                    </label>
                    <input
                    type="email"
                    id="loginEmail"
                    className="email-input bg-brandGreen px-3 py-2 rounded-lg w-full"
                    value={loginEmail}
                    onChange={(event) => setLoginEmail(event.target.value)}
                    placeholder="Email"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="loginPassword" className="block text-sm brand-font-bold text-white">
                    Password
                    </label>
                    <input
                    type="password"
                    id="loginPassword"
                    className="password-input bg-brandGreen px-3 py-2 rounded-lg w-full"
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    placeholder="Password"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gradient text-white text-lg brand-font-bold py-2 px-4 mt-2 rounded-full w-1/2 hover:bg-blue-600"
                >
                    Login
                </button>
                </form>

                <div className="mt-8">
                <h2 className="text-2xl text-white brand-font-bold mb-3">Create a new account</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                    <label htmlFor="registerEmail" className="block text-sm brand-font-bold text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        id="registerEmail"
                        className="email-input bg-brandGreen px-3 py-2 rounded-lg w-full"
                        value={registerEmail}
                        onChange={(event) => setRegisterEmail(event.target.value)}
                        placeholder="Email"
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="registerPassword" className="block text-sm brand-font-bold text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        id="registerPassword"
                        className="password-input bg-brandGreen px-3 py-2 rounded-lg w-full"
                        value={registerPassword}
                        onChange={(event) => setRegisterPassword(event.target.value)}
                        placeholder="Password"
                    />
                    </div>
                    <div className="mb-4">
                    <label
                        htmlFor="registerConfirmPassword"
                        className="block text-sm brand-font-bold text-white"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="registerConfirmPassword"
                        className="password-input bg-brandGreen px-3 py-2 rounded-lg w-full"
                        value={registerConfirmPassword}
                        onChange={(event) => setRegisterConfirmPassword(event.target.value)}
                        placeholder="Confirm Password"
                    />
                    </div>
                    <button
                    type="submit"
                    className="bg-gradient text-white text-lg brand-font-bold py-2 px-4 mt-2 rounded-full w-1/2 hover:bg-blue-600"
                    >
                    Register
                    </button>
                </form>
                </div>
            </div>
        </div>

        {errorMessage && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default LoginSignupForm;