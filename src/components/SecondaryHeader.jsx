import React from 'react'
import {motion} from 'framer-motion'
function SecondaryHeader() {
  return (
    <div className='flex '><motion.div 
    whileHover={{
        scale:1.01,
        z:10,
        y:-5,
        transition: { type: 'spring', stiffness: 300 , duration:0.125}
    }}
    className="p-2 top-2 w-400 bg-black shadow-md rounded-2xl z-50 overflow-hidden ">
    <div className="flex justify-center items-center h-20 flex-wrap">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-gray-300 font-bold">Upcoming matches</h1>
    </div>
  </motion.div></div>
  )
}

export default SecondaryHeader