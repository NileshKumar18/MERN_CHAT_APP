import React, { createContext, useState, useEffect } from 'react'
import api from '../api/axios.js'
import { clearAccessToken, setAccessToken } from '../utils/tokenServices.js';


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const res = await api.get('/api/auth/refresh')
                setAccessToken(res.data.accessToken)
                setIsAuthenticated(true)
            } catch (error) {
                clearAccessToken()
                setIsAuthenticated(false)
            } finally {
                setAuthLoading(false)
            }
        }
        restoreSession()
    }, [])

    return (
        <AuthContext.Provider value={{ authLoading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
