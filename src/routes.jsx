import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import TasksList from "./Pages/TasksList"

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/tasksList',
        element: <TasksList />
    }
])