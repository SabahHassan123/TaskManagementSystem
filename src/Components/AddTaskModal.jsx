import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/Actions/TaskActions';

export const AddTaskModal = ({showModal}) => {
    const dispatch = useDispatch();
    const [taskText, setTaskText] = useState('');
    // const [taskPriority, setTaskPriority] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskText.trim() === "") return;

        dispatch(addTask({ id: Date.now(), text: taskText, description: taskDescription, priority: selectedPriority, status: 'not started' }));
        setTaskText('');
        setTaskDescription('');
        setSelectedPriority('');
        showModal(false);
      };

  return (
    <div>
        <div className='w-full bg-black opacity-40 fixed top-0 bottom-0 left-0 right-0' onClick={()=>showModal(false)}></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/6 h-2/3 bg-white rounded-xl p-5'> 
            <div className='text-center'>
                <p className='text-3xl font-medium text-violet-700'>Add Task</p>
            </div>
            <form action="" className='text-gray-500' onSubmit={handleSubmit}>
                <div>
                    <div className='flex justify-start flex-col gap-1 m-1'>
                    <label htmlFor="task-name">Task Name</label>
                    <input id='task-name' type="text" className='bg-gray-50 focus:bg-gray-100 rounded-md w-1/2 h-10 outline-none p-3 text-gray-500'
                         value={taskText}
                         onChange={(e) => setTaskText(e.target.value)}
                    />
                </div>
                <div className='flex justify-start flex-col gap-1 m-1'>
                    <label htmlFor="task-priority">Priority</label>
                    <select value={selectedPriority} onChange={(e)=> setSelectedPriority(e.target.value)} id='task-priority' className="block w-1/2 p-3 border-gray-300 rounded-md bg-gray-50 text-gray-500 focus:outline-none  focus:bg-gray-100">
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
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    >
                        
                    </textarea>
                </div>
                <div className=' mx-1 mt-10 flex justify-end'>
                    <button type='submit' className='bg-violet-700 text-white w-1/3 m-1 rounded-md h-10 hover:bg-violet-600 '>Add</button>
                </div>
            </form>
        </div>
    </div>
  )
}
