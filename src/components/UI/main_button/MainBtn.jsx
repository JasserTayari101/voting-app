import classes from './mainbtn.module.css'


export default function MainBtn(props){
    return <button className={`${classes.mainbtn} ${props?.className}`} onClick={props.onClick}>{props.children}</button>    
}