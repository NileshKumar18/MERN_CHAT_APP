import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { setAccessToken } from '../utils/tokenServices.js'
import { loginUser } from '../services/authServices.js';

// background: #25e8e5;
// background: linear-gradient(90deg, rgba(37, 232, 229, 1) 9%, rgba(181, 34, 164, 0.96) 65%);

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      setAccessToken(res.data.accessToken);
      setFormData({
        email: "",
        password: ""
      });
      setShowPassword(false);
      navigate("/chat" , {replace:true});
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data?.message);
      if (error.response?.status === 404) {
        navigate("/signup");
      }
    }
  }



  return (
    <div className="p-10 bg-linear-to-b from-cyan-200 via-violet-400 to-purple-500 h-screen flex justify-center items-center">
      <div className='bg-white flex  rounded-2xl shadow-2xl/30   h-[90vh] w-[90vw]  '>
        <div className="bg-linear-to-b p-0.5 from-cyan-200 via-violet-400 to-purple-500 border-r-2 border-cyan-300 rounded-l-2xl h-full w-1/3">
          <div className=" h-40 w-full rounded-l-xl flex justify-center items-center flex-col mt-20 ">
            <img className='invert' width={80} src="image.png" alt="" />
            <p className='text-4xl font-semibold text-white'><span>&lt;</span> Chatify<span>/&gt;</span></p>
          </div>
          <div className="text-white text-4xl mt-4 flex justify-center px-10 flex-col text-wrap items-center">Share your smile with <span className='text-center'>this world</span>  </div>
          <div className="flex flex-col justify-center items-center mt-10">
            <img className=' brightness-0 invert' width={80} src="peppermint-tea.png" alt="" />
            <p className='text-white text-3xl  mt-6'>Enjoy...!</p>
          </div>
        </div>
        <div className="flex rounded-r-xl justify-center w-2/3 items-center bg-red-50">
          <div className=" w-150 max-w-[90%] h-125
                
                backdrop-blur-xl shadow-2xl shadow-purple-400/40 
                p-6 rounded-2xl">

            <h1 className="text-[#34495E] text-center text-4xl font-semibold font-roboto">
              Login to your account
            </h1>

            <p className="text-center text-[#34495E] mb-8">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-purple-700 hover:text-cyan-700 transition"
              >
                Create Account
              </a>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[#34495E] ml-4 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter the Email..."
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full h-10 px-4 rounded-full
                   bg-white/70 text-[#34495E]
                   border-2 border-cyan-400
                   focus:outline-none focus:border-purple-500
                   shadow-lg"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-[#34495E] ml-4 mb-1">
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter the Password..."
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="off"
                    className="w-full h-10 px-4 rounded-full
                     bg-white/70 text-[#34495E]
                     border-2 border-cyan-400
                     focus:outline-none focus:border-purple-500
                     shadow-lg"
                  />

                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEye className="text-xl text-[#34495E]" />
                    ) : (
                      <FaEyeSlash className="text-xl text-[#34495E]" />
                    )}
                  </span>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-75 mx-auto block mt-6 p-2 rounded-full text-xl font-semibold
                 bg-linear-to-r from-cyan-400 via-violet-500 to-purple-500
                 text-white shadow-xl
                 hover:scale-105 transition-transform"
              >
                Login
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login;
