import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SlideShow from './components/SlideShow'
import Header from './components/header'
import Tempcard from './components/Tempcard'
import Card from './components/Card'
import {motion} from 'framer-motion'
import { useRef } from 'react'


function App() {
  const scrollRef = useRef(null);

  const [data,setData] = useState([])
  const [loading, setLoader] = useState(true)
  const [error, setError] = useState(false)
  const API_KEY = "53a845cd-7c86-4ca5-8d95-239e417648f9"
  const API_URL ='https://api.cricapi.com/v1/currentMatches?apikey=53a845cd-7c86-4ca5-8d95-239e417648f9&offset=0'
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };
  const fetchData = useCallback(async () =>{
    setLoader(true)
    setError(null)

    try {
      const response = await fetch(API_URL)
      if (!response.ok){
      throw new Error(`Network response not okay(Status : ${response.status})`)
      }
      const json = await response.json()

      if(json.status === "failure" || !json.data){
        throw new Error(json.reason ||"API returned an error or empty data ")
      }
      setData(Array.isArray(json.data) ? json.data :[])
    } catch (error) {
      console.warn("API fetch failed ,using fallback data. Reason " , error.message)
      
      setError("Could not load live data Displaying sample matches.")
    }
    try {
      
      const dummyResponse = await fetch('/dummydata.json');
      if (!dummyResponse.ok) {
        throw new Error(`Dummy data not found or unreadable (Status: ${dummyResponse.status})`);
      }
      const dummyJson = await dummyResponse.json();
      
      setData(Array.isArray(dummyJson.data) ? dummyJson.data : dummyJson);
    } catch (dummyError) {
      console.error("Failed to load both API and dummy data: ", dummyError.message);
      setError("Failed to load any match data. Please check your connection.");
      setData([]); 
    } finally{
      setLoader(false)
    }
  },[])

useEffect(() =>{
  fetchData()
  const interval = setInterval(fetchData,30000)
  return () => clearInterval(interval)
}, [fetchData])

  return ( 
    <div className=' bg-cover bg-center min-h-screen' style={{ backgroundImage: "url('/logos_cricket/Lords_cricket.webp')"}}>
      <Header />
      <div className="relative px-4 mt-4">
        {/* Scroll Left Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white px-3 py-1 rounded-full shadow-md"
        >
          ←
        </motion.button>

        {/* Scrollable Container */}
        <motion.div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-4 py-6 scrollbar-hide whitespace-nowrap"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {(loading ? Array.from({ length: 4 }) : data).map((match, index) => (
            <motion.div
              key={index}
              className='"inline-block"'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card loading={loading} match={match} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Right Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white px-3 py-1 rounded-full shadow-md"
        >
          →
        </motion.button>
      </div>
     
    </div>
  )
}

export default App
