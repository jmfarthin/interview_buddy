import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import HeaderComponent from './components/HeaderComponent';
import NewInterviewForm from './components/NewInterviewForm';
import ChatComponent from './components/ChatComponent';
import ChatHistory from './components/ChatHistory';
import LoginSignupForm from './components/LoginSignupForm';
import Auth from './utils/auth';
import './index.css';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inProp, setInProp] = useState(false);
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);


  useEffect(() => {
    // if (isLoggedIn) {

    if (Auth.loggedIn()) {
      setInProp(true);
    }
  }, [isLoggedIn]);

  const handleMenuToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages])

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={isLoggedIn ? <Navigate to="/app" /> : <LoginSignupForm onLogin={() => setIsLoggedIn(true)} />} /> */}

          <Route path="/" element={Auth.loggedIn() ? <Navigate to="/app" /> : <LoginSignupForm />} />
          {/* <Route path="/app" element={isLoggedIn ? ( */}
          <Route path="/app" element={Auth.loggedIn() ? (
            <>
              <div className="flex flex-col items-center justify-center">
                <HeaderComponent isMenuOpen={isMenuOpen} inProp={inProp} setMessages={setMessages} setChatId={setChatId} messages={messages} />
                <Transition in={inProp} timeout={300}>
                  {(state) => <ChatComponent state={state} setMessages={setMessages} messages={messages} chatId={chatId} />}
                </Transition>
                <div ref={chatRef} className='mt-10 flex flex-col overflow-y-auto w-2/3 h-3/4 p-8' style={{ maxHeight: '75vh' }}>
                  {messages.map((message, index) => (<div key={++index} className={message.isUser ? 'user' : 'rachel'}>{message.text}</div>))}
                </div>
              </div>

              <ChatHistory onMenuToggle={handleMenuToggle} />
            </>
          ) : (
            <Navigate to="/" />
          )} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;