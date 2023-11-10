import { Outlet, NavLink } from "react-router-dom";



export default function MainLayout(){

    return(
        <div>
            <header>
                <nav>
                    <ul>
                        <li><NavLink to="all">All Polls</NavLink></li>
                        <li><NavLink to="one">Query One Poll</NavLink></li>
                        <li><NavLink to="new">Create Poll</NavLink></li>
                        <li><NavLink to="my-polls">My Polls</NavLink></li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )

}