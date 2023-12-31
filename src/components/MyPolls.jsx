import { useState, useEffect } from "react";

import axios from "axios";


import useToken from "../hooks/useToken";

import { Link } from "react-router-dom";

import classes from './polls.module.css'

export default function MyPolls(props){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [polls, setPolls] = useState([])

    const {token , setToken} = useToken();

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                setIsLoading(true)
                const res = await axios.get("http://51.20.189.38:8080/api/poll/my-polls", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                if(res.data?.error){
                    setError(res.data.error)
                    return 1;
                }

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

        <ul>
            {polls.map(poll=>(
                <li className={classes.polllist} key={poll._id}>
                    <Link className={classes.polllink} to={`/poll/${poll._id}`}> {poll.question} </Link>
                </li>
            ))}
        </ul>
        }
        </div>
    )

}