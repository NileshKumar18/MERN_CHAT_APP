import React, { use } from 'react'
import { IoMdSend } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';




const ChatPage = () => {
    const navigate = useNavigate();
    const [targetId, setTargetId] = useState("");
    const [chatId, setChatId] = useState("");
    const [userId, setUserId] = useState("");
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const handleChange = (e) => {
        setMessage(e.target.value);

    }

    const handleSend = async () => {
        if (message.trim() === "") return;
        try {
            const res = await axios.post(`http://localhost:3000/api/messages/${chatId}`, { content: message }, { withCredentials: true });
            // console.log("Message sent:", res.data.data);
            setMessages((prev) => [...prev, res.data.data]);
            // console.log("Sending message:", message);
            setMessage("");
        } catch (error) {
            console.error("❌ Send message failed:", error.response?.data?.message);
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/users/checkAuth", { withCredentials: true })

                setUserId(res.data.data.userId);

            } catch (error) {
                console.error("❌ Auth failed:", error.response?.data?.message);

                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate("/login");
                }
            }
        }
        checkAuth();
    }, [navigate]);

    useEffect(() => {
        const fetchChats = async (page) => {
            try {
                const res = await axios.get("http://localhost:3000/api/chat", { withCredentials: true });

                setChats(res.data.data);
            } catch (error) {
                console.error("❌ Fetch chats failed:", error.response?.data?.message);
            }

        }
        fetchChats();
    }, []);

    const handleSelectChat = async (username, targetId) => {
        setSelectedChat(username);
        setTargetId(targetId);
        try {
            const res = await axios.post("http://localhost:3000/api/chat/createChat", { content: targetId }, { withCredentials: true });
            // console.log("Chat selected/created:", res.data.data);
            setChatId(res.data.data._id);
            // console.log(chatId);

        } catch (error) {
            console.error("❌ Select chat failed:", error.response?.data?.message);
        }

        // console.log(targetId);

    }





    useEffect(() => {
        const fetchMessages = async () => {
            // console.log(selectedChat);
            if (!selectedChat) return;

            try {
                const res = await axios.get(`http://localhost:3000/api/messages/${chatId}`, { withCredentials: true });
                // console.log("Fetched messages:", res.data.data);
                setMessages(res.data.data);
            } catch (error) {
                console.error("❌ Fetch messages failed:", error.response?.data?.message);

            }
        }
        fetchMessages();
    }, [chatId ]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`http://localhost:3000/api/users`, { withCredentials: true });

            // console.log(res.data);

            setUsers(res.data.data || []);
        };
        fetchUsers();
    }, []);


    return (
        <>
            <div className="flex h-screen">

                <div className=" border-r-2 bg-gradient-to-br from-[#1a0933] via-[#2d1b4e] to-[#1a0933] backdrop-blur-md border-b-2 border-purple-600/30  w-[300px] min-h-screen ">

                    <div className="p-4 bg-[#140528]/90 backdrop-blur-md border-b-2 border-purple-600/30
                          text-purple-400 text-3xl text-shadow-2xs shadow-[0_0_20px_rgba(168,85,247,0.5)]   border-r-2 font-semibold italic    cursor-pointer  select-none ">
                        &lt;/Chatify&gt;
                    </div>
                    <div>
                        {users.map(u => (
                            <div key={u._id} onClick={() => handleSelectChat(u.username, u._id)} className='border-b-2 border-purple-600/30 p-4 text-white hover:bg-purple-600/10 cursor-pointer'>
                                {u.username}
                            </div>
                        ))}
                    </div>

                </div>

                <div className="flex-1 flex flex-col bg-gradient-to-br from-[#1a0933] via-[#2d1b4e] to-[#1a0933] ">

                    <div className="bg-[#140528]/90 border-b-2 border-purple-600/30 text-white h-[80px] flex items-center justify-between px-4 ">
                        <div className='flex felx-col items-center'>
                            <input className='w-[50px] h-[50px] rounded-full' type="image" src="https://img.freepik.com/free-photo/portrait-beautiful-purebred-pussycat-with-shorthair-orange-collar-neck-sitting-floor-reacting-camera-flash-scared-looking-light-indoor_8353-12551.jpg?semt=ais_hybrid&w=740&q=80" alt="" />

                            {selectedChat ? (
                                <div className="p-4 text-white text-xl">
                                    {selectedChat}
                                </div>) : (
                                <div className="flex items-center ml-2.5 justify-center text-purple-300 text-xl">
                                    Select a chat to start messaging
                                </div>
                            )}


                        </div>
                        <div className='flex items-center'>
                            <IoCall size={24} className=" ml-4  text-white-700 bg-[#140528]/90 backdrop-blur-md border-t-2 border-purple-600/30 w-[40px] h-[40px] p-1 rounded-full" />
                            <IoVideocam size={24} className=" ml-4  text-white-700 bg-[#140528]/90 backdrop-blur-md border-t-2 border-purple-600/30 w-[40px] h-[40px] p-1 rounded-full" />
                            <CiMenuKebab size={24} className=" ml-4  text-white-700 bg-[#140528]/90 backdrop-blur-md border-t-2 border-purple-600/30 w-[40px] h-[40px] p-1 rounded-full" />
                        </div>
                    </div>


                    <div className="flex-1 overflow-y-auto  flex-wrap p-4">
                        {messages.map((msg) => {
                            return (
                                <div key={msg._id} className={`mb-4 ${(msg.sender?._id || msg.sender) === userId ? "text-right" : "text-left"}`}>
                                    <p
                                        className={`inline-block p-4 max-w-[70%] break-all  text-xl font-poppins  ${(msg.sender?._id || msg.sender) === userId
                                            ? "bg-gradient-to-br from-purple-700 to-purple-400 rounded-tr-[14px] rounded-bl-[14px] rounded-tl-[14px]  text-white shadow-[0_4px_20px_rgba(168,85,247,0.4)]"
                                            : "bg-purple-600/20 border border-purple-600/30 rounded-tr-[14px] rounded-br-[14px] rounded-tl-[14px] text-white backdrop-blur-md"
                                            }`}
                                    >
                                        {msg.content}
                                    </p>
                                </div>
                            )
                        })}

                    </div>


                    <div className="bg-[#140528]/90 border-t-2 border-b-2 border-purple-600/30 h-[50px] flex items-center p-8   ">
                        <input
                            className="border border-purple-600/30 shadow-[0_0_20px_rgba(168,85,247,0.5)]  text-white focus:outline-none rounded-full h-10 px-4 w-full"
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    handleSend()
                                }
                            }}

                        />
                        <button onClick={handleSend} className='bg-gradient-to-br from-purple-700 to-purple-400 shadow-[0_4px_15px_rgba(168,85,247,0.4)]
                                    hover:from-purple-800 hover:to-purple-600 hover:shadow-[0_6px_20px_rgba(168,85,247,0.6)] rounded-full p-2 ml-3 hover:bg-[#0077e6] items-center justify-center flex'>
                            <IoMdSend size={24} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChatPage
