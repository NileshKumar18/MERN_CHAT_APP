import React from 'react'

const signup = () => {
    return (
        <div className='bg-[#061920] min-h-screen flex items-center justify-center'>
            <div className='bg-[#471886]/90  text-[#d4ecf7] flex   flex-col w-[600px] h-[500px] shadow-2xl p-4 rounded-2xl '>

                <h1 className='text-center text-[#c44ddf] text-3xl font-bold'>Create your account</h1>
                <div className='flex justify-center  text-[#8dc6ea]  mb-5 border-b-2 border-[#8dc6ea]/20 pb-3'>
                    <p>Already have an account?
                        <a className='underline hover:text-[#c44ddf]' href="/login"> Login</a>
                    </p>
                </div>
                <form className='flex flex-col' action="">
                    <label className='mb-1 ml-2 mt-1 text-[#8dc6ea]' htmlFor="userName">UserName:</label>
                    <input className='bg-[#061920]/60 focus:outline-none p-2 rounded-md  ' span placeholder='Username' type="text" name="userName" id="userName" />
                    <label className='mb-1 ml-2 mt-1 text-[#8dc6ea]' htmlFor="email">Email:</label>
                    <input className='bg-[#061920]/60 focus:outline-none p-2 rounded-md  ' placeholder='Email' type="email" name="email" id="email" />
                    <label className='mb-1 ml-2 mt-1 text-[#8dc6ea]' htmlFor="password">Password:</label>
                    <input className='bg-[#061920]/60 focus:outline-none p-2 rounded-md  ' placeholder='Password' type="password" name="password" id="password" />
                    <div className='flex justify-center'>
                        <button className='mt-5 p-2 rounded-md hover:bg-[#c44ddf]/80 bg-[#c44ddf] w-[200px] text-xl font-semibold ' type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default signup
