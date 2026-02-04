import React, { createContext, useState, useEffect } from 'react'
import api from '../api/axios.js'
import { clearAccessToken, setAccessToken } from '../utils/tokenServices.js';
import refreshApi from '../api/refreshApi.js';


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                // 1️⃣ Try normal auth first
                const resUser = await api.get('/api/users/me')
                setUser(resUser.data.data)
            } catch (err) {
                try {
                    // 2️⃣ Only then try refresh
                    const res = await refreshApi.get('/api/auth/refresh')
                    setAccessToken(res.data.accessToken)

                    // 3️⃣ Retry /me
                    const resUser = await api.get('/api/users/me')
                    setUser(resUser.data.data)
                } catch (err) {
                    // 4️⃣ Truly unauthenticated
                    clearAccessToken()
                    setUser(null)
                }
            } finally {
                setAuthLoading(false)
            }
        }

        loadUser()
    }, [])

    return (
        <AuthContext.Provider value={{
            authLoading,
            user,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
