import React, { useState } from 'react'
import { UpperComponentTaskList } from '../Components/UpperComponentTaskList';
import { AddTaskModal } from '../Components/AddTaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../Redux/Features/Tasks/TaskSlice';
import { TaskDetails } from '../Components/TaskDetails';

export const formatTaskDate = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const today = new Date();
    
    // For same-year dates
    if (date.getFullYear() === today.getFullYear()) {
    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
    }); 
    }
    
    // For other years
    return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
    }); 
};

const TasksList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();

    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
    const [openTaskDetailsModal, setOpenTaskDetailsModal] = useState(false);
    const [selectedTaskDetails, setSelectedTaskDetails] = useState({});

    const ShowModal = (show) => {
        setOpenAddTaskModal(show);
    }
    const showTaskDetails = (show) => {
        setOpenTaskDetailsModal(show);
    }

    const handleViewClick = (details) => {
        setSelectedTaskDetails(details);
        setOpenTaskDetailsModal(true);
      };

    const theme = 'light';

    return (
      <div className='w-full h-full flex flex-col justify-center items-center p-10 '>
        <UpperComponentTaskList ShowModal={ShowModal}/>
        <div className={`
            ${theme==='light'?'bg-white text-gray-800':' bg-gray-700 text-gray-400'}
            w-4/5
            rounded-xl
            m-5
            flex
            justify-center
            items-center
            py-10
            font-poppins
            border
        `}
        >
            <table className='w-full text-center'>
            <thead>
                <tr>
                    <th></th>
                    <th className='pb-5 text-left pl-3'>Task</th>
                    <th className='pb-5'>Due Date</th>
                    <th className='pb-5'>Status</th>
                    <th className='pb-5'>Priority</th>
                </tr>
            </thead>
            <tbody>
            {
                tasks.map((task)=>(
                    <tr key={task.id} className='border-t-2 border-gray-50'>
                        <td className='pl-3'>
                            <input
                                type="checkbox"
                                className='accent-violet-600'
                                name={task.id}
                                checked={task.status === 'completed'}
                                onChange={()=> dispatch(editTask({...task, status: task.status === 'completed'? 'To-Do': 'completed'}))}
                            />
                        </td>
                        <td className='p-3 text-left truncate max-w-[200px] overflow-hidden whitespace-nowrap'>{task.text}</td>
                        <td className='p-3'>{formatTaskDate(task.dueDate)}</td>
                        <td className='p-3'>
                            <div className="flex justify-center items-center w-full">
                                <div className={`p-1 w-3/4 text-center rounded-full
                                ${task.status === 'in progress' ? 'bg-orange-100 text-orange-600' : 
                                task.status === 'completed' ? 'bg-green-100 text-green-600' : 
                                'bg-gray-100 text-gray-600'}`}>
                                {task.status}
                                </div>
                            </div>
                        </td>
                        <td className='p-3'>
                            <div className="flex justify-center items-center w-full">
                                <div className={`p-1 w-3/4 text-center rounded-full
                                ${task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                                task.priority === 'low' ? 'bg-blue-100 text-blue-600' : 
                                'bg-red-100 text-red-600'}`}>
                                {task.priority}
                                </div>
                            </div>
                        </td>
                        <td>
                        <button onClick={() => handleViewClick(task)}>view</button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
            </table>
        </div>
        {
            openAddTaskModal && <AddTaskModal showModal={ShowModal}/>
        }
        {
            openTaskDetailsModal && <TaskDetails showTaskDetails={showTaskDetails} taskDetails={selectedTaskDetails}/>
        }
      </div>
    )
}
export default TasksList;