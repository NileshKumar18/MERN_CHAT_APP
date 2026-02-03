import React, { createContext, useState, useEffect } from 'react'
import api from '../api/axios.js'
import { clearAccessToken, setAccessToken } from '../utils/tokenServices.js';


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await api.get('/api/auth/refresh')
                setAccessToken(res.data.accessToken)
                const resUser = await api.get('/api/users/me')

                setUser(resUser.data.data)
            } catch (error) {
                console.log("Auth failed");
                
                setUser(null)
            } finally {
                setAuthLoading(false)
            }
        }
        loadUser()
    }, [])

    return (
        <AuthContext.Provider value={{ authLoading,
         user,
          isAuthenticated: !!user,}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
