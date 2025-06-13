import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllTasks,
  addTask,
  markTaskComplete,
  deleteTask,
} from "../../services/taskServices";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      await fetchTasks();
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
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
                className="btn btn-light dropdown-toggle btn-sm"
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

      {/* Main Content */}
      <div className="container mt-5">
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
          <div className="text-center mt-4">
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
                  <span
                    style={{
                      textDecoration: task.isCompleted ? "line-through" : "none",
                    }}
                  >
                    {task.name}
                  </span>
                  <div>
                    {!task.isCompleted && (
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleMarkComplete(task._id)}
                      >
                        Complete
                      </button>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTask(task._id)}
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
    </div>
  );
};

export default Home;
