import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getReceivedSharedTasks,
  acceptSharedTask,
  rejectSharedTask,
} from "../../services/sharedTaskService";
import { toast } from "react-toastify";
import socket from "../../utils/socket";

export const Navbar = ({ onSharedTaskAccepted }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await getReceivedSharedTasks();
      const pending = res.sharedTasks?.filter((task) => task.status === "pending") || [];
      setNotifications(pending);
    } catch {
      toast.error("Failed to fetch notifications");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const handleUpdatePassword = () => {
    navigate("/auth/update-password");
  };

  const handleAccept = async (id) => {
    try {
      await acceptSharedTask(id);
      toast.success("Task accepted");
      fetchNotifications();
      onSharedTaskAccepted?.();
    } catch {
      toast.error("Failed to accept task");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectSharedTask(id);
      toast.info("Task rejected");
      fetchNotifications();
    } catch {
      toast.error("Failed to reject task");
    }
  };

  useEffect(() => {
    fetchNotifications();

  
    socket.on("shared_task_invite", () => {
      fetchNotifications(); 
    });

    return () => {
      socket.off("shared_task_invite");
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Todo Dashboard</span>
        <div className="d-flex align-items-center ms-auto">
          {/* Notifications */}
          <div className="dropdown me-3">
            <button
              className="btn btn-light btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Invitations {notifications.length > 0 && <span className="badge bg-danger">{notifications.length}</span>}
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-2" style={{ minWidth: "300px" }}>
              {notifications.length === 0 ? (
                <li className="text-center text-muted">No new invites</li>
              ) : (
                notifications.map((item) => (
                  <li key={item._id} className="mb-2 border-bottom pb-2">
                    <p className="mb-1 small">
                      <strong>{item.sender.email}</strong> shared task: <strong>{item?.taskId?.name}</strong>
                    </p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-success btn-sm" onClick={() => handleAccept(item._id)}>
                        Accept
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleReject(item._id)}>
                        Reject
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>

          </div>

          {/* Settings Dropdown */}
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

          {/* Logout */}
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
