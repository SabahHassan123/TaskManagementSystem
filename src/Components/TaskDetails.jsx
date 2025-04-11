import React, { useState } from 'react';
import { useDispatch } from "react-redux";
// import { updateTask } from "../Redux/Features/Tasks/TaskSlice";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { deleteTask, editTask } from '../Redux/Features/Tasks/TaskSlice';
import { MdDateRange } from "react-icons/md";

export const TaskDetails = ({ showTaskDetails, taskDetails }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const [editedTask, setEditedTask] = useState({
        text: taskDetails.text,
        id: taskDetails.id,
        status: taskDetails.status,
        priority: taskDetails.priority,
        dueDate: taskDetails.dueDate,
        description: taskDetails.description || "",
    });

    const handleChange = (field, value) => {
        setEditedTask(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        dispatch(editTask({
            text: editedTask.text,
            id: taskDetails.id,
            status: editedTask.status,
            dueDate: editedTask.dueDate,
            priority: editedTask.priority,
            description: editedTask.description || "",
          }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTask({
            text: taskDetails.text,
            dueDate: taskDetails.dueDate,
            status: taskDetails.status,
            priority: taskDetails.priority,
            description: taskDetails.description || "",
        });
        setIsEditing(false);
    };

    const handleDelete = () => {
          dispatch(deleteTask(taskDetails.id));
          showTaskDetails(false);
      };

    return (
        <div>
            {/* Overlay */}
            <div 
                className='w-full bg-black opacity-40 fixed top-0 bottom-0 left-0 right-0' 
                onClick={() => showTaskDetails(false)}
            />

            {/* Modal Panel */}
            <div className='fixed top-0 bottom-0 right-0 w-full sm:w-1/3 lg:w-1/4 bg-white p-6 shadow-lg overflow-y-auto z-50'>

                {/* Header */}
                <div className='flex justify-between items-center mb-6'>
                    <input className='text-xl font-bold break-words outline-none' readOnly={!isEditing} value={editedTask.text} onChange={(e)=>setEditedTask({...editedTask,text:e.target.value})}/>
                    <div className="flex gap-3 items-center">
                        <button onClick={() => setIsEditing(true)} title="Edit" disabled={isEditing}>
                            <FiEdit size={20} className={`${isEditing? 'text-gray-400': 'text-violet-600 hover:text-violet-700'}`} />
                        </button>
                    </div>
                </div>

                {/* Status */}
                <div className="flex justify-between items-center mb-4">
                    <label className="font-medium">Status:</label>
                    {isEditing ? (
                        <select
                            className="p-1 border border-gray-300 rounded-md"
                            value={editedTask.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                        >
                            <option value="todo">To Do</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    ) : (
                        <span className={`px-3 py-1 rounded-full text-sm capitalize 
                            ${editedTask.status === 'in progress' ? 'bg-orange-100 text-orange-600' : 
                              editedTask.status === 'completed' ? 'bg-green-100 text-green-600' : 
                              'bg-gray-100 text-gray-600'}`}>
                            {editedTask.status}
                        </span>
                    )}
                </div>

                {/* Priority */}
                <div className="flex justify-between items-center mb-4">
                    <label className="font-medium">Priority:</label>
                    {isEditing ? (
                        <select
                            className="p-1 border border-gray-300 rounded-md"
                            value={editedTask.priority}
                            onChange={(e) => handleChange('priority', e.target.value)}

                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    ) : (
                        <span className={`px-3 py-1 rounded-full text-sm capitalize 
                            ${editedTask.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                              editedTask.priority === 'low' ? 'bg-blue-100 text-blue-600' : 
                              'bg-red-100 text-red-600'}`}>
                            {editedTask.priority}
                        </span>
                    )}
                </div>
                    
                {/* Due Date */}
                <div className="flex justify-between items-center mb-4">
                <label className="font-medium">Due Date:</label>
                {isEditing ? (
                    <input
                    type="date"
                    className="p-1 border border-gray-300 rounded-md"
                    value={editedTask.dueDate}
                    onChange={(e) => handleChange('dueDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]} // Prevent past dates
                    />
                ) : (
                    <div className="flex items-center gap-2">
                    <MdDateRange className="text-gray-600" />
                    <span>
                        {editedTask.dueDate ? 
                        new Date(editedTask.dueDate).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        }) : 
                        'No due date'}
                    </span>
                    </div>
                )}
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="font-medium block mb-2">Description:</label>
                    <textarea
                        className="w-full p-2 rounded-md text-sm bg-gray-100 outline-none"
                        rows={4}
                        value={editedTask.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        readOnly={!isEditing}
                    />
                </div>

                {/* Save/Cancel Buttons */}
                {isEditing && (
                    <div className="flex justify-end gap-3">
                        <button 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button 
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                )}
                <button 
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-1 w-full bg-red-500 hover:bg-red-700 text-white p-1 mr-2 rounded-lg absolute bottom-5 right-0"
                    >
                    {/* <IoTrashBin size={18} /> */}
                    Delete Task
                </button>
            </div>
        </div>
    );
};