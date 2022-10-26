import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignUp from '../SignUp/SignUp';
const MyMessages = () => {
  const [userId, setUserId] = useState('');
  const [messages, setMessages] = useState([]);
  //first fetch userId from local storage than fetch messages
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUserId(userId);
      fetchMessages(userId);
    }
  }, []);
  //fetch messages from backend
  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/getMessage/${userId}`
      );
      console.log(response.data);
      setMessages(response.data?.messages);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      MyMessages
      {
        //if userId is not present in local storage then show signup component
        !userId && <SignUp />}
        {userId && (
            <div>
                <h1>My Messages</h1>
                {messages.map((message) => (
                    <div key={message._id}>
                        <h3>{message.message}</h3>
                    </div>
                ))}
            </div>
        )}
    </div>
    );
};



export default MyMessages;
