import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../components/Login/Login";
import SignUp from "../components/Login/SignUp/SignUp";
import CreateTask from "../components/CreateTask/CreateTask";
import TaskList from "../components/TaskList/TaskList";
import Home from "../components/Home/Home";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import MyProfile from "../components/MyProfile/MyProfile";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path:'/',
          element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signup',
            element:<SignUp></SignUp>
        },
        {
            path:'/createtask',
            element:<PrivateRoute><CreateTask></CreateTask></PrivateRoute>
        },
        {
          path:'/tasklist',
          element:<PrivateRoute><TaskList></TaskList></PrivateRoute>
        },
        {
          path:'*',
          element:<Home></Home>
        },
        {
          path:'/dashboard',
          element:<Dashboard></Dashboard>
        },
        {
          path:'/my-profile',
          element:<MyProfile></MyProfile>
        }
      ]
    },
  ]);