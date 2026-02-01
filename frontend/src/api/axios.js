//  i have to create a instance of axios with default base url

import axios from 'axios'
import requestInterceptor from './interceptors/requestInterceptor.js'
import responseInterceptor from './interceptors/responseInterceptor.js'

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})
api.interceptors.request.use(requestInterceptor)
api.interceptors.response.use(
    response => response,
    responseInterceptor,

)
export default api