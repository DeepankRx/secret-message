import React, { useState } from 'react';
import axios from 'axios';
import Card from '../../UI/Card';
const SignUp = () => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [clicked,setClicked]=useState(false);
  const createUser = async () => {
    if (name.length < 3) {
      alert('Name should be atleast 3 characters long');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:5001/api/user/createUser',
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


  function copyFunction() {
  
  
    navigator.clipboard.writeText(link);
    
  }
  return (
    <Card>
      {!link && (

          <div className='w-[90%] m-auto md:w-1/2 translate-y-[-200px] md:translate-y-[-100px] shadow-2xl   flex flex-col space-y-4 border-2 p-20 px-8 rounded-2xl bg-white '> 
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='  p-4 rounded-md bg-white ring-2 ring-pink-500 '
          />
          <button className=' bg-[rgb(64,221,255)] text-white rounded-md font-semibold p-2  shadow-md  shadow-blue-400 ' onClick={createUser}>Create Link</button>
          </div>
      )}
      {link && (
        <div className=' items-center w-[90%] m-auto md:w-1/2 translate-y-[-200px] md:translate-y-[-100px] shadow-2xl   flex flex-col space-y-4 border-2 p-20 px-8 rounded-2xl bg-white '> 
          <h1 className='text-base font-bold '>Share this link with your friends 😎</h1>
          <div className='flex'>
          <h1 className='text-base '>{link}</h1>
          <div className=' w-20 hover:cursor-pointer bg-purple-400 text-white text-center ml-2' onClick={()=>{copyFunction();setClicked(true);}}>
            {clicked ? 'Copied' : 'Copy'}
          </div>
          </div>


        </div>
      )}
    </Card>
  );
};

export default SignUp;
