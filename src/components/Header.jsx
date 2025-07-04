import React from 'react'
import {motion} from 'framer-motion'

function Header() {
  return (
    <div className='flex '><motion.header 
    whileHover={{
        scale:1.01,
        z:10,
        y:-5,
        transition :{duration:0.125},
    }}
    className="my-2 top-2 w-full bg-black shadow-md rounded-2xl z-50">
    <div className="flex justify-center items-center h-20">
      <h1 className="text-3xl font-bold text-blue-600">CricWeb</h1>
    </div>
  </motion.header></div>
  )
}

export default Header