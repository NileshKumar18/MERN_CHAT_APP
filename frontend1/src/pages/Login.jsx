import React from 'react'
// background: #25e8e5;
// background: linear-gradient(90deg, rgba(37, 232, 229, 1) 9%, rgba(181, 34, 164, 0.96) 65%);

const Login = () => {
  return (
    <div className="p-10 bg-linear-to-b from-cyan-200 via-violet-400 to-purple-500 h-screen flex justify-center items-center">
      <div className='bg-white  rounded-2xl shadow-2xl/30   h-[90vh] w-[90vw]  '>
        <div className="bg-linear-to-b p-0.5 from-cyan-200 via-violet-400 to-purple-500 border-r-2 border-cyan-300 rounded-l-2xl h-full w-1/3">
          <div className=" h-40 w-full rounded-tl-2xl flex justify-center items-center flex-col mt-20 ">
            <img className='invert' width={80} src="image.png" alt="" />
            <p className='text-4xl font-semibold text-white'><span>&lt;</span> Chatify<span>/&gt;</span></p>
          </div>
          <div className="text-white text-4xl mt-4 flex justify-center px-10 flex-col text-wrap items-center">Share your smile with <span className='text-center'>this world</span>  </div>
          <div className="flex flex-col justify-center items-center mt-10">
            <img  className=' brightness-0 invert' width={80} src="peppermint-tea.png" alt="" />
            <p className='text-white text-3xl  mt-6'>Enjoy...!</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
