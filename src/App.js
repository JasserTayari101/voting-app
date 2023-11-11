import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
//import ErrorElement from './layouts/ErrorElement';
import Polls from './components/Polls';
import QueryPoll from './components/QueryPoll';
import MyPolls from './components/MyPolls';
import Poll from './components/Poll';

import useToken from './hooks/useToken';  


function App() {

  const { token, setToken} = useToken();

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
        },
        {
          path: 'my-polls',
          element: <MyPolls />,
        },
        {
          path: 'poll/:id',
          element: <Poll />
        }
      ]
    }
  ])

  if(!token) return <Login setToken={setToken} />

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
