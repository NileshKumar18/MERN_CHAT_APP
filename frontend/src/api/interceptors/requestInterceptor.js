//  here i have to write the req interceptor . It intercepts all the request are being made from the frontend side and it means all the request at first goes to it where it attaches the access token to the request and after that it send it to the server for the response

import { getAccessToken } from "@components/tokenService.js"

const requestInterceptor = (config) => {

    // console.log("request Interceptor get hit");

    if (config.url.includes('/api/auth/refresh')) {
        return config
    }

    const accessToken = getAccessToken()


    if (accessToken) {


        config.headers.Authorization = `Bearer ${accessToken}`





    }
    return config

}
export default requestInterceptor