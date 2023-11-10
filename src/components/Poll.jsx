


export default function Poll(){
    return(
        <div>
            <h2>Messi vs Ronaldo</h2>
            <form>
                <label for="answer-0">Messi</label>
                    <input type="radio" name="answer-0" id="answer-0" value="messi"/>
                
                <label for="answer-1">Ronaldo</label>
                    <input type="radio" name="answer-1" id="answer-1" />
                
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}