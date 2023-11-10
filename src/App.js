import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
//import ErrorElement from './layouts/ErrorElement';
import Polls from './components/Polls';
import QueryPoll from './components/QueryPoll';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    //errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Polls />,
      },      {
        path: 'all',
        element: <Polls />,
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
