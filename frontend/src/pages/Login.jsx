// import React from 'react'
// import { useState } from 'react';
// import axios from "axios"
// import './Login.css'

// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios.js';
// import { setAccessToken } from '@components/tokenService.js';
// // 

// const Login = () => {
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [formData, setFormData] = useState({

//         email: "",
//         password: ""
//     })
//     const handleChange = (e) => {
//         const { name, value } = e.target
//         setFormData({
//             ...formData,
//             [name]: value
//         })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await api.post("/api/users/login", formData)
//             // console.log("from login page" , res.data);
            
//             setAccessToken(res.data.accessToken)

//             setFormData({

//                 email: "",
//                 password: ""
//             })
//             setShowPassword(false);
//             navigate("/chat");
//             // console.log(res.data);
//         } catch (error) {
//             console.error("❌ Login failed:", error.response?.data?.message);
//             if (error.response?.status === 404) {
//                 navigate("/signup");
//             }
//         }

//     }
//     return (
//         <div className=" h-screen relative flex justify-center items-center  bg-[url('/Login.png')]  bg-center">
//             <div className='text-[#5FA1A7] text-center select-none  text-4xl underline  underline-offset-4 font-semibold  absolute top-1.5 px-[25px] w-full  py-2 italic  '> &lt;/Chatify&gt;</div>
//             <div className='t bg-[#F5EFE1]/50 backdrop-blur-lg shadow-2xl shadow-[#EC8F7D]   p-5   absolute w-[600px] h-[500px] rounded-2xl  ' >
//                 <h1 className='text-[#34495E] text-center text-4xl select-none  font-semibold font-roboto '>Login to your account</h1>
//                 <p className='text-center text-[#34495E] mb-[30px] select-none'>Don't have an account? <a href="/signup" className='create-account text-[#34495E] '>Create Account</a></p>

//                 <form onSubmit={handleSubmit}>

//                     <label htmlFor="email" className=' select-none text-[#34495E] ml-4 mb-2.5'>Email</label>
//                     <input type="email" name="email" id="" placeholder='Enter the Email...' value={formData.email} onChange={handleChange} className=' shadow-2xl shadow-[#EC8F7D] select-none  mb-3.5 text-[#34495E] focus:outline-none bg-[#F5EFE1] border-[#5FA1A7] border-2 rounded-full h-10 px-4 w-full' autoComplete='off' />

//                     <label htmlFor="password" className='text-[#34495E] select-none ml-4 mb-2.5'>Password</label>
//                     <div className='relative'>
//                         <input type={showPassword ? "text" : "password"} name="password" id="" placeholder='Enter the Password...' value={formData.password} onChange={handleChange} className='border-2 bg-[#F5EFE1] shadow-2xl shadow-[#EC8F7D]  mb-3.5 text-[#34495E] select-none focus:outline-none border-[#5FA1A7] rounded-full h-10 px-4 w-full' autoComplete='off' />

//                         <span className='absolute right-4 top-[40%] transform -translate-y-1/2' onClick={() => setShowPassword(!showPassword)} >
//                             {showPassword ? <FaEye className='select-none text-xl text-[#34495E] cursor-pointer' /> : <FaEyeSlash className='select-none text-xl text-[#34495E] cursor-pointer' />}
//                         </span>

//                     </div>
//                     <button type="submit">
//                         <div className=' login-btn bg-[#EC8F7D] select-none hover:bg-[#5FA1A7] w-[300px] ml-[125px] text-xl text-center rounded-full p-2 mt-5 text-[#34495E] font-semibold cursor-pointer '>Login</div>
//                     </button>
//                 </form>
//             </div>
//         </div>

//     )
// }

// export default Login
