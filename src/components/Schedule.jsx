import React from 'react'
import {motion } from 'framer-motion'
function Schedule({match}) {
    
  return (
    <motion.div
    whileHover={{
        scale:1.01,
        z:10,
        y:-5,
        transition: { duration:0.125}
    }} className="bg-gray-900 text-white w-[510px] min-h-[200px] rounded-xl shadow-lg p-4 flex flex-col justify-between m-5">
  <div className="text-lg font-bold mb-2">{match.title}</div>
  <div className="text-sm text-gray-300 mb-1">{match.format}</div>
  <div className='flex justify-between items-center'>
  <div className="text-sm text-gray-400 mb-1"> {match.date}</div>
  <div className="text-sm text-gray-400 mb-1">{match.start}</div>
  </div>
  <div className="text-sm text-gray-400">Venue : {match.venue}</div>
</motion.div>
  )
}

export default Schedule