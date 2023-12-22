import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Main from '../Layout/Main';
import ErrorPage from '../Page/ErrorPage';
import Home from '../Page/Home';
import Login from '../Page/Login';
import Signup from '../Page/Signup';
import Users from '../Page/Users';
import Dashboard from '../Layout/Dashboard';
import PrivateRoute from './Privateroute';
import CreateTask from '../Page/CreateTask';
import Todo_list from '../Page/Todo_list';
import UserProfile from '../Page/UserProfile';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/users",
                element:<Users></Users>,
                loader: () => fetch('https://task-mangement-server-site.vercel.app/users')
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Signup></Signup>,
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "createtask",
                element: <CreateTask></CreateTask>,
            },
            {
                path: "userprofile",
                element: <UserProfile></UserProfile>,
            },
            {
                path: "todo_list",
                element: <Todo_list></Todo_list>,
                loader: () => fetch('https://task-mangement-server-site.vercel.app/tasks')
            },
            
        ]
    },
]);
export default Router;