import React, { useState } from 'react';
import axios from 'axios';
const SignUp = () => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const createUser = async () => {
    if (name.length < 3) {
      alert('Name should be atleast 3 characters long');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/createUser',
        { name }
      );
      if (response.status === 200) {
        localStorage.setItem('userId', response.data.userId);
        setLink(`http://localhost:3000/sendMessage/${response.data.userId}`);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <>
      {!link && (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={createUser}>Create Link</button>
        </div>
      )}
      {link && (
        <div>
          <h1>Share this link with your friends</h1>
          <input type="text" value={link} readOnly />
        </div>
      )}
    </>
  );
};

export default SignUp;
