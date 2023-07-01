import React from 'react';
import HeaderComponent from './HeaderComponent';
import NewInterviewForm from './NewInterviewForm';
import ChatComponent from './ChatComponent';
import ChatHistory from './ChatHistory';
import './index.css';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <NewInterviewForm />
      <ChatComponent />
      <ChatHistory />
    </div>
  );
}

export default App;
