import React from 'react'
import axios from "axios"

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const signup = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/users/signup", formData, { withCredentials: true })
            console.log(res.data);
            setFormData({
                username: "",
                email: "",
                password: ""
            })
            setShowPassword(false);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-screen relative flex justify-between items-center  bg-[url('/login-page-image.jpg')] bg-cover bg-center">
            <div className='text-purple-500 select-none text-4xl font-semibold shadow-2xl shadow-purple-900  absolute top-1.5 px-[25px] w-full border-b-2 py-2 italic border-purple-900 '> &lt;/Chatify&gt;</div>
            <div className='bg-transparent backdrop-blur-sm shadow-2xl shadow-purple-900 border-2 p-5 border-purple-700  absolute w-[600px] h-[500px] rounded-2xl ml-[100px]  ' >
                <h1 className='text-white text-center text-4xl select-none font-semibold font-roboto '>Create your account</h1>
                <p className='text-center text-[#fff]/40 select-none mb-[30px]'>Already have an account? <a href="/login" className='text-purple-600 underline hover:text-purple-700'>Login</a></p>


                <form onSubmit={handleSubmit}>

                    <label htmlFor="name" className='text-[#fff] select-none ml-4 mb-2.5'>Username</label>
                    <input type="text" name="username" id="" placeholder='Enter the Username...' value={formData.username} onChange={handleChange} autoComplete='off' className='border  mb-3.5 text-[#fff] focus:outline-none border-purple-700 rounded-full h-10 px-4 w-full' />


                    <label htmlFor="email" className='text-[#fff] select-none ml-4 mb-2.5'>Email</label>
                    <input type="email" name="email" id="" placeholder='Enter the Email...' value={formData.email} onChange={handleChange} className='border  mb-3.5 text-[#fff] focus:outline-none border-purple-700 rounded-full h-10 px-4 w-full' autoComplete='off' />

                    <label htmlFor="password" className='text-[#fff] select-none ml-4 mb-2.5'>Password</label>
                    <div className='relative'>
                        <input type={showPassword ? "text" : "password"} name="password" id="" placeholder='Enter the Password...' value={formData.password} onChange={handleChange} className='border  mb-3.5 text-[#fff] select-none focus:outline-none border-purple-700 rounded-full h-10 px-4 w-full' autoComplete='off' />
                        <span className='absolute right-4 top-[40%] transform -translate-y-1/2' onClick={() => setShowPassword(!showPassword)} >
                            {showPassword ? <FaEye className=' text-xl text-white cursor-pointer' /> : <FaEyeSlash className=' text-xl text-white cursor-pointer' />}
                        </span>
                    </div>

                    <button type="submit">
                        <div className='bg-purple-700 select-none hover:bg-purple-800 w-[300px] ml-[125px] text-xl text-center rounded-full p-2 mt-5 text-white font-semibold cursor-pointer '>Create Account</div>
                    </button>
                </form>

            </div>
        </div>
    )
}

export default signup
