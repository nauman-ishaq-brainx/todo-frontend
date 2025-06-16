import { deleteTask } from "../../services/taskServices";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



export const DeleteModal = ({ taskToDeleteId, setTaskToDeleteId, fetchTasks }) => {


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

    )
}