import axios from 'axios';
import { clearAccessToken, getAccessToken, setAccessToken } from '../utils/tokenServices.js';
import refreshApi from './refreshApi.js';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})


api.interceptors.request.use((config) => {
    const token = getAccessToken()
    // console.log(token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

api.interceptors.response.use(

    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if (originalRequest.url.includes('/api/auth/refresh')) {
            clearAccessToken();
            window.location.replace('/login'); // replace, not href
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await refreshApi.get('/api/auth/refresh')
                setAccessToken(res.data.accessToken)
                originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
                return api(originalRequest);
            } catch (error) {
                clearAccessToken()
                // window.location.href = '/login'
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    })
export default api;