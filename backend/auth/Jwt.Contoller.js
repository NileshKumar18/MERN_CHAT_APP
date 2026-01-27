import express from 'express';
import jwt from 'jsonwebtoken';

export const generateAcessToken = (user) => {
    return jwt.sign({
        userId: user._id,
        email: user.email
    },
        process.env.Access_Token_Secret,
        {
            expiresIn: "15m"
        })
}


export const generateRefreshToken = (user) => {
    return jwt.sign({
        userId: user._id
    },
        process.env.Refresh_Token_Secret,
        {
            expiresIn: "7d"
        })

}