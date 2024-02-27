import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"


export default function Logs(){
    const [logs, setLogs] = useState([])

    function handleDelete(id) {
        const options = {
          method: "DELETE",
        };
    
        fetch(`http://localhost:3333/api/logs/${id}`, options)
          .then((res) => res.json())
          .then((data) => setLogs(data.logs));
    }

    useEffect(()=>{
        fetch("http://localhost:3333/api/logs")
        .then((res)=>res.json())
        .then((data)=> setLogs(data.logs))
    },[])

    return(
        <div>
            <h1>Logs Section </h1>
            <Link to="/create">
                <button> Create a Log</button>
            </Link>
            {logs.map(({id,captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis})=> (
                <div key={id}>
                    <h2>Title: {title}</h2>
                    <h4>Captain {captainName}</h4>
                    <p>Post: {post}</p>
                    <p>{mistakesWereMadeToday ? "Mistakes were made today":"Mistakes were NOT made today"}</p>
                    <p>Days Since Last Crisis: {daysSinceLastCrisis}</p>
                    <Link to={`/${id}`}>
                    <button>More Details</button>
                    </Link>
                    <button onClick={()=>handleDelete(id)}>Delete Log</button>
                </div>
            ))}
        </div>
    )
}