import React, { use } from 'react'
import { IoMdSend } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
import { useRef } from 'react';
import chat from '../../../backend/models/chatModel';





const ChatPage = () => {
    const socket = useRef(null);
    const navigate = useNavigate();
    const [typingUser, setTypingUser] = useState(null);
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
        if (!message.trim()) return;

        const msgToSend = message.trim();
        setMessage("");

        try {

            const res = await axios.post(
                `http://localhost:3000/api/messages/${chatId}`,
                { content: msgToSend },
                { withCredentials: true }
            );

            const newMsg = res.data.data;


            if (socket.current) {
                socket.current.emit("sendMessage", newMsg);
            }

        } catch (error) {
            console.error("❌ Send message failed:", error.response?.data?.message || error.message);
        }
    };

    const handleTyping = () => {
        if (socket.current) {
            socket.current.emit("typing", { senderId: userId, chatId });
            console.log("💬 Typing event emitted via socket");
        }
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("typing", ({ senderId, chatId: typingChatId }) => {
                if (typingChatId === chatId && senderId !== userId) {
                    setTypingUser(senderId);
                    setTimeout(() => setTypingUser(null), 2000);
                }
            });
        }
        return () => {
            socket.current.off("typing", handleTyping);
        };
    }, [chatId, userId]);

    useEffect(() => {
        if (!socket.current) {
            socket.current = io("http://localhost:3000", { withCredentials: true });

            socket.current.on("connect", () => {

            });

            socket.current.onAny((event, data) => console.log("📡 SOCKET EVENT:", event, data));
        }

        if (chatId) {

            socket.current.emit("joinChat", chatId);
        }

        const handleReceiveMessage = (newMessage) => {
            console.log("📩 Message received:", newMessage);
            if (newMessage.chat._id === chatId) {  // ✅ fixed check
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        socket.current.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.current.off("receiveMessage", handleReceiveMessage);
        };
    }, [chatId]);



    useEffect(() => {
        if (socket.current && chatId) {
            socket.current.emit("joinChat", chatId);
        }
    }, [chatId]);



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
        const fetchChats = async () => {
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

            setChatId(res.data.data._id);


        } catch (error) {
            console.error("❌ Select chat failed:", error.response?.data?.message);
        }



    }





    useEffect(() => {
        const fetchMessages = async () => {

            if (!selectedChat) return;

            try {
                const res = await axios.get(`http://localhost:3000/api/messages/${chatId}`, { withCredentials: true });

                setMessages(res.data.data);
            } catch (error) {
                console.error("❌ Fetch messages failed:", error.response?.data?.message);

            }
        }
        fetchMessages();
    }, [chatId]);









    return (
        <>
            <div className="flex h-screen">


                <div className="border-r-2 bg-[#F5EFE1] w-[300px] min-h-screen border-[#5FA1A7]/50">


                    <div className="p-4 bg-[#EC8F7D]/20 backdrop-blur-sm border-b-2 border-[#5FA1A7]/30
            text-[#34495E] text-3xl font-semibold italic border-r-2 cursor-pointer select-none">
                        &lt;/Chatify&gt;
                    </div>


                    <div>
                        {chats.map((chat) => {
                            const receiverId = chat.users.find((id) => id._id !== userId);


                            return (
                                <div
                                    key={chat._id}
                                    onClick={() => handleSelectChat(chat.chatName, receiverId._id)}

                                    className={`px-2 py-2 border-b-2 border-[#5FA1A7]/30 cursor-pointer flex flex-col text-left transition duration-150 ease-in-out hover:bg-[#5FA1A7]/40
                            ${selectedChat === chat.chatName ? "bg-[#ADD7DD]" : ""}`}
                                >
                                    <h4 className='text-xl text-[#34495E]'>{chat.chatName || "Chat"}</h4>
                                    <p className='text-sm text-[#5FA1A7] truncate'>{chat.latestMessage?.content || "No messages yet"}</p>
                                </div>
                            )
                        })}

                    </div>

                </div>


                <div className="flex-1 flex flex-col bg-[#F5EFE1]">

                    {/* Chat Header */}
                    <div className="bg-[#ADD7DD] border-b-2 border-[#5FA1A7]/30 text-[#34495E] h-[80px] flex items-center justify-between px-4">
                        <div className='flex items-center'>
                            <input className='w-[50px] h-[50px] rounded-full' type="image" src="https://img.freepik.com/free-photo/portrait-beautiful-purebred-pussycat-with-shorthair-orange-collar-neck-sitting-floor-reacting-camera-flash-scared-looking-light-indoor_8353-12551.jpg?semt=ais_hybrid&w=740&q=80" alt="" />

                            {selectedChat ? (
                                <div className='ml-4'>
                                    <div className="text-[#34495E] text-xl">
                                        {selectedChat}
                                    </div>
                                    {typingUser && (
                                        <div className="text-[#EC8F7D] text-sm italic animate-pulse mt-1">
                                            typing...
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center ml-2.5 justify-center text-[#5FA1A7] text-xl">
                                    Select a chat to start messaging
                                </div>
                            )}


                        </div>
                        <div className='flex items-center'>

                            <IoCall size={24} className=" ml-4 text-[#34495E] hover:text-[#EC8F7D] transition-colors duration-150" />
                            <IoVideocam size={24} className=" ml-4 text-[#34495E] hover:text-[#EC8F7D] transition-colors duration-150" />
                            <CiMenuKebab size={24} className=" ml-4 text-[#34495E] hover:text-[#EC8F7D] transition-colors duration-150" />
                        </div>
                    </div>



                    <div className="flex-1 overflow-y-auto flex-wrap p-4">
                        {messages.map((msg) => {
                            const messageTime = new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            });
                            return (
                                <div key={msg._id} className={`mb-4 ${(msg.sender?._id || msg.sender) === userId ? "text-right " : "text-left"}`}>
                                    <p
                                        className={`inline-block p-2 max-w-[70%] break-all  text-xl font-poppins rounded-tr-[14px] rounded-tl-[14px] shadow-md
                                ${(msg.sender?._id || msg.sender) === userId
                                                ? "bg-[#5FA1A7] rounded-bl-[14px] text-white"
                                                : "bg-[#ADD7DD] rounded-br-[14px] text-[#34495E] border border-[#5FA1A7]/30"
                                            }`}
                                    >
                                        {msg.content}
                                        <br />

                                        <span className='text-sm mt-2 text-right block text-[#34495E] opacity-70'>{messageTime}</span>
                                    </p>
                                </div>
                            )
                        })}

                    </div>


                    <div className="bg-[#ADD7DD]/50 border-t-2 border-[#5FA1A7]/30 h-[50px] flex items-center p-8">
                        <input
                            // REVISED UI: Added focus ring for better accessibility and replaced dark input background
                            className="border border-[#5FA1A7] bg-white text-[#34495E] rounded-full h-10 px-4 w-full focus:ring-2 focus:ring-[#EC8F7D] focus:border-[#EC8F7D] focus:outline-none"
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    handleSend()
                                    handleTyping()
                                }
                            }}

                        />
                        <button
                            onClick={handleSend}
                            className='bg-[#EC8F7D] hover:bg-[#5FA1A7] shadow-md rounded-full p-2 ml-3 items-center justify-center flex transition-colors duration-300 ease-in-out hover:shadow-lg'
                        >
                            <IoMdSend size={24} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage
