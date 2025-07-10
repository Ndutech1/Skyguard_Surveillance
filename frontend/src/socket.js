import { io } from 'socket.io-client';

const socket = io('https://skyguard-surveillance.onrender.com', {
  transports: ['websocket'], // optional but more stable
});

export default socket;
