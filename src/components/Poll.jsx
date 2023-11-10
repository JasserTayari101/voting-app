import classes from './poll.module.css'


export default function Poll({poll}){
    return(
        <div>
            <h2> {poll.question} </h2>
            <form>
                {poll.options.map(({option, votes, _id}, index)=>(
                    <div>
                        <label htmlFor="answer" key={_id}> {option} </label>
                            <input type="radio" name="optionIndex" id={_id} value={index}/>
                        <span> {votes} people voted for this </span>
                    </div>
                ))}

                <button type="submit"> Submit Answer </button>
            </form>
        </div>
    )
}