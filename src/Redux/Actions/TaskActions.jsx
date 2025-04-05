export const addTask = (task) => ({
    type: "add task",
    payload: task,
  });
  
  export const editTask = (task) => ({
    type: "edit task",
    payload: task,
  });
  
  export const deleteTask = (id) => ({
    type: "delete task",
    payload: id,
  });
  