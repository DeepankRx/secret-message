import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignUp from '../SignUp/SignUp';
import Card from '../../UI/Card';
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
        `http://localhost:5001/api/user/getMessage/${userId}`
      );
      setMessages(response.data?.messages);
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Card>
    <div className='w-[90%] m-auto md:w-1/2 mt-4  translate-y-[-100px]  shadow-xl  flex flex-col space-y-4 border-2 px-2  md:px-8 rounded-2xl bg-white p-4'>
    <div className='text-2xl font-semibold p-2'>My Messages</div>
      {
        //if userId is not present in local storage then show signup component
        !userId && <SignUp />}
        {userId && (
          <div className=" overflow-y-auto">
            <div className="space-y-2 h-[400px] mr-1 px-4 ">
              {messages.map((message) => (
                <div
                  className="px-2 py-4 text-lg bg-purple-500 text-white rounded-tl-none  rounded-xl "
                  key={message._id}
                >
                  <h3
                  //make first letter of message uppercase
                  >{`${message.message[0].toUpperCase()}${message.message.slice(
                    1
                  )}`}</h3>

                  <p className="text-sm text-gray-300 text-right">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MyMessages;
