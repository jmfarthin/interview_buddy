import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { Transition } from 'react-transition-group';
import HeaderComponent from './components/HeaderComponent';
import NewInterviewForm from './components/NewInterviewForm';
import ChatComponent from './components/ChatComponent';
import ChatHistory from './components/ChatHistory';
import LoginSignupForm from './components/LoginSignupForm';
import './index.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inProp, setInProp] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
  const [initialMessage, setInitialMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }

    if (isLoggedIn) {
      setInProp(true);
    }
  }, [isLoggedIn]);

  const handleMenuToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  // Function to handle chat creation
  const handleChatCreated = useCallback((aiMessage) => {
    console.log(aiMessage);
    setCurrentChatId(aiMessage.chatId);
    console.log('Chat ID Expected ==================');
    console.log(currentChatId);
    setInitialMessage(aiMessage);
    setInProp(true);
    setShowForm(false);  // Hide the form after chat creation
  }, []);

  // Function to show the form
  const handleShowForm = () => {
    setShowForm(true);  // Show the form when the button is clicked
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/app" /> : <LoginSignupForm onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/app" element={isLoggedIn ? (
              <>
                <div className="flex flex-col items-center justify-center">
                  <HeaderComponent isMenuOpen={isMenuOpen} inProp={inProp} onNewInterview={handleShowForm} />
                  {showForm && <NewInterviewForm onClose={() => setShowForm(false)} onChatCreated={handleChatCreated} />}
                  <Transition in={inProp} timeout={500}>
                    {(state) => (
                      <div className={`popup ${state}`}>
                        <ChatComponent chatId={currentChatId} initialMessage={initialMessage} />
                      </div>
                    )}
                  </Transition>
                </div>
                <ChatHistory onMenuToggle={handleMenuToggle} />
              </>
            ) : (
              <Navigate to="/" />
            )} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;