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

        
        return token // because when we first load the app, we don't have a token yet
    }

    const [token, setToken] = useState(getToken())


    const saveToken = (token)=>{
        localStorage.setItem('token', JSON.stringify(token))
        setToken(token)
    }


    return {
        setToken: saveToken,
        token: token
    }


}