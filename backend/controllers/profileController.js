import express from 'express'

const profileController = async(req , res) =>{
    try {
        const data = req.user
        res.status(200).json({
            success : true,
            message : "User profile fetched successfully",
            data : data
        })                          
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error in fetching user profile",
            error : error.message
        })
    }

}

export default profileController