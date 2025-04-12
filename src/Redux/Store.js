import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './Features/Tasks/TaskSlice';
import searchReducer from './Features/Tasks/SearchSlice'

// import searchR
const store = configureStore({
  reducer: {
    tasks: taskReducer,
    search: searchReducer,
  }
});

export default store;
