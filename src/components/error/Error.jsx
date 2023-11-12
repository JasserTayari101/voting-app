import classes from './error.module.css'

export default function Error(props){
    return(
        <span className={classes.error}>
            -{props.children}-
        </span>
    )
}