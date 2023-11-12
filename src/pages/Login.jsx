import { useRef, useState } from 'react'

import axios from 'axios';

import classes from './login.module.css'


import Card from '../components/UI/card/Card';
import MainBtn from '../components/UI/main_button/MainBtn';
import Error from '../components/error/Error';


import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function SignIn({setToken, onChange}){
    const [error, setError] = useState(null)
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    
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
    <Card className={classes.loginwrapper}>
        <h2>Sign In</h2>
        <form onSubmit={submitHandler}>
            <label>
                <span>Username</span>
                <input type="text" ref={usernameRef} placeholder='Username' />
            </label>
            
            <label>
                <span>Password</span>
                <div>
                    <input type={passwordIsVisible? 'text': 'password'} ref={passwordRef} placeholder='Password'/>
                    {passwordIsVisible? <VisibilityOffIcon style={{verticalAlign: 'bottom'}} onClick={()=>{setPasswordIsVisible(false)}}/> : <VisibilityIcon style={{verticalAlign: 'bottom'}} onClick={()=>{setPasswordIsVisible(true)}}/>}
                </div>
            </label>
        
        <div>
            <MainBtn className={classes.submitbtn} >Submit</MainBtn>
        </div>
        </form>

        {error? <Error>{error}</Error> : ''}

        <MainBtn className={classes.loginbtn} onClick={()=>onChange('register')}>No account? Register Instead</MainBtn>
    </Card>
    )
}

function Register({setToken, onChange}){
    const [error, setError] = useState(null)
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)

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
    <Card className={classes.loginwrapper}>
        <h2>Sign Up</h2>
        <form onSubmit={submitHandler}>
            <label>
                <span>Username</span>
                <input type="text" ref={usernameRef} placeholder='Username'/>
            </label>
            
            <label>
                <span>Password</span>
                <div>
                    <input type={passwordIsVisible? 'text': 'password'} ref={passwordRef} placeholder='Password'/>
                    {passwordIsVisible? <VisibilityOffIcon style={{verticalAlign: 'bottom'}} onClick={()=>{setPasswordIsVisible(false)}}/> : <VisibilityIcon style={{verticalAlign: 'bottom'}} onClick={()=>{setPasswordIsVisible(true)}}/>}
                </div>
            </label>
        
        <div>
            <MainBtn className={classes.submitbtn}>Submit</MainBtn>
        </div>
        </form>

        {error? <Error>{error}</Error> : ''}

        <MainBtn className={classes.loginbtn} onClick={()=>onChange('signin')}>Sign-In instead</MainBtn>
    </Card>
    )

}


export default function Login({setToken}){
    const [loginType, setLoginType] = useState('signin')

    const loginTypeChangeHandler = type=>{
        setLoginType(type)
    }

    if(loginType == 'signin')    return <div className={classes.loginpage}><SignIn setToken={setToken} onChange={loginTypeChangeHandler} /> </div>

    else if(loginType =='register') return <div className={classes.loginpage}><Register setToken={setToken} onChange={loginTypeChangeHandler} /> </div>
}