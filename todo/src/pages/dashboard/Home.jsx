import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import {
    getAllTasks,
    addTask,
    markTaskComplete,
    markTaskNotComplete,
    updateTaskName,
} from "../../services/taskServices";
import {
    getAcceptedSharedTasks,
    deleteSharedTaskAsReceiver,
} from "../../services/sharedTaskService";
import { toast, ToastContainer } from "react-toastify";
import { Navbar } from "./Navbar";
import { DeleteModal } from "./DeleteModal";
import { SharedTaskModal } from "./ShareTaskModal";
import { TaskItem } from "./TaskItem";
import { AddNewTask } from "./AddNewTask";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import socket from "../../utils/socket";

const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [taskToDeleteId, setTaskToDeleteId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [loading, setLoading] = useState(true);
    const [taskToShareId, setTaskToShareId] = useState(null);
    const [sharedTasks, setSharedTasks] = useState([]);
    const [dueDate, setDueDate] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0)


    // Fetch all tasks (owned + shared)
    const fetchTasks = async (currentPage) => {
        setLoading(true);
        try {
            const [taskRes, sharedTaskRes] = await Promise.all([
                getAllTasks(currentPage + 1),
                getAcceptedSharedTasks(),
            ]);
            setTasks(taskRes.tasks || []);
            setSharedTasks(sharedTaskRes || []);
            if (currentPage >= taskRes.totalPages & taskRes.totalPages > 0){
                setCurrentPage(currentPage-1);
            }
            setTotalPages(taskRes.totalPages || 0);
        } catch {
            toast.error("Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };


    const fetchSharedTasks = async () => {
        try {
            const sharedTaskRes = await getAcceptedSharedTasks();
            setSharedTasks(sharedTaskRes || []);
        } catch {
            toast.error("Failed to fetch shared tasks");
        }
    };

        useEffect(() => {
        fetchTasks(currentPage);

        const handleTaskUpdate = () => fetchTasks(currentPage);
        const handleTaskDelete = () => fetchSharedTasks();

        socket.on("task_updated", handleTaskUpdate);
        socket.on("task_deleted", handleTaskDelete);

        return () => {
            socket.off("task_updated", handleTaskUpdate);
            socket.off("task_deleted", handleTaskDelete);
        };
    }, [currentPage]);




    const handleAddTask = async () => {
        if (!newTask.trim()) return;
        try {
            await addTask({
                name: newTask,
                dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            });
            setNewTask("");
            setDueDate("");
            await fetchTasks(currentPage);
            toast.success("Task added!");
        } catch {
            toast.error("Failed to add task");
        }
    };

    const handleMarkComplete = async (id) => {
        try {
            await markTaskComplete(id);
            socket.emit("task_updated");
            await fetchTasks(currentPage);
            toast.success("Task marked as completed");
        } catch {
            toast.error("Failed to mark as completed");
        }
    };

    const handleMarkNotComplete = async (id) => {
        try {
            await markTaskNotComplete(id);
            socket.emit("task_updated");
            await fetchTasks(currentPage);
            toast.success("Task marked as not completed");
        } catch {
            toast.error("Failed to mark as not completed");
        }
    };

    const handleUpdateTaskName = async (id, newName) => {
        if (!newName.trim()) {
            toast.error("Task name cannot be empty");
            return;
        }
        try {
            await updateTaskName(id, newName);
            socket.emit("task_updated");
            await fetchTasks(currentPage);
            toast.success("Task updated");
        } catch {
            toast.error("Failed to update task");
        }
    };

    const handleDeleteSharedTask = async (sharedTaskId) => {
        try {
            await deleteSharedTaskAsReceiver(sharedTaskId);
            toast.success("Shared task removed");
            fetchTasks(currentPage);
        } catch {
            toast.error("Failed to remove shared task");
        }
    };
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div>
            <Navbar onSharedTaskAccepted={fetchSharedTasks} />
            

            <div className="container mt-5 w-50">
                <h2 className="mb-4">Welcome, {user?.name || "User"}!</h2>
                <AddNewTask newTask={newTask} setNewTask={setNewTask} dueDate={dueDate} setDueDate={setDueDate} handleAdd={handleAddTask} />
                


                <h4 className="mb-3">My Tasks</h4>
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
                                <TaskItem
                                    key={task._id}
                                    task={task}
                                    actualTaskId={task._id}
                                    onMarkComplete={handleMarkComplete}
                                    onMarkNotComplete={handleMarkNotComplete}
                                    onUpdateName={handleUpdateTaskName}
                                    onDelete={(id) => setTaskToDeleteId(id)}
                                    onShare={(id) => setTaskToShareId(id)}
                                />
                            ))
                        )}
                    </ul>
                )}
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next →"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3} 
                    marginPagesDisplayed={1}  
                    pageCount={totalPages}
                    previousLabel="← Prev"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage}

                    containerClassName="pagination justify-content-center mt-3"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    activeClassName="active"
                />



                <h4 className="mt-5">Shared Tasks</h4>
                <ul className="list-group">
                    {sharedTasks.length === 0 ? (
                        <li className="list-group-item">No shared tasks.</li>
                    ) : (
                        sharedTasks.map((shared) => (
                            <TaskItem
                                key={shared?._id}
                                task={shared?.taskId}
                                actualTaskId={shared?.taskId._id}
                                isShared={true}
                                onMarkComplete={handleMarkComplete}
                                onMarkNotComplete={handleMarkNotComplete}
                                onUpdateName={handleUpdateTaskName}
                                onDelete={() => handleDeleteSharedTask(shared?._id)}
                            />
                        ))
                    )}
                </ul>
            </div>

            <DeleteModal
                fetchTasks={fetchTasks}
                currentPage={currentPage}
                taskToDeleteId={taskToDeleteId}
                setTaskToDeleteId={setTaskToDeleteId}
            />
            <SharedTaskModal
                taskToShareId={taskToShareId}
                setTaskToShareId={setTaskToShareId}
                currentPage={currentPage}
                fetchTasks={fetchTasks}
            />

            <ToastContainer position="top-right" autoClose={1500} />
        </div>
    );
};

export default Home;
