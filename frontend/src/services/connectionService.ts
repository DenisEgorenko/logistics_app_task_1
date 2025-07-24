import {orderApi, routeApi, userApi} from '../api/axios';
import socket from '../api/socket';

// Проверка REST-сервисов
export const checkUserService = async (): Promise<boolean> => {
    try {
        const res = await userApi.get('/health');
        return res.status === 200;
    } catch {
        return false;
    }
};

export const checkOrderService = async (): Promise<boolean> => {
    try {
        const res = await orderApi.get('/health');
        return res.status === 200;
    } catch {
        return false;
    }
};

export const checkRouteService = async (): Promise<boolean> => {
    try {
        const res = await routeApi.get('/health');
        return res.status === 200;
    } catch {
        return false;
    }
};

// Проверка WebSocket соединения
export const checkWebSocketConnection = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if (socket.connected) {
            resolve(true);
        } else {
            const timer = setTimeout(() => resolve(false), 3000);

            const handleConnect = () => {
                clearTimeout(timer);
                socket.off('connect', handleConnect);
                resolve(true);
            };

            socket.on('connect', handleConnect);
        }
    });
};