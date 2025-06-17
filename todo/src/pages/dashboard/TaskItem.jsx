import React, { useState } from "react";

export const TaskItem = ({
    task,
    actualTaskId,
    isShared = false,
    onMarkComplete,
    onMarkNotComplete,
    onUpdateName,
    onDelete,
    onShare,
}) => {
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(task.name || "");

    const handleSave = () => {
        if (!editedName.trim()) return;
        onUpdateName(actualTaskId, editedName);
        setEditing(false);
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center w-100 gap-2">
                {editing ? (
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                ) : (
                    <span
                        className={`flex-grow-1 ${task.isCompleted ? "text-decoration-line-through" : ""
                            }`}
                    >
                        {task.name || "Unnamed Task"}
                    </span>
                )}

                {!task.isCompleted ? (
                    <button
                        className="btn btn-success btn-sm"
                        onClick={() => onMarkComplete(actualTaskId)}
                    >
                        Complete
                    </button>
                ) : (
                    <button
                        className="btn btn-success btn-sm"
                        onClick={() => onMarkNotComplete(actualTaskId)}
                    >
                        Not Complete
                    </button>
                )}

                {editing ? (
                    <>
                        <button className="btn btn-primary btn-sm" onClick={handleSave}>
                            Save
                        </button>
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        className="btn btn-warning btn-sm"
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </button>
                )}
                {!isShared ? (
                    <button
                        className="btn btn-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmDeleteModal"
                        onClick={() => onDelete(actualTaskId)}
                    >
                        Delete
                    </button>
                ) : (
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete()}
                    >
                        Remove
                    </button>
                )}

                {!isShared && (
                    <button
                        className="btn btn-info btn-sm"
                        onClick={() => onShare(task._id)}
                        data-bs-toggle="modal"
                        data-bs-target="#shareTaskModal"
                    >
                        Share
                    </button>
                )}
            </div>
        </li>
    );
};
