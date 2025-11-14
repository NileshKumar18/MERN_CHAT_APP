import express from "express";
import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import chat from "../models/chatModel.js";

export const createChat = async (req, res) => {
    try {
        const { userId } = req.user
        const loggedInUserId = userId
        const content = req.body
        const targetUserId = content.content






        const targetUser = await userModel.findById(targetUserId)
        // console.log(targetUser);


        const chat = await chatModel.findOne({
            users: {
                $all: [loggedInUserId, targetUserId]
            }
        })
        // console.log(chat);

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
        // console.log(createdChat);

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

export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await messageModel.find({ chat: chatId }).populate("users", "-password").populate("latestMessage")
        if (!messages) {
            return res.status(404).json({
                message: "Messages not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data: messages
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in fetching messages",
            error: error.message,
        })
    }
}
export const getAllChats = async (req, res) => {
    try {
        const { userId } = req.user;
        const chats = await chatModel.find({ users: userId })
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });
            // console.log(chats);
            

        res.status(200).json({
            success: true,
            message: "All chats fetched successfully",
            data: chats,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching chats",
            error: error.message,
        });
    }
};
