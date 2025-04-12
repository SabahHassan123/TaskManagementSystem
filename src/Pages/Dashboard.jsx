import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FaTasks } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { formatTaskDate } from './TasksList';
import { AddTaskModal } from '../Components/AddTaskModal';

export const Dashboard = () =>{
    const tasks = useSelector((state) => state.tasks.tasks);
    const searchQuery = useSelector(state => state.search.searchQuery);

    const statusGroups = ['To-Do', 'In-Progress', 'Completed'];
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('');
    
    const ShowModal = (show) => {
        setOpenAddTaskModal(show);
    }
    const handleShowModal = (status) => {
        setOpenAddTaskModal(!openAddTaskModal);
        setCurrentStatus(status);
    };

    const filteredTasks = tasks.filter(task => 
        task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formatTaskDate(task.dueDate).toLowerCase().includes(searchQuery.toLowerCase())
      );
    return(
        <div className="dashboard-content">
        {statusGroups.map((status) => (
            <div key={status} className="widget">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                <FaTasks /> {status}
                </h3>
                <button
                    className="text-sm bg-violet-600 hover:bg-violet-700 text-white px-2 py-1 rounded flex items-center gap-1"
                    onClick={() => handleShowModal(status)}
                >
                    <FaPlus /> Add
                </button>
            </div>
            <ul className="space-y-2">
                {filteredTasks
                .filter((t) => t.status === status)
                .map((task) => (
                    <li key={task.id} className="task-item">
                    <div>{task.text}</div>
                    <div className="status">{formatTaskDate(task.dueDate)}</div>
                    </li>
                ))}
            </ul>
            {
                openAddTaskModal && <AddTaskModal showModal={ShowModal} status={currentStatus}/>
            }
            </div>
        ))}
    </div>
         
    )
}
