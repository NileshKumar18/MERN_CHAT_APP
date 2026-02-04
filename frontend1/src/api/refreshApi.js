import axios from 'axios';

const refreshApi = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})
export default refreshApi;