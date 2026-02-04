import api from '../api/axios.js';

export const sendMessage = async (chatId, content) => {
    return api.post(`/api/messages/${chatId}`, { content });
}
export const fetchMessages = async (chatId) => {
    return api.get(`/api/messages/${chatId}`);
}