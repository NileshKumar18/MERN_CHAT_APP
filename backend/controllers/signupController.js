import express from 'express'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userModel.find({ email: email })
        if (user) {
            return res.status(401).json({
                message: "Username / email already exist"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const createdUser = await userModel.create({
            username: username,
            email: email,
            password: hash,
            isOnline: false,
        })
        const token = jwt.sign({ email:user.email , userId : user._id }, process.env.JWT_SECRET)
        res
            .cookie("token", token)
            .status(200).json({
                message: "User created Successfully"
            })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        console.log(error);

    }


}

export default signupController