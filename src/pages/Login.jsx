import { useRef, useState } from 'react'

import axios from 'axios';

import classes from './login.module.css'





function SignIn({setToken, onChange}){
    const [error, setError] = useState(null)

    const usernameRef = useRef();
    const passwordRef = useRef();
    
    
    
    async function loginUser(credentials){
        setError(null)
        try{
            const res = await axios.post('/api/auth/login',credentials,{
                validateStatus: status=>{
                    return status<500
                }
            })
            if(res.data?.error){
                setError(res.data.error)
                return 1;
            }
            return res.data.token
        }catch(err){
            console.log(err)
        }
    }

    const submitHandler = async (e)=>{
        e.preventDefault()
        
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        const token = await loginUser({username, password})

        if(token != 1)
            setToken(token)

    }



    return(
    <div className={classes.loginwrapper}>
        <form onSubmit={submitHandler}>
            <label>
                <p>Username</p>
                <input type="text" ref={usernameRef} />
            </label>
            
            <label>
                <p>Password</p>
                <input type="password" ref={passwordRef} />
            </label>
        
        <div>
            <button type="submit">Submit</button>
        </div>
        </form>

        {error? <h3>{error}</h3> : ''}

        <button onClick={()=>onChange('register')}>No account? Register Instead</button>
    </div>
    )
}

function Register({setToken, onChange}){
    const [error, setError] = useState(null)

    const usernameRef = useRef();
    const passwordRef = useRef();
    
    
    
    async function registerUser(credentials){
        setError(null)
        try{
            const res = await axios.post('/api/auth/register',credentials,{
                validateStatus: status=>{
                    return status<500
                }
            })
            if(res.data?.error){
                setError(res.data.error)
                return 1;
            }
            return res.data.token
        }catch(err){
            console.log(err)
        }
    }

    const submitHandler = async (e)=>{
        e.preventDefault()
        
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        const token = await registerUser({username, password})

        if(token != 1)
            setToken(token)

    }



    return(
    <div className={classes.loginwrapper}>
        <form onSubmit={submitHandler}>
            <label>
                <p>Username</p>
                <input type="text" ref={usernameRef} />
            </label>
            
            <label>
                <p>Password</p>
                <input type="password" ref={passwordRef} />
            </label>
        
        <div>
            <button type="submit">Submit</button>
        </div>
        </form>

        {error? <h3>{error}</h3> : ''}

        <button onClick={()=>onChange('signin')}>Sign-In instead</button>
    </div>
    )

}


export default function Login({setToken}){
    const [loginType, setLoginType] = useState('signin')

    const loginTypeChangeHandler = type=>{
        setLoginType(type)
    }

    if(loginType == 'signin')    return <SignIn setToken={setToken} onChange={loginTypeChangeHandler} />

    else if(loginType =='register') return <Register setToken={setToken} onChange={loginTypeChangeHandler} />
}