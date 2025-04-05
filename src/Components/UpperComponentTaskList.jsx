import React from 'react'

export const UpperComponentTaskList = ({ShowModal}) => {
    
  return (
    <div className='w-4/5 flex justify-between '>
        <input type="text" placeholder='What are you looking for....' className='w-1/3 text-start outline-none px-3 bg-gray-50 rounded-lg placeholder-slate-500 text-slate-500'/>
        <button className='bg-violet-700 hover:bg-violet-600 rounded py-2 px-5 text-white' onClick={()=>ShowModal(true)}>add task</button>
    </div>
  )
}

