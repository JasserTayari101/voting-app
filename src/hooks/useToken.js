/*
    hook to:
        -get token from localstorage and set it to a state on 'App'
        -set token to localstorage  when user fill Login component
*/
import { useState } from "react";



export default function useToken(){

    const getToken = ()=> {
        const tokenString = localStorage.getItem('token')
        const token = JSON.parse(tokenString)

        return token
    }
    
    const [token, setToken] = useState(getToken())

    const saveToken = (token)=>{
        localStorage.setItem('token', JSON.stringify(token?token.token: null))
        localStorage.setItem('username', JSON.stringify(token? token.username: null))
        localStorage.setItem('profilePic', JSON.stringify(token? token.profilePic: null))
        setToken(token? token.token : null)
    }
    

    return {
        setToken: saveToken,
        token: token,
        getToken
    }
}