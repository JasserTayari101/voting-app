import React from "react";

import { Outlet } from "react-router-dom";

import Navbar from "../components/UI/Navbar";

import PollIcon from '@mui/icons-material/Poll';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

export default function MainLayout(){
    const links = [
    {path: 'all', name: 'All Polls', icon: <PollIcon /> }, 
    {path: 'one', name: 'Query Poll', icon: <SearchIcon />}, 
    {path: 'poll/new', name: 'Create Poll', icon: <AddIcon/>}, 
    {path: 'my-polls',name:'My Polls', icon: <FolderCopyIcon/>} 
    ]
    return(
        <div>
            <header>
                <Navbar  links={links} />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )

}