import { useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/Login'
import ChatPage from './pages/ChatPage'

import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
       
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
