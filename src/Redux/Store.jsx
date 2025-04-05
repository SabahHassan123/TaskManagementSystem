import { createStore } from "redux";
import taskReducer from "./Reducers/TaskReducer";

const store = createStore(taskReducer);

export default store;
