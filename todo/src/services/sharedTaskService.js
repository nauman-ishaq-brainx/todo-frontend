import authorizedAxios from "../axios/authorized";

export const shareTask = async ({ taskId, email }) => {
    console.log('sharing task')
  const response = await authorizedAxios.post(`/share-task/${taskId}`, {
    receiverEmail: email,
  });
  return response.data;
};


export const acceptSharedTask = async (id) => {
  const res = await authorizedAxios.patch(`/share-task/accept/${id}`);
  return res.data;
};

export const rejectSharedTask = async (id) => {
  const res = await authorizedAxios.patch(`/share-task/reject/${id}`);
  return res.data;
};

export const getReceivedSharedTasks = async () => {
  const res = await authorizedAxios.get("/share-task/received");
  return res.data;
};

export const getSentSharedTasks = async () => {
  const res = await authorizedAxios.get("/share-task/sent");
  return res.data;
};
export const getAcceptedSharedTasks = async () => {
  const res = await authorizedAxios.get("/share-task/accepted-tasks");
  return res.data.sharedTasks;
};

export const deleteSharedTaskAsReceiver = async (id) => {
  return await authorizedAxios.delete(`/share-task/${id}`);
};
