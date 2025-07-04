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
    className="my-2 top-2 w-full bg-black shadow-md rounded-2xl z-50 p-0.1 sm:p-2 lg:p-2 md:p-2 xl:p-2 ">
    <div className="flex justify-center items-center h-20">
      <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl text-gray-300 font-bold
">ReactToCricket</h1>
    </div>
  </motion.header></div>
  )
}

export default Header