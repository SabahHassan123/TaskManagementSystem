import React from 'react'

export const AddTaskModal = ({showModal}) => {
  return (
    <div>
        <div className='w-full bg-black opacity-40 fixed top-0 bottom-0 left-0 right-0' onClick={()=>showModal(false)}></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/6 h-2/3 bg-white rounded-xl flex justify-center p-5'> 
            <h1>Add task</h1>
        </div>
    </div>
  )
}
