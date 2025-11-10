import express from 'express'
import jwt from 'jsonwebtoken'

const isLoggedIn = async( req , res , next) =>{
    try {

        const token = req.cookies.token
       
        
        if(!token){
          return  res.status(401).json({
                message:"Access denied ! No token provided"
            })
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded;
        next()

    } catch (error) {
        res.status(403).json({
            message:"Invalid or expire token"
        })
    }



}

export default isLoggedIn