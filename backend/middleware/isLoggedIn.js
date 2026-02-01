import express from 'express'
import jwt from 'jsonwebtoken'

const isLoggedIn = async (req, res, next) => {
    try {
        // console.log("access Token" , req.headers);

        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        


        if (!token) {
            return res.status(401).json({
                message: "Access denied ! No token provided"
            })
        }
        const decoded = jwt.verify(token, process.env.Access_Token_Secret)
        // console.log(decoded);
        
        req.user = decoded;
        next()

    } catch (error) {
        res.status(403).json({
            message: "Invalid or expire token"
        })
    }



}

export default isLoggedIn