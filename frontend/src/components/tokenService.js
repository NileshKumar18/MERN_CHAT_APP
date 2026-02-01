

let accessToken = null
// console.log("tokenService loaded", Math.random())


export const getAccessToken = () => {
    // console.log("accessToken in getAccessToken", accessToken);

    return accessToken
}

export const setAccessToken = (token) => {
    // console.log("setting access token", token);
    accessToken = token
    // console.log("accessToken in setAccessToken", accessToken);
}

export const clearAccessToken = () => {
    accessToken = null;

}
