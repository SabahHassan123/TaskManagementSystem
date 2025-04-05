const initialState = {
    tasks: 
    JSON.parse(localStorage.getItem('tasks')) || [],
  };
  
const taskReducer = (state = initialState, action) => {
    let updatedTasks;
    switch (action.type) {
        case "add task":
            updatedTasks = [...state.tasks, action.payload];
            localStorage.setItem('tasks',JSON.stringify(updatedTasks))
            return { tasks: updatedTasks };

        case "edit task":
            updatedTasks = state.tasks.map(task=>
                task.id === action.payload.id ? 
                {...task, text: action.payload.text, description: action.payload.description, priority: action.payload.priority, status: action.payload.status}
                : 
                task
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return {...state, tasks: updatedTasks};
            
        case "delete task":
            updatedTasks = state.tasks.filter(task => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            return {...state, tasks: updatedTasks};

        default:
            return state;
    }
};
  
export default taskReducer;
  