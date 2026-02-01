// here the response interceptor interpts all the response that are coming from from the server , Basically it checks for the the error like 401 , 403 or those which arer related to unauthorization ,To  check that the accessToken is still valid or get expires if it expires then it runs the logic of the refresh token where it sends the request to the refresh route from where it get the new access token after getting the new access token it attaches it to the origial Request and retry it again without letting the user know
import { clearAccessToken, setAccessToken } from "../../components/tokenService.js"
import api from '../axios.js'
const responseInterceptor = async (error) => {
    const originalRequest = error.config

    if (originalRequest.url.includes('/api/auth/refresh')) {
        clearAccessToken()
        return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
            const res = await api.post("/api/auth/refresh")
            setAccessToken(res.data.accessToken)
            originalRequest.heades.Authorization = `Bearer ${res.data.accessToken}`
            return api(originalRequest)

        } catch (error) {
            clearAccessToken()
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
}

export default responseInterceptor