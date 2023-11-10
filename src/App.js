import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
//import ErrorElement from './layouts/ErrorElement';
import Poll from './components/Poll';
import QueryPoll from './components/QueryPoll';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    //errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Poll />,
      },      {
        path: 'all',
        element: <Poll />,
      },
      {
        path: 'one',
        element: <QueryPoll />,
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
