import { useState, useEffect } from "react";

import axios from "axios";

import Poll from "./Poll";


export default function MyPolls(props){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [polls, setPolls] = useState([])



    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                setIsLoading(true)
                const res = await axios.get("/api/poll/my-polls")
                
                console.log(res.data.polls);
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
                <li key={poll._id}>
                    <Poll poll={poll} />
                </li>
            ))}
        </ul>
        }
        </div>
    )

}