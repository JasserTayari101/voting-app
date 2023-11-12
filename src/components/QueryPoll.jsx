import {  useRef } from "react"

import { useNavigate } from "react-router-dom"
import MainBtn from "./UI/main_button/MainBtn"

import classes from './querypoll.module.css'

export default function QueryPoll(){
    const navigate = useNavigate()

    const pollIdRef = useRef()



    async function submitHandler(e) {
        e.preventDefault()


        navigate(`/poll/${pollIdRef.current.value}`)
    
    }


    return(
        <div className={classes.querywrapper}>
            <form onSubmit={submitHandler}>
                <label for="q">Poll Id</label>
                <input ref={pollIdRef} type="text" id="q" name="q" minLength={20} maxLength={30}/>

                <MainBtn className={classes.querybtn}>Query Poll</MainBtn>
            </form>
        </div>
    )
}