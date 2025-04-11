import React from 'react';
import { useDispatch } from "react-redux";
// import { deleteTask } from "../Redux/Features/Tasks/TaskSlice";
import { FiEdit } from "react-icons/fi";


export const TaskDetails = ({showTaskDetails, taskDetails}) => {
    const dispatch = useDispatch();
    return (
        <div>
                <div 
                    className='w-full bg-black opacity-40 fixed top-0 bottom-0 left-0 right-0' 
                    onClick={()=>showTaskDetails(false)}
                >
                </div>

                <div className='absolute top-0 bottom-0 right-0 w-1/4 bg-white p-5'> 
                    <div className='mb-16'>
                        <p className='text-5xl font-semibold'>{taskDetails.text}</p>
                    </div>
                    
                    <div className="flex justify-start items-center w-full mb-5 gap-10">
                        <p>Status : </p>
                        <div className={`p-2 w-auto text-center rounded-lg
                        ${taskDetails.status === 'in progress' ? 'bg-orange-100 text-orange-600' : 
                        taskDetails.status === 'completed' ? 'bg-green-100 text-green-600' : 
                        'bg-gray-100 text-gray-600'}`}> {taskDetails.status}</div>
                        <FiEdit />
                    </div>
                    <div className="flex justify-start items-center w-full mb-5 gap-10"> 
                        <p>Priority : </p>
                        <div className={`p-2  text-center rounded-lg
                            ${taskDetails.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                            taskDetails.priority === 'low' ? 'bg-blue-100 text-blue-600' : 
                            'bg-red-100 text-red-600'}`}>
                                {taskDetails.priority}
                        </div>
                    </div>
                    <div>
                        <p>Description : </p>
                    </div>
                </div>
            </div>
    )
}
