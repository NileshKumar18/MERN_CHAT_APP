import express from 'express'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateAcessToken, generateRefreshToken } from '../auth/Jwt.Contoller.js';

const signupController = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        const user = await userModel.findOne({ email: email })

        if (user) {
            return res.status(409).json({
                message: "Username / email already exist"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const createdUser = await userModel.create({
            username: username,
            email: email,
            password: hash,

        })

        const accessToken = generateAcessToken(createdUser)
        const refreshToken = generateRefreshToken(createdUser)
        createdUser.refreshToken = refreshToken,
            await createdUser.save()
        return res
            .cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: 'Lax', path: '/', maxAge: 7 * 24 * 60 * 60 * 1000 })
            .json({
                message: "User created Successfully",
                accessToken: accessToken
            })
        // const token = jwt.sign({ email: createdUser.email, userId: createdUser._id }, process.env.JWT_SECRET)
        // res
        //     .cookie("token", token, { httpOnly: true })
        //     .status(200).json({
        //         message: "User created Successfully"
        //     })


    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        console.log(error);

    }


}

export default signupController