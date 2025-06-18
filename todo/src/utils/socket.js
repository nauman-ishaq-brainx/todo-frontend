import { io } from "socket.io-client";

const BASE_URL = process.env.REACT_APP_SOCKET_URL;
const socket = io(BASE_URL); 

export default socket;
