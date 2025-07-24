import { io } from 'socket.io-client';
const notifPort = import.meta.env.VITE_NOTIF_SERVICE_PORT || '3004';

const socket = io(`http://localhost:${notifPort}`, {
    autoConnect: true,
    transports: ['websocket']
});

export default socket;