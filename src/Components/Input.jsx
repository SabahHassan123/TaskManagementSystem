import React from 'react'



export const Input = ({ labelName, inputType, value, handler, id }) => {
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };
    return(
        <div className='flex justify-start flex-col gap-1 m-1'>
            <label htmlFor={id}>{labelName}</label>
            <input 
                id={id} 
                type={inputType} 
                value={value}
                onChange={handler}
                className='bg-gray-50 focus:bg-gray-100 rounded-md w-1/2 h-10 outline-none p-3 text-gray-500'
                min={inputType === 'date'? getMinDate(): null}
                required
            />
        </div>
    )
}