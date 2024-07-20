import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import '@mantine/tiptap/styles.css'; // is working
import './index.css'
import './github.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/pages/Layout.jsx'
import Home from './components/pages/Home.jsx'
import Login from './components/pages/Login.jsx'
import { loginAction, signupAction } from './utils/actions.js'
import Edit from './components/pages/Edit.jsx'
import Profile from './components/pages/Profile.jsx'
import Signup from './components/pages/Signup.jsx'
import { editLoader, homeLoader } from './utils/loaders.js'
import { indexLoader } from './utils/loaders.js'
// routes for the application
const router = createBrowserRouter(
  [
    {
      path:'/', 
      element:<Layout/>,
      children:[
        {
          index:true, 
          loader: indexLoader
        },
        {
          path:'/edit', 
          element:<Edit/>, 
          loader:editLoader
        }, 
        {
          path: '/test', // used to test elements I'm creating
          element: <App/>
        },
        {
          path: '/profile',
          element: <Profile/>
        },
        {
          path:'/:username',
          element:<Home/>,
          loader:homeLoader
        }
      ]
    }, 
    {
      path:'/login', 
      element:<Login/>, 
      action: loginAction
    }, 
    {
      path:'/signup', 
      element:<Signup/>,
      action:signupAction
    },
    {
      path:'/outer-test',
      element:<App/>
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <BrowserRouter>
    //   <App />
    // </BrowserRouter>
  // </React.StrictMode>,
  <RouterProvider router={router} />
)
