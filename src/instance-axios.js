import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    //baseURL: 'https://apinode-production-b096.up.railway.app',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});


