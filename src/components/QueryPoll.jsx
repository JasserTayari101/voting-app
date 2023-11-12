import {  useRef } from "react"

import { useNavigate } from "react-router-dom"

export default function QueryPoll(){
    const navigate = useNavigate()

    const pollIdRef = useRef()



    async function submitHandler(e) {
        e.preventDefault()


        navigate(`/poll/${pollIdRef.current.value}`)
    
    }


    return(
        <div>
            <form onSubmit={submitHandler}>
                <label for="q">Poll Id</label>
                <input ref={pollIdRef} type="text" id="q" name="q" minLength={20} maxLength={30}/>

                <input type="submit" value="Query Poll" />
            </form>
        </div>
    )
}