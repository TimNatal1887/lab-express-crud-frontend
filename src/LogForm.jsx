import React from 'react'

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function LogForm(){
  const [log, setLog] = useState({
    captainName:"",
    title:"",
    post:"",
    mistakesWereMadeToday:false,
    daysSinceLastCrisis:0
  });

  const navigate = useNavigate()

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setLog({ ...log, [e.target.id]: value });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    
    const daysSinceLastCrisis = Number(log.daysSinceLastCrisis)
    log.daysSinceLastCrisis = daysSinceLastCrisis

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log),
      };

      fetch("http://localhost:3333/api/logs", options)
        .then((res) => res.json())
        .then((data) => {
            const newLogId = data.logs[data.logs.length - 1].id
            navigate(`/${newLogId}`)
        })
  }
  
  return (
    <div>
      <h1>Log Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            onChange={handleChange}
            type="text"
            id="captainName"
            name="name"
            value={log.captainName}
          />
        </label>
        <label htmlFor="title">
          Title:
          <input
            onChange={handleChange}
            type="text"
            id="title"
            name="title"
            value={log.title}
          />
        </label>
        <label htmlFor="post">
          Post:
          <input
            onChange={handleChange}
            type="text"
            id="post"
            name="category"
            value={log.post}
          />
        </label>
        <label>
          Mistakes Were Made Today:
          <input
            type="checkbox"
            id="mistakesWereMadeToday"
            name="mistakesWereMadeToday"
            checked={log.mistakesWereMadeToday}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="crisisCount">
          Days Since Last Crisis:
          <input
            onChange={handleChange}
            type="number"
            id="daysSinceLastCrisis"
            name="crisisCount"
            value={log.daysSinceLastCrisis}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

