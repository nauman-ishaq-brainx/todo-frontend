import { io } from "socket.io-client";

const socket = io("http://localhost:8000"); // Or use REACT_APP_SOCKET_URL if set in .env

export default socket;
