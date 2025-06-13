import authorizedAxios from "../axios/authorized";

export const getAllTasks = async () => {
  const res = await authorizedAxios.get("/tasks");
  return res.data;
};

export const addTask = async (name) => {
  const res = await authorizedAxios.post("/tasks", name);
  return res.data;
};

export const markTaskComplete = async (id) => {
  const res = await authorizedAxios.patch(`/tasks/complete/${id}`);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await authorizedAxios.delete(`/tasks/${id}`);
  return res.data;
};

export const markTaskNotComplete = async (id) => {
  const res = await authorizedAxios.patch(`/tasks/not-complete/${id}`);
  return res.data;
};

export const updateTaskName = async (id, newName) => {
  const res = await authorizedAxios.patch(`/tasks/update-task-name/${id}`, { name: newName });
  return res.data;
};