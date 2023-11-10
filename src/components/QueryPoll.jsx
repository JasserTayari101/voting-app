



export default function QueryPoll(){
    return(
        <form>
            <label for="q">Poll Id</label>
            <input type="text" id="q" name="q" />

            <input type="submit" value="Query Poll" />
        </form>
    )
}