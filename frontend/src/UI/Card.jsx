import React from 'react'
import doodle from '../Images/doodle.jpg'

const Card = ({children}) => {
  return (
    <div className='h-[100vh]  flex flex-col'>
    <div className='w-full h-[70vh] overflow-hidden'>
    <img src={doodle}/>
    </div>
    {children}
    </div>
  )
}

export default Card