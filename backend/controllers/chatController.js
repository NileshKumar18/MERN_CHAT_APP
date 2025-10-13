import express from "express";
import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import chat from "../models/chatModel.js";

export const createChat = async (req, res) => {
    try {
        const { userId } = req.user
        const loggedInUserId = userId
        const { targetUserId } = req.body


        const targetUser = await userModel.findById(targetUserId)


        const chat = await chatModel.findOne({
            users: {
                $all: [loggedInUserId, targetUserId]
            }
        })
        if (chat) { 
           return res.status(200).json({
                sucess: true,
                message: "Chat already exists",
                data: chat
            })

        }
        const createdChat = await chatModel.create({
            users: [loggedInUserId, targetUserId],
            chatName: targetUser.username,
            latestMessage: null,
        })
        res.status(200).json({
            sucess: true,
            message: "Chat created successfully",
            data: createdChat
        })

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "Error in fetching/creating chat",
            error: error.message
        })
    }
}

export const getChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await chatModel.findById(chatId).populate("users", "-password").populate("latestMessage")
        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Chat fetched successfully",
            data: chat
        })


      
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in fetching chat",
            error: error.message,
        })
    }
}
