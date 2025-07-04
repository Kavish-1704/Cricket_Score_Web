import React from 'react'
import {motion} from 'framer-motion'
function Card({match,loading,index}) {
  if (loading === true){
    return (<motion.div 
        whileHover={{
            scale:1.01,
            z:10,
            y:-5,
            transition :{duration:0.125},
        }}
        className="bg-black text-white rounded-2xl shadow-lg p-4 m-19 h-50 w-135 flex flex-col justify-between">
        
        <div className="flex items-end justify-center h-40">
  <motion.div
    className="w-6 h-6 rounded-full bg-gradient-to-tl bg-red-500"
    animate={{
      y: [0, -30, 0], 
    }}
    transition={{
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

            </div>
          
      </motion.div>
      )
  }
    const matchtype = match.matchType
    const team1 = match.teamInfo?.[0]?.name || "Team 1"
    const team2 = match.teamInfo?.[1]?.name || "Team 2"
    const status = match.status
    const scoresArray = Array.isArray(match.score) ? match.score : [];
    
    
    let team1displayscore = ""
    if (matchtype === "test") {
      const team1testscore = scoresArray
        .filter(item => item.inning.includes(team1))
        .map(item => `${item.r}/${item.w} (${item.o})`)
    
      team1displayscore = team1testscore.length === 2
        ? `${team1testscore[0]} & ${team1testscore[1]}`
        : `${team1testscore[0] || "0"} & 0`
    } else {
      team1displayscore = scoresArray
        .filter(item => item.inning.includes(team1))
        .map(item => `${item.r}/${item.w} (${item.o})`)
        .join(" & ")
    }
    let team2displayscore = ""
if (matchtype === "test") {
  const team2testscore = scoresArray
    .filter(item => item.inning.includes(team2))
    .map(item => `${item.r}/${item.w} (${item.o})`)

  team2displayscore = team2testscore.length === 2
    ? `${team2testscore[0]} & ${team2testscore[1]}`
    : `${team2testscore[0] || "0"} & 0`
} else {
  team2displayscore = scoresArray
    .filter(item => item.inning.includes(team2))
    .map(item => `${item.r}/${item.w} (${item.o})`)
    .join(" & ")
}
    
    

    
  return (<motion.div 
    whileHover={{
        scale:1.01,
        z:10,
        y:-5,
        transition :{duration:0.125},
    }}
    >
    <div className="bg-black text-white rounded-2xl shadow-lg p-2 h-50 w-135 m-19 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="font-bold ">{match.name}</div>
        
        <div className="text-sm p-2 text-red-500">{matchtype}</div>
      </div>
  
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">{team1}</div>
        <div className="text-xl font-semibold p-2">{team1displayscore} </div>
        
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">{team2}</div>
        <div className="text-xl font-semibold p-2">{team2displayscore}</div>
        
      </div>
  
      <div className="flex justify-between text-sm">
        <div  className='text-green-500'>{status}</div>
        
      </div>
    </div>
  
   
  </motion.div>
  )
}

export default Card