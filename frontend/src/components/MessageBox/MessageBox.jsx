import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const MessageBox = () => {
  const { userId } = useParams();
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({
    userId: '',
    name: 'Loading...',
  });
  const [isMessageSent, setIsMessageSent] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/getUser/${userId}`
        );

        setUser(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getUser();
  }, [userId]);
  const sendMessage = async () => {
    if (message.length < 3) {
      alert('Please enter a message');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/sendMessage/${userId}`,
        { message }
      );
      if (response.status === 200) {
        setIsMessageSent(true);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      {!isMessageSent && (
        <div>
          <h1>Send Messages To {user?.name}</h1>
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={() => {
                sendMessage();
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
      {isMessageSent && (
        <div>
          <h1>Message Sent : {message}</h1>
        </div>
      )}
      {isMessageSent && !localStorage.getItem('userId') && (
        <div>
          <h2>
            Create your own link to send messages to your friends{' '}
            <a href="/">here</a>
          </h2>
        </div>
      )}
    </>
  );
};

export default MessageBox;
