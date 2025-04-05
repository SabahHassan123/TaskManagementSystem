import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import tasks from '../DummyData/Tasks.json'
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../Redux/Actions/TaskActions";
const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tasks = useSelector(state => state.tasks);
  
  const dispatch = useDispatch();

  // Find task by ID
  const task = tasks.find((t) => t.id === parseInt(id));

  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  if (!task) {
    return <div className="text-red-500 text-center mt-10">Task not found</div>;
  }

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

//   const handleUpdate = () => {
//     onUpdate(editedTask);
//     setEditMode(false);
//   };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800">
        {editMode ? (
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        ) : (
          task.title
        )}
      </h1>

      <p className="text-gray-600 mt-2">
        {editMode ? (
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        ) : (
          task.description
        )}
      </p>

      <div className="mt-4">
        <p>
          <strong>Due Date:</strong>{" "}
          {editMode ? (
            <input
              type="date"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
          ) : (
            task.dueDate
          )}
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          {editMode ? (
            <select
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
              className="border rounded-md p-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          ) : (
            <span
              className={`px-2 py-1 rounded-md ${
                task.priority === "High"
                  ? "bg-red-500 text-white"
                  : task.priority === "Medium"
                  ? "bg-yellow-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {task.priority}
            </span>
          )}
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        {editMode ? (
          <button
            // onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => {
            dispatch(deleteTask(parseInt(id)))
            navigate("/tasksList");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
