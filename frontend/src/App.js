import React, { useState, useEffect } from 'react';
import MessageBox from './components/MessageBox/MessageBox';
import SignUp from './components/SignUp/SignUp';
import MyMessages from './components/MyMessages/MyMessages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
  const [userId, setUserId] = useState('');
  //check if user id present in local storage
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUserId(userId);
    }
  }, []);
  return (
    <Router>
      <Routes>
        {!userId ? (
          <Route path="/" element={<SignUp />} exact />
        ) : (
          <Route path="/" element={<MyMessages />} exact />
        )}

        <Route path="/sendMessage/:userId" element={<MessageBox />} exact />

        <Route path="/myMessages" element={<MyMessages />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};
export default App;
