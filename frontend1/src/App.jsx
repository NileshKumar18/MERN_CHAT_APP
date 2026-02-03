

import AuthProvider from './auth/AuthProvider'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import ChatPage from './pages/ChatPage'
import Login from './pages/Login'
import SignUp from './pages/SignupPage'
function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/chat' element={<ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
