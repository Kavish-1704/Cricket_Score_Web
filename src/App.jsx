import { useCallback, useEffect, useState } from 'react'

import './App.css'

import Header from './components/Header'

import Card from './components/Card'
import {motion} from 'framer-motion'
import { useRef } from 'react'
import Schedule from './components/Schedule'
import SecondaryHeader from './components/SecondaryHeader'


function App() {
  const scrollRef = useRef(null);
  const scrollReftwo = useRef(null)
  const [data,setData] = useState([])
  const [loading, setLoader] = useState(true)
  const [error, setError] = useState(false)
  const API_KEY = "53a845cd-7c86-4ca5-8d95-239e417648f9"
  const API_URL ='https://api.cricapi.com/v1/currentMatches?apikey=53a845cd-7c86-4ca5-8d95-239e417648f9&offset=0'
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -725, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 725, behavior: 'smooth' });
    
  };
  const scrollLefttwo = () => {
    scrollReftwo.current?.scrollBy({ left: -500, behavior: 'smooth' });
  };

  const scrollRighttwo = () => {
    scrollReftwo.current?.scrollBy({ left: 500, behavior: 'smooth' });
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
      } 
    }
    finally{
      setLoader(false)
    }
  },[])

useEffect(() =>{
  fetchData()
  const interval = setInterval(fetchData,3000000)
  return () => clearInterval(interval)
}, [fetchData])
const url = 'https://cricket-api-free-data.p.rapidapi.com/cricket-schedule';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '136cdada64mshea0cc013cf8ae5cp14729djsn259fc038183c',
		'x-rapidapi-host': 'cricket-api-free-data.p.rapidapi.com'
	}
};
const [apiData, setApiData] = useState(null);
const [matches, setMatches] = useState([]);


useEffect(() => {
  const fetchMatches = async () => {
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      
      // Log the response to understand its structure
      console.log("API Response:", data);
      setApiData(data); // Optional: keep this if you want the full response

      const extracted = [];

      const search = (obj) => {
        if (Array.isArray(obj)) obj.forEach(search);
        else if (typeof obj === "object" && obj !== null) {
          if ("matchTitle" in obj) {
            extracted.push({
              title: obj.matchTitle,
              format: obj.matchFormat,
              venue: obj.venue,
              start: obj.startDate,
              date: obj.date
            });
          }
          for (let key in obj) search(obj[key]);
        }
      };

      search(data);
      setMatches(extracted);
      console.log(extracted[0]?.title);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally{
      setLoader(false)
    }
  };

  fetchMatches();
}, []);

  return ( 
    <div className=' bg-cover bg-center ' style={{ backgroundImage: "url('/logos_cricket/Lords_cricket.webp"}}>
      <Header />
      <div className="relative px-4 mt-4">
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white px-3 py-1 rounded-full shadow-md"
        >
          ←
        </motion.button>

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

        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white px-3 py-1 rounded-full shadow-md"
        >
          →
        </motion.button>
      </div>
      <SecondaryHeader />
      <div className='relative'>
      <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={scrollLefttwo}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white px-3 py-1 rounded-full shadow-md"
        >
          ←
        </motion.button>
      <motion.div
          ref={scrollReftwo}
          className="flex overflow-x-auto gap-6 px-4 py-6 scrollbar-hide whitespace-nowrap"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-flow-col auto-cols-max grid-rows-2 gap-6">
          {(loading ? Array.from({ length: 4 }) : matches).map((match, index) => (
  <motion.div
    key={index}
    className="inline-block"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
  >

    {!loading && match ? (
      <Schedule match={match} />
    ) : (
      <div className="bg-gray-800 w-[300px] h-[200px] rounded-xl animate-pulse m-5" />
    )}
  </motion.div>
))}
</div>
        </motion.div>







        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={scrollRighttwo}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white px-3 py-1 rounded-full shadow-md"
        >
          →
        </motion.button>
    </div>
    </div>
  )
}

export default App