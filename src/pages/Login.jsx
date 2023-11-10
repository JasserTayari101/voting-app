import { useRef } from 'react'

import axios from 'axios';

import classes from './login.module.css'


async function loginUser(credentials){
    try{
        const res = await axios.post('/api/auth/login', JSON.stringify(credentials))
        return res.data.token
    }catch(err){
        console.log(err)
    }
}



export default function Login({setToken}){
    const usernameRef = useRef();
    const passwordRef = useRef();




    const submitHandler = async (e)=>{
        e.preventDefault()
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        const token = await loginUser({username, password})

        setToken(token)

    }

    return(
    <div className={classes.loginwrapper}>
        <form>
        <label>
            <p>Username</p>
            <input type="text" ref={usernameRef} />
        </label>
        
        <label>
            <p>Password</p>
            <input type="password" ref={passwordRef} />
        </label>
      
      <div>
        <button type="submit" onSubmit={submitHandler}>Submit</button>
      </div>
        </form>
    </div>
    )
}