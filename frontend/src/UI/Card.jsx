import React from 'react'
import doodle from '../Images/doodle.jpg'

const Card = ({children}) => {
  return (
    <div className='  flex flex-col'>
    <div className='w-full  overflow-hidden'>
    <img src={doodle}/>
    </div>
    {children}
    </div>
  )
}

export default Card