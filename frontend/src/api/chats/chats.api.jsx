 import api from '../axios.js';
 
 export const fetchChatsApi = async () => {
            try {
                const res = await api.get("/api/chat");
                console.log("from the fetch Chats", res.data);


                setChats(res.data.data);

            } catch (error) {
                console.error("❌ Fetch chats failed:", error.response?.data?.message);
            }

        }