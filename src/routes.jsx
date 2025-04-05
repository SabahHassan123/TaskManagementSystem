import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import TasksList from "./Pages/TasksList"
import TaskDetails from "./Pages/TaskDetails"

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
                path: '/taskDetails/:id',
                element: <TaskDetails />
            },
            
        ]
    },
    // {
    //     path: '/addTasks',
    //     element: <AddTask/>
    // },

])