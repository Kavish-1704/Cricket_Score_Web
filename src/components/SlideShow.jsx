import React from 'react'
import { useState,useEffect } from 'react'
import {motion, AnimatePresence, easeInOut} from 'framer-motion'
function SlideShow() {
    const images =[
    "/logos_cricket/Image1.png",
    "/logos_cricket/Image2.png",
    "/logos_cricket/Image3.png",
    "/logos_cricket/Image4.png",
    "/logos_cricket/Image5.png",
    "/logos_cricket/Image6.png",
    "/logos_cricket/Image7.png",
    "/logos_cricket/Image8.png",
    "/logos_cricket/Image9.png",
    "/logos_cricket/Image10.png",

    ]
    const [index,setIndex] = useState(0)
    useEffect(()=>{
        const timer = setInterval(()=>{
            setIndex((prev) => (prev+1) % images.length)
        },5000)
        return () => clearInterval(timer)
    },[])
  return (
    
    <div className="absolute top-0 left-0 w-full h-screen bg-white overflow-hidden -z-10">
  <motion.img
   key = {images[index]}  
  src={images[index]}
  initial={{opacity:0}}
  animate={{opacity:1}}
  exit={{opacity:0}}
  transition={{duration:4,
ease:'easeInOut'}}
    alt="slideshow"
    className="w-full h-full object-contain opacity-40"
  />
</div>
  ) 
}

export default SlideShow