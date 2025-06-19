import authorizedAxios from "../axios/authorized";

export const getAllTasks = async (page, limit=5) => {
  const res = await authorizedAxios.get(`/tasks?page=${page}&limit=${limit}`);
  return res.data;
};

export const addTask = async ({ name, dueDate }) => {
  const res = await authorizedAxios.post("/tasks", { name, dueDate });
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