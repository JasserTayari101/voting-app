import classes from './poll.module.css'
import { useParams } from 'react-router-dom'

export default function Poll(props){
    const {id} = useParams()

    return(
        <div>
            <h1> Poll Id: {id} </h1>
            {/*<h2> {props.poll.question} </h2>
            <form>
                {props.poll.options.map(({option, votes, _id}, index)=>(
                    <div>
                        <label htmlFor="answer" key={_id}> {option} </label>
                            <input type="radio" name="optionIndex" id={_id} value={index}/>
                        <span> {votes} people voted for this </span>
                    </div>
                ))}

                <button type="submit"> Submit Answer </button>
                </form> */}
        </div>
    )
}