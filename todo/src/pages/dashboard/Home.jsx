import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllTasks,
    addTask,
    markTaskComplete,
    deleteTask,
    markTaskNotComplete,
    updateTaskName
} from "../../services/taskServices";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [loading, setLoading] = useState(true);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState("");
    const [taskToDeleteId, setTaskToDeleteId] = useState(null);


    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await getAllTasks();
            setTasks(res.tasks || []);
        } catch {
            toast.error("Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/auth/login");
    };

    const handleUpdatePassword = () => {
        navigate("/auth/update-password");
    };

    const handleAddTask = async () => {
        if (!newTask.trim()) return;
        try {
            await addTask({ name: newTask });
            setNewTask("");
            await fetchTasks();
            toast.success("Task added!");
        } catch {
            toast.error("Failed to add task");
        }
    };

    const handleMarkComplete = async (id) => {
        try {
            await markTaskComplete(id);
            await fetchTasks();
            toast.success("Task completed");
        } catch {
            toast.error("Failed to mark task as completed");
        }
    };

    const handleMarkNotComplete = async (id) => {
        try {
            await markTaskNotComplete(id);
            await fetchTasks();
            toast.success("Task marked as not completed");
        } catch {
            toast.error("Failed to mark task as not completed");
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            await fetchTasks();
            toast.success("Task deleted");
        } catch {
            toast.error("Failed to delete task");
        }
    };

    const handleUpdateTaskName = async (id) => {
        try {
            if (!editedTaskName.trim()) {
                toast.error("Task name cannot be empty");
                return;
            }
            await updateTaskName(id, editedTaskName);
            setEditingTaskId(null);
            setEditedTaskName("");
            await fetchTasks();
            toast.success("Task updated");
        } catch {
            toast.error("Failed to update task");
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand">Todo Dashboard</span>
                    <div className="d-flex align-items-center ms-auto">
                        <div className="dropdown me-3">
                            <button
                                className="btn btn-light btn-sm dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                Settings
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <button className="dropdown-item" onClick={handleUpdatePassword}>
                                        Update Password
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mt-5 w-50">
                <h2 className="mb-4">Welcome, {user?.name || "User"}!</h2>

                {/* Add Task */}
                <div className="input-group mb-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="form-control"
                        placeholder="Enter new task"
                    />
                    <button className="btn btn-primary" onClick={handleAddTask}>
                        Add
                    </button>
                </div>

                {/* Task List */}
                {loading ? (
                    <div className="d-flex flex-column align-items-center mt-4">
                        <div className="spinner-border text-primary" role="status" />
                        <p className="mt-2">Loading tasks...</p>
                    </div>
                ) : (
                    <ul className="list-group">
                        {tasks.length === 0 ? (
                            <li className="list-group-item">No tasks found.</li>
                        ) : (
                            tasks.map((task) => (
                                <li
                                    key={task._id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div className="d-flex align-items-center w-100 gap-2">
                                        {editingTaskId === task._id ? (
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                value={editedTaskName}
                                                onChange={(e) => setEditedTaskName(e.target.value)}
                                            />
                                        ) : (
                                            <span className={`flex-grow-1 ${task.isCompleted ? "text-decoration-line-through" : ""}`}>
                                                {task.name}
                                            </span>
                                        )}
                                        {!task.isCompleted ? (
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleMarkComplete(task._id)}
                                            >
                                                Complete
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleMarkNotComplete(task._id)}
                                            >
                                                Not Complete
                                            </button>
                                        )}

                                        {editingTaskId === task._id ? (
                                            <>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleUpdateTaskName(task._id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => {
                                                        setEditingTaskId(null);
                                                        setEditedTaskName("");
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => {
                                                    setEditingTaskId(task._id);
                                                    setEditedTaskName(task.name);
                                                }}
                                            >
                                                Edit
                                            </button>
                                        )}

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => setTaskToDeleteId(task._id)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#confirmDeleteModal"
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>

            {/* DeleteModal*/}

            <div
  className="modal fade"
  id="confirmDeleteModal"
  tabIndex="-1"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-body text-center">
        <p>Are you sure you want to delete this task?</p>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            data-bs-dismiss="modal"
            onClick={async () => {
              await handleDeleteTask(taskToDeleteId);
              setTaskToDeleteId(null);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>

    );
};

export default Home;
