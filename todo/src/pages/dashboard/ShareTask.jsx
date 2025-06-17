import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { shareTask } from "../../services/sharedTaskService";
import { getAllUsers } from "../../services/authServices";
import socket from "../../utils/socket";

export const SharedTaskModal = ({ taskToShareId, setTaskToShareId, fetchTasks }) => {
    const [users, setUsers] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState("");

    // Fetch users when modal opens
    useEffect(() => {
        if (taskToShareId) {
            (async () => {
                try {
                    const { users } = await getAllUsers();
                    setUsers(users);
                } catch (err) {
                    toast.error("❌ Failed to load users");
                }
            })();
        }
    }, [taskToShareId]);

    const handleShare = async () => {
        if (!selectedEmail.trim()) {
            toast.error("❌ Please select a user");
            return;
        }

        try {
            await shareTask({ taskId: taskToShareId, email: selectedEmail });
            socket.emit("shared_task_invite");
            toast.success("✅ Task shared successfully!");
            setSelectedEmail("");
            setTaskToShareId(null);
            fetchTasks();
        } catch (err) {
            const message = err?.response?.data?.error || "❌ Failed to share task";
            toast.error(message);
        }
    };

    return (
        <div className="modal fade" id="shareTaskModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <h5>Share Task</h5>
                        <select
                            className="form-select my-3"
                            value={selectedEmail}
                            onChange={(e) => setSelectedEmail(e.target.value)}
                        >
                            <option value="">Select a user</option>
                            {users.map((user) => (
                                <option key={user._id} value={user.email}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>

                        <div className="d-flex justify-content-center gap-3">
                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setSelectedEmail("");
                                    setTaskToShareId(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleShare}
                            >
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
