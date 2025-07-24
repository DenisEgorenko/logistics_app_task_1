import axios from 'axios';

const userPort = import.meta.env.VITE_USER_SERVICE_PORT || '3000';
const orderPort = import.meta.env.VITE_ORDER_SERVICE_PORT || '3001';
const routePort = import.meta.env.VITE_ROUTE_SERVICE_PORT || '3002';


export const userApi = axios.create({
    baseURL: `http://localhost:${userPort}/`,
    timeout: 5000
});

export const orderApi = axios.create({
    baseURL: `http://localhost:${orderPort}/`,
    timeout: 5000
});

export const routeApi = axios.create({
    baseURL: `http://localhost:${routePort}/`,
    timeout: 5000
});