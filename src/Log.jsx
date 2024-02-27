import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Log(){
    const [log, setLog] = useState({})
    const { id } = useParams()

    useEffect(()=>{
        fetch(`http://localhost:3333/api/logs/${id}`)
        .then((res)=>res.json())
        .then((data)=>setLog(data.log))
    },[id])

    if(Object.keys(log).length === 0) return null

  return (
    <div>
        <h3>Log {log.id} </h3>
        <h4> Captain {log.captainName} </h4>
        <p>Post: {log.post}</p>
        <p>{log.mistakesWereMadeToday ? "Mistakes were made today...": "Mistakes were NOT made today!"}</p>
        <p>Days since last crisis... : {log.daysSinceLastCrisis}</p>
        <Link to={`/${id}/edit`}>
        <button> Edit Log</button>
        </Link>
    </div>
  )
}
