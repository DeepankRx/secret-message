import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../../UI/Card';
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
          `http://localhost:5001/api/user/getUser/${userId}`
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
        `http://localhost:5001/api/user/sendMessage/${userId}`,
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
        <Card>
          <div className='w-[90%] m-auto md:w-1/2 translate-y-[-200px] md:translate-y-[-100px] shadow-2xl   flex flex-col space-y-4 border-2 p-20 px-8 rounded-2xl bg-white '> 
          <h1 className='text-base font-semibold'>Send Messages To {user?.name}</h1>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            className='  p-4 rounded-md bg-white ring-2 ring-pink-500 '

            />
            <button
              onClick={() => {
                sendMessage();
              }}
              className=' bg-[rgb(64,221,255)] text-white rounded-md font-semibold p-2  shadow-md  shadow-blue-400 '
            >
              Send
            </button>
          </div>
        </Card>
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
