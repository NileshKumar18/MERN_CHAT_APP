

import AuthProvider from './auth/AuthProvider'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import ChatPage from './pages/ChatPage'
import Login from './pages/Login'
function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
