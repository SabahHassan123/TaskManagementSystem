import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/Features/Tasks/TaskSlice';
import { Input } from './Input';

export const AddTaskModal = ({showModal, status}) => {
    const dispatch = useDispatch();
    const [taskData, setTaskData] = useState({
        taskText: '',
        selectedDueDate: '',
        selectedPriority: '',
        taskDescription: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskData.taskText.trim() === "") return;

        dispatch(addTask({ id: Date.now(), text: taskData.taskText, description: taskData.taskDescription, priority: taskData.selectedPriority, status: status, dueDate: taskData.selectedDueDate}));
      
        showModal(false);
        
      };

  return (
    <div>
        <div className='w-full bg-black opacity-40 fixed top-0 bottom-0 left-0 right-0' onClick={()=>showModal(false)}></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/6  bg-white rounded-xl p-5'> 
            <div className='text-center'>
                <p className='text-3xl font-medium text-violet-700'>Add Task</p>
            </div>
            <form className='text-gray-500' onSubmit={handleSubmit}>
                <div>
                    <Input 
                        labelName="Task Name"
                        inputType="text"
                        value={taskData.taskText}
                        handler={(e) => setTaskData({...taskData, taskText: e.target.value})}
                        id="task-name"
                    />
                    <Input 
                        labelName = "Due Date"
                        inputType = "date"
                        value = {taskData.selectedDueDate}
                        handler = {(e) => setTaskData({...taskData, selectedDueDate: e.target.value})}
                        id= "due-date"
                        
                    />
                    <div className='flex justify-start flex-col gap-1 m-1'>
                        <label htmlFor="task-priority">Priority</label>
                        <select value={taskData.selectedPriority} onChange={(e)=> setTaskData({...taskData, selectedPriority: e.target.value})} id='task-priority' className="block w-1/2 p-3 border-gray-300 rounded-md bg-gray-50 text-gray-500 focus:outline-none  focus:bg-gray-100">
                            <option value="">select a priority</option>
                            <option value="high">high</option>
                            <option value="medium">medium</option>
                            <option value="low">low</option>
                        </select>
                    </div>
                </div>
                <div className='flex justify-start flex-col gap-1 m-1'>
                    <label htmlFor="task-description">Description</label>
                    <textarea id="task-description" placeholder='write your task description....' className='p-3 outline-none bg-gray-50 focus:bg-gray-100 rounded-md max-h-22 text-gray-500'
                        value={taskData.taskDescription}
                        onChange={(e) => setTaskData({...taskData, taskDescription: e.target.value})}
                    >
                        
                    </textarea>
                </div>
                <div className=' mx-1 mt-10 flex justify-end'>
                    <button className=' bg-white w-1/4 m-1 rounded-2xl h-10 flex items-center justify-center hover:text-violet-700' onClick={()=> showModal(false)}>Cancel</button>
                    <button type='submit' className='bg-violet-700 flex items-center justify-center text-white w-1/4 m-1 rounded-2xl h-10 hover:bg-violet-600 '>Add</button>
                </div>
            </form>
        </div>
    </div>
  )
}
