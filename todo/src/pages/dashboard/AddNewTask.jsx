

export const AddNewTask = ({newTask, setNewTask, dueDate, setDueDate, handleAdd}) => {

    return (

             <div className="mb-4">
                                <div className="input-group mb-2">
                                    <input
                                        type="text"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter new task"
                                    />
                                </div>
                                <div className="input-group mb-2">
                                    <input
                                        type="datetime-local"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className="form-control"
                                        placeholder="Select due date"
                                    />
                                </div>
                                <button className="btn btn-primary w-100" onClick={handleAdd}>
                                    Add
                                </button>
                            </div>
            
            

    );
};
