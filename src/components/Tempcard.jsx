import React from 'react'
import {motion} from 'framer-motion'
function Tempcard() {
  return (
     
    <motion.div 
    whileHover={{
        scale:1.01,
        z:10,
        y:-5,
        transition :{duration:0.125},
    }}
    className="flex flex-wrap gap-6 p-6 justify-center my-19">
    <div className="bg-black text-white rounded-2xl shadow-lg p-4 w-72 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">A vs B</div>
        <div className="text-sm">match type</div>
      </div>
  
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">A</div>
        <div className="text-xl font-semibold">score(overs)</div>
        
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">B</div>
        <div className="text-xl font-semibold">score(overs)</div>
        
      </div>
  
      <div className="flex justify-between text-sm">
        <div  className='text-green-500'>status</div>
        
      </div>
    </div>
  
   
  </motion.div>
  )
}

export default Tempcard