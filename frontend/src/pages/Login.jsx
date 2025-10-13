import React from 'react'

const Login = () => {
    return (
        <div className='bg-[#061920] min-h-screen flex items-center justify-center'>
            <div className='bg-[#471886]/90  text-[#d4ecf7] flex   flex-col w-[600px] h-[500px] shadow-2xl p-4 rounded-2xl '>

                <h1 className='text-center text-[#c44ddf] text-3xl font-bold'>Login to your account</h1>
                <div className='flex justify-center  text-[#8dc6ea]  mb-5 border-b-2 border-[#8dc6ea]/20 pb-3'>
                    <p>Don't have an account?
                        <a className='underline hover:text-[#c44ddf]' href="/signup"> Sign Up</a>
                    </p>
                </div>
                <div className='min-h-[400px]'>
                    <form className='flex flex-col min-h-[400px]' action="">
                    
                    <label className='mb-1 ml-2 mt-1 text-[#8dc6ea]' htmlFor="email">Email:</label>
                    <input className='bg-[#061920]/60 focus:outline-none p-2 rounded-md  ' placeholder='Email' type="email" name="email" id="email" />
                    <label className='mb-1 ml-2 mt-1 text-[#8dc6ea]' htmlFor="password">Password:</label>
                    <input className='bg-[#061920]/60 focus:outline-none p-2 rounded-md  ' placeholder='Password' type="password" name="password" id="password" />
                    <div className='flex justify-center border-b-2 border-[#8dc6ea]/20 pb-3'>
                        <button className='mt-5 p-2 rounded-md hover:bg-[#c44ddf]/80 bg-[#c44ddf] w-[200px] text-xl font-semibold ' type="submit">Login</button>
                    </div>
                </form>
                </div>
                    
                
            </div>
        </div>
    )
}

export default Login
