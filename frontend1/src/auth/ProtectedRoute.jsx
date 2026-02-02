import React from 'react'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const { authLoading, isAuthenticated } = useContext(AuthContext)

    if (authLoading) return <div>Loading...</div>

    if (!isAuthenticated) return <Navigate to="/login" />

    return { children }
}

export default ProtectedRoute
