import React from "react"

import { useState, useRef } from "react"
import useToken from "../hooks/useToken"
import { useNavigate } from "react-router-dom"

import axios from "axios"


function PollOption(props){
    const [inputValue, setInputValue] = useState('')

    const onValueChange = e=>{
        setInputValue(e.target.value)
    }

    return(
        <div>
            <label htmlFor={props.id}> {props.name} </label>
                <input type="text" value={inputValue} placeholder={props.name} onChange={onValueChange} />
        </div>
    )
}


export default function NewPoll(){
    const [options, setOptions] = useState([])  //hold the IDs and names of the options
    const [selectedPrivacy, setSelectedPrivacy] = useState('private')   //hold the selected privacy radio

    const navigate = useNavigate()

    const [error, setError] = useState(null)


    const {token} = useToken()
    
    const questionRef = useRef()
    const optionsRef = useRef()
    

    const addOptionHandler = e=>{
        e.preventDefault()
        
        setOptions((prevOptions)=>[...prevOptions, {id: prevOptions.length, name: `Option ${prevOptions.length + 1}`}])
    }


    const handleSelectChange = e=>{
        setSelectedPrivacy(e.target.value)
    }
    


    const submitHandler = async (e)=>{
        e.preventDefault()

        //collect DOM data
        const question = questionRef.current.value
        
        let options = []
        Array.from(optionsRef.current.children).forEach(option=>{
            options.push(option.children[1].value)
        })

        //send request
        try{
            const res = await axios.post('/api/poll/new', {question, options, privacy: selectedPrivacy}, {
                headers:{
                    Authorization: `Bearer ${token}`
                
                },
                validateStatus: status=>{
                    return status<500
                }
            })
            
            if(res.data?.error)
                setError(res.data.error)
            else{
                const pollId = res.data.pollId
                navigate(`/poll/${pollId}`)
            }

        }catch(err){
            console.log(err)
        }


    }


    return(
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="question">Question Title</label>
                    <input ref={questionRef} type="text" id="question" minLength="5" />
                
                
                <div id="options" ref={optionsRef}>
                    {options.map(option=>(
                        <PollOption id={option.id} name={option.name} />
                    ))}

                </div>
                    <button onClick={addOptionHandler}>Add Option</button>

                <label htmlFor="visiblity">Poll Visibility</label>
                    <div id="visibility">
                        <label htmlFor="public">Public</label>
                            <input type="radio" name="visibility" value="public" id="public" checked={selectedPrivacy == 'public'} onChange={handleSelectChange} />

                        <label htmlFor="private">Private</label> 
                            <input type="radio" name="visibility" value="private" id="private" checked={selectedPrivacy == 'private'} onChange={handleSelectChange} />
                    </div>
                <button type="submit">Submit</button>
            </form>
            {error && <div> {error} </div>}
        </div>
    )

}