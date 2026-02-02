
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import { generateAcessToken, generateRefreshToken } from "../auth/Jwt.Contoller.js"


export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    // console.log(refreshToken);

    if (!refreshToken) {
        return res.status(401)
            .json({
                message: "No refresh token",
                success: false
            })
    }
    const decoded = jwt.verify(refreshToken, process.env.Refresh_Token_Secret)

    const user = await userModel.findById(decoded.userId)
    if (!user) {
        return res.status(401)
            .json({
                message: "User Not Found",
                success: false
            })
    }
    if (user.refreshToken != refreshToken) {
        return res.status(401)
            .json({
                message: "Invalid Refresh Token",
                success: false
            })
    }
    const accessToken = generateAcessToken(user)
    const newRefreshToken = generateRefreshToken(user)
    user.refreshToken = newRefreshToken
    await user.save()
    return res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 })
        .status(200)
        .json({
            accessToken: accessToken,

        })

}
