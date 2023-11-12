import classes from './poll.module.css'


import { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from 'react-router-dom'

import useToken from '../hooks/useToken';
import MainBtn from './UI/main_button/MainBtn';

import Error from './error/Error'

export default function Poll(props){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [poll, setPoll] = useState(null)
    const [hasSubmit, setHasSubmit] = useState(false)


    const [selectedIndex,setSelectedIndex] = useState(0)

    const {id} = useParams()
    
    const {token} = useToken()

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                setIsLoading(true)
                const res = await axios.get(`/api/poll/${id}`)
                if(res.data?.error){
                    setError(res.data.error)
                    return 1;
                }
                setPoll(res.data.poll)
                setError(null)
            }catch(err){
                setError(err)
            }finally{
                setIsLoading(false)
            }
        }
        fetchData()
    }, [hasSubmit])


    
    const handleSelectChange = (e)=>{
        console.log(e.target.value)
        setSelectedIndex(e.target.value)
    }

    const submitHandler = async (e)=>{
        e.preventDefault()

        try{
            const res = await axios.put(`/api/poll/${id}/vote`,{optionIndex: Number(selectedIndex)}, {
                headers:{
                    Authorization: `Bearer ${token}`
                },
                validateStatus: status=>{
                    return status<500
                }
            })

            if(res.data?.error)
                setError(res.data.error)
            else
                setHasSubmit(true)    
        }catch(err){
            console.log(err)
        }

    }

    return(
    <div>
        
        {isLoading && <div> Loading... </div>}
        {!isLoading && poll == null? <h2>No Polls</h2> : 
        <div>        
            <h2> {poll?.question} </h2>
            <form onSubmit={submitHandler}>
                {poll?.options.map(({option, votes, _id}, index)=>(
                    <div>
                            <input type="radio" name="optionIndex" id={_id} value={index} checked={index == selectedIndex} onChange={handleSelectChange}/>
                        <label htmlFor="answer" key={_id}> {option} </label>
                        <span>( {votes} people voted for this )</span>
                    </div>
                ))}

                <MainBtn> Submit Answer </MainBtn>
                </form>
        </div>}
        {error && <Error> {error} </Error>}
    </div>
    
    )
}