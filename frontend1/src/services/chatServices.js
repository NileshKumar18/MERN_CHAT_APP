import api from '../api/axios.js';

export const getAllUsers = async () => {
    return api.get("/api/users/getAll");
}

export const createChat = async (targetUserId) => {
    return api.post('/api/chat/createChat', { content: targetUserId });
}

