import React, { useState } from 'react'
import { UpperComponentTaskList } from '../Components/UpperComponentTaskList';
import { AddTaskModal } from '../Components/AddTaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../Redux/Features/Tasks/TaskSlice';
import { TaskDetails } from '../Components/TaskDetails';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from 'react-icons/fa';
import '../Components/PagesStyles.css';

export const formatTaskDate = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date
    
    // Calculate difference in days
    const diffTime = date - today;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Handle special cases
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    
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
    const searchQuery = useSelector(state => state.search.searchQuery);
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
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(5); // Items per page

    const filteredTasks = tasks.filter(task => 
        task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formatTaskDate(task.dueDate).toLowerCase().includes(searchQuery.toLowerCase())
      );

       // Pagination logic
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Next page
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleViewClick = (details) => {
        setSelectedTaskDetails(details);
        setOpenTaskDetailsModal(true);
      };

    const theme = 'light';

    return (
      <div className='w-full h-full flex flex-col justify-center items-center p-10 '>
        <div className='bg-white text-gray-800 w-11/12 rounded-xl m-5 flex justify-center items-center py-10 font-poppins border'>
            {/* Mobile View (Cards) */}
            <div className="lg:hidden space-y-4">
            {filteredTasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        className='accent-violet-600'
                        checked={task.status === 'Completed'}
                        onChange={() => dispatch(editTask({...task, status: task.status === 'Completed' ? 'To-Do' : 'Completed'}))}
                    />
                    <span className="font-medium">{task.text}</span>
                    </div>
                    <button onClick={() => handleViewClick(task)}>
                    <BsThreeDotsVertical className='text-gray-400' />
                    </button>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <span className="text-gray-500">Due:</span> {formatTaskDate(task.dueDate)}
                    </div>
                    <div>
                        <span className="text-gray-500">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs 
                            ${task.status === 'In-Progress' ? 'bg-orange-100 text-orange-600' : 
                            task.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                            'bg-gray-100 text-gray-600'}`}>
                            {task.status}
                        </span>
                    </div>
                    <div>
                    <span className="text-gray-500">Priority:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs
                        ${task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                        task.priority === 'low' ? 'bg-blue-100 text-blue-600' : 
                        'bg-red-100 text-red-600'}`}>
                        {task.priority}
                    </span>
                    </div>
                </div>
                </div>
            ))}
            </div>

            {/* Desktop View (Table) */}
            <table className="hidden lg:table w-full text-center">
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
                    filteredTasks.map((task)=>(
                        <tr key={task.id} className='border-t-2 border-gray-50'>
                            <td className='pl-3'>
                                <input
                                    type="checkbox"
                                    className='accent-violet-600'
                                    name={task.id}
                                    checked={task.status === 'Completed'}
                                    onChange={()=> dispatch(editTask({id: task.id, status: task.status !== 'Completed'? 'Completed' : 'task.status'}))}
                                />
                            </td>
                            <td className='p-3 text-left truncate max-w-[200px] overflow-hidden whitespace-nowrap'>{task.text}</td>
                            <td className='p-3'>{formatTaskDate(task.dueDate)}</td>
                            <td className='p-3'>
                                <div className="flex justify-center items-center w-full">
                                    <div className={`p-1 w-3/4 text-center rounded-full
                                    ${task.status === 'In-Progress' ? 'bg-orange-100 text-orange-600' : 
                                    task.status === 'Completed' ? 'bg-green-100 text-green-600' : 
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
                            <button onClick={() => handleViewClick(task)} className='mr-4'>
                                <BsThreeDotsVertical className='text-xl text-gray-400' />
                            </button>
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