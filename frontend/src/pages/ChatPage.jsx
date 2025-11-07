import React, { use } from 'react'
import { IoMdSend } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const ChatPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/users/checkAuth", { withCredentials: true })
                console.log(res.data);

            } catch (error) {
                console.error("❌ Auth failed:", error.response?.data?.message);

                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate("/login");
                }
            }
        }
        checkAuth();
    }, [navigate]);

    return (
        <>
            <div className="flex h-screen">

                <div className=" border-r-2 bg-gradient-to-br from-[#1a0933] via-[#2d1b4e] to-[#1a0933] backdrop-blur-md border-b-2 border-purple-600/30  w-[300px] min-h-screen ">

                    <div className="p-4 bg-[#140528]/90 backdrop-blur-md border-b-2 border-purple-600/30
                          text-purple-400 text-3xl text-shadow-2xs shadow-[0_0_20px_rgba(168,85,247,0.5)]   border-r-2 font-semibold italic    cursor-pointer  select-none ">
                        &lt;/Chatify&gt;
                    </div>

                </div>

                <div className="flex-1 flex flex-col bg-gradient-to-br from-[#1a0933] via-[#2d1b4e] to-[#1a0933] ">

                    <div className="bg-[#140528]/90 border-b-2 border-purple-600/30 text-white h-[80px] flex items-center justify-between px-4 ">
                        <div className='flex felx-col items-center'>
                            <input className='w-[50px] h-[50px] rounded-full' type="image" src="https://img.freepik.com/free-photo/portrait-beautiful-purebred-pussycat-with-shorthair-orange-collar-neck-sitting-floor-reacting-camera-flash-scared-looking-light-indoor_8353-12551.jpg?semt=ais_hybrid&w=740&q=80" alt="" />


                            <p className='ml-2 font-roboto text-xl'>Chat Header</p>
                        </div>
                        <div className='flex items-center'>
                            <IoCall size={24} className=" ml-4  text-white-700 bg-[#140528]/90 backdrop-blur-md border-t-2 border-purple-600/30 w-[40px] h-[40px] p-1 rounded-full" />
                            <IoVideocam size={24} className=" ml-4  text-white-700 bg-[#140528]/90 backdrop-blur-md border-t-2 border-purple-600/30 w-[40px] h-[40px] p-1 rounded-full" />
                            <CiMenuKebab size={24} className=" ml-4  text-white-700 bg-[#140528]/90 backdrop-blur-md border-t-2 border-purple-600/30 w-[40px] h-[40px] p-1 rounded-full" />
                        </div>
                    </div>


                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="mb-2">
                            <p className="  bg-purple-600/20 backdrop-blur-md border border-purple-600/30 text-white text-xl font-poppins  p-4 rounded-tr-[14px] rounded-br-[14px] rounded-tl-[14px] inline-block">Hello!</p>
                        </div>
                        <div className="mb-2 text-right">
                            <p className="bg-gradient-to-br from-purple-700 to-purple-400 shadow-[0_4px_20px_rgba(168,85,247,0.4)] text-xl font-poppins text-white rounded-tr-[14px] rounded-bl-[14px] rounded-tl-[14px] p-4 inline-block">Hi there!</p>
                        </div>
                    </div>


                    <div className="bg-[#140528]/90 border-t-2 border-b-2 border-purple-600/30 h-[50px] flex items-center p-8   ">
                        <input
                            className="border border-purple-600/30 shadow-[0_0_20px_rgba(168,85,247,0.5)]  text-white focus:outline-none rounded-full h-10 px-4 w-full"
                            type="text"
                            placeholder="Type a message..."

                        />
                        <button className='bg-gradient-to-br from-purple-700 to-purple-400 shadow-[0_4px_15px_rgba(168,85,247,0.4)]
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
