import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import TasksList from "./Pages/TasksList"
import HomePage from "./Pages/HomePage"
import Register from "./Components/Register"
import Login from "./Components/Login"
import { Dashboard } from "./Pages/Dashboard"
export const routes = createBrowserRouter([
    {
        path: '/dashboard',
        element: <App />,
        children: [
            {
                path: 'tasksList',
                element: <TasksList />
            },
            {
                path: 'dashboardCategory',
                element: <Dashboard />
            },
            
        ]
    },
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
])