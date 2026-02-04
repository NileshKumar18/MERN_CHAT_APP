
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateAcessToken, generateRefreshToken } from '../auth/Jwt.Contoller.js';

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res
                .status(404)
                .json({
                    message: "User does not exist"
                })
        }
        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                const accessToken = generateAcessToken(user)
                const refreshToken = generateRefreshToken(user)
                const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET)
                // now i have to save the refresh token in the db
                user.refreshToken = refreshToken,
                    await user.save()
                return res
                    .cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: 'Lax',
                        path: '/', maxAge: 7 * 24 * 60 * 60 * 1000 })
                    .json({
                        message: "Login successfully",
                        accessToken: accessToken
                    })
                // return res
                //     .cookie("token", token, { httpOnly: true })
                //     .status(200)
                //     .json({
                //         message: "Login successfully"
                //     })
            }
            else if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                })
            }
            else {
                return res.status(401).json({
                    message: "Invalid credentials"
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export default loginController