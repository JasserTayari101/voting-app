import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
//import ErrorElement from './layouts/ErrorElement';
import Polls from './components/Polls';
import QueryPoll from './components/QueryPoll';
import MyPolls from './components/MyPolls';
import Poll from './components/Poll';
import NewPoll from './components/NewPoll';

import axios from 'axios';

import useToken from './hooks/useToken';  
import { useEffect, useState } from 'react';
   

//  used to send a request to the api to check for token validity
async function validateToken(token){
    const res = await axios.get('/api/auth/validatetoken', {
    headers: {
        Authorization: `Bearer ${token}`
    },
    validateStatus: (status) => {
        return status < 500;
    },
    });

    return res.data?.message == "valid token"
}



function App() {
  const { token, setToken, getToken} = useToken();
  const [isValidating, setIsValidating] = useState(true)

  //  check token validity every x seconds
  useEffect(() => {
    const callValidate = async () => {
      const tokenIsValid = await validateToken(getToken());
      if (!tokenIsValid) {
        localStorage.removeItem('token');
        setToken(null);
      }
      setIsValidating(false);
    };

    // Initial validation
    callValidate();

    // Set up interval for repeated validation every 5 minutes
    const intervalId = setInterval(() => {
      callValidate();
    }, 5000); 

    // Clean up interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [token]);



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
        },
        {
          path: 'poll/new',
          element: <NewPoll />
        }
      ]
    }
  ])



  if(isValidating) return <h1>Validating</h1>

  if(token == null) return <Login setToken={setToken} />

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
