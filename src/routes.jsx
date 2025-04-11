import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import TasksList from "./Pages/TasksList"
import TaskDetails from "./Pages/TaskDetails"
import DashboardPage from "./Pages/DashboardPage"
import HomePage from "./Pages/HomePage"
import Register from "./Components/Register"
import Login from "./Components/Login"
export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/tasksList',
                element: <TasksList />
            },
            {
                path: '/dashboard',
                element: <DashboardPage />
            },
            {
                path: '/homepage',
                element: <HomePage />
            },
            
        ]
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