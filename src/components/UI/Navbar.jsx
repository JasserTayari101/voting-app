import React from 'react'

import classes from './navbar.module.css'

import { NavLink } from 'react-router-dom'


export default function Navbar(props){
    return(
        <nav className={classes.navbar}>
            <ul>
                {props.links.map(link=>(
                    <li key={link.path}>
                        {link.icon}
                        <NavLink to={link.path}>{link.name}</NavLink>
                    </li>
                ))}                
            </ul>
        </nav>
    )
}

