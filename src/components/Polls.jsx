import { useState, useEffect } from "react";

import axios from "axios";


import { Link } from "react-router-dom";

import classes from './polls.module.css'

export default function Polls(props){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [polls, setPolls] = useState([])



    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                setIsLoading(true)
                const res = await axios.get("/api/poll")
                
                setPolls(res.data.polls)
                setError(null)
            }catch(err){
                setError(err)
            }finally{
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])


    return(
        <div>
        {isLoading && <div> Loading... </div>}
        {error && <div> {error} </div>}
        {!isLoading && !error && polls.length == 0? <h2>No Polls</h2> : 

        <ul className={classes.polllist}>
            {polls.map(poll=>(
                <li className={classes.polllink} key={poll._id}>
                    <Link  to={`/poll/${poll._id}`}> {poll.question} </Link>
                </li>
            ))}
        </ul>
        }
        </div>
    )

}