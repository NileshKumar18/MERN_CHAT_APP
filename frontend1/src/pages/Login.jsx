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
      navigate("/chat", { replace: true });
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data?.message);
      if (error.response?.status === 404) {
        navigate("/signup");
      }
    }
  }



  return (
    <div className="min-h-screen px-4 md:px-10 bg-linear-to-b from-cyan-200 via-violet-400 to-purple-500 flex justify-center items-center md:items-center">

      <div className="bg-white flex flex-col md:flex-row rounded-2xl shadow-2xl/30 w-full max-w-6xl min-h-[90vh] md:min-h-[80vh] overflow-hidden">

        <div className="hidden md:flex bg-linear-to-b p-0.5 from-cyan-200 via-violet-400 to-purple-500 border-r-2 border-cyan-300 w-1/3 flex-col">

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
        <div className="flex justify-center items-center min-h-full py-30 w-full md:w-2/3 bg-red-50 px-4">

          <div className="w-full max-w-md backdrop-blur-xl  shadow-2xl shadow-purple-400/40 p-6 rounded-2xl">


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
                className="w-full md:w-3/4 mx-auto block mt-6 p-2 rounded-full text-xl font-semibold
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
