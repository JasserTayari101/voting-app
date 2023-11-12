import React from 'react'

import {useState, useEffect} from 'react'

import classes from './navbar.module.css'

import { NavLink } from 'react-router-dom'

import MainBtn from '../main_button/MainBtn'

import useToken from '../../../hooks/useToken'

function UserEdit(props){
    const {setToken} = useToken()
    const logoutHandler = ()=>{
        setToken(null)
    }

    return(
        <MainBtn onClick={logoutHandler} className={classes.logoutbtn}>Logout</MainBtn>
    )
}


function UserProfile(props){
    const [isClicked, setIsClicked] = useState(false)

    return(
        <li className={classes.userprofile} onClick={()=>setIsClicked(!isClicked)}>
            <div>
                <span> {props.username} </span>
                <img src={props.profilePic} />
            </div>
            {isClicked && <UserEdit /> }
        </li>
    )
}


export default function Navbar(props){
    const [userData, setUserData] = useState(null)

    useEffect(()=>{
        const username = JSON.parse(localStorage.getItem('username') )
        const profilePic = JSON.parse(localStorage.getItem('profilePic') )

        if(username && profilePic){
            setUserData({username, profilePic})
        }

    }, [])

    return(
        <nav className={classes.navbar}>
            <ul>
                {props.links.map(link=>(
                    <li key={link.path}>
                        {link.icon}
                        <NavLink to={link.path}>{link.name}</NavLink>
                    </li>
                ))}                

                { userData && <UserProfile {...userData} />}
            </ul>
        </nav>
    )
}

