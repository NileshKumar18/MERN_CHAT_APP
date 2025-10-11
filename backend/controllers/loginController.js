import express from 'express'
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ email:user.email , userId : user._id }, process.env.JWT_SECRET)
                return res
                    .cokkie("token", token)
                    .status(200)
                    .json({
                        message: "Login successfully"
                    })
            }
            else if (err) {
                return res.status(500).json({
                    message:"Internal Server Error"
                })
            }
            else{
                return res.status(401).json({
                    message:"Invalid credentials"
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export default loginController