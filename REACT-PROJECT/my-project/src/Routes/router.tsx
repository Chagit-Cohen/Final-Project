import { RouterProvider, createBrowserRouter, Navigate } from "react-router"

import Layout from "../Layout/layout"

import Home from "../Pages/Home"
import Expert from "../Pages/Expert"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import AuthGuard from "../Authoration/AuthGuard"
import GuestGuard from "../Authoration/GuestGuard"
import RegisterExpert from "../Pages/ExpertRegister"
import Profile from "../Pages/Profile"
import Chat from "../Pages/Chat";
import MyChats from "../Pages/MyChats";
const Router = () => {

  const router = createBrowserRouter([

    {
      path: "/",
      element: <Layout />,

      children: [

        {
          index: true,
          element: <Home />
        },

        {
          path: "/expert/:id",
          element: <Expert />
        },
        {
          path: "/ExpertRegister",
          element: (<AuthGuard>
            <RegisterExpert />
          </AuthGuard>)
        },
        {
          path: "/chat/:serviceCallId",
          element: (<AuthGuard>
            <Chat />
          </AuthGuard>)
        },
        {
          path: "/my-chats",
          element: (
            <AuthGuard>
              <MyChats />
            </AuthGuard>
          )
        }
        ,
        {
          path: "/Profile",
          element: (
            <AuthGuard>
              <Profile />
            </AuthGuard>

          )
        }



      ]
    },

    {
      path: "/Login",
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      )
    },

    {
      path: "/Register",
      element: (
        <GuestGuard>
          <Register />
        </GuestGuard>
      )
    },



    {
      path: "*",
      element: <Navigate to="/" />
    }

  ])

  return <RouterProvider router={router} />
}

export default Router