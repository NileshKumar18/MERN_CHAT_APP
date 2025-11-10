import express from 'express'
import messageModel from '../models/messageModel.js';
import chatModel from '../models/chatModel.js';

export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params
        // console.log(chatId);
        // console.log("...........................................................................");
        
        
        const messages = await messageModel.find({ chat: chatId }).populate("sender", "-password").populate("chat")
        // console.log(messages);
        
        res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data: messages
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in fetching messages",
            error: error.message
        })
    }
}
export const createMessages = async (req, res) => {
    try {
        // console.log("💬 Incoming create message request...");
        // console.log("➡️ chatId:", req.params.chatId);
        // console.log("➡️ user:", req.user);
        // console.log("➡️ content:", req.body.content);

        const { content } = req.body;
        const { chatId } = req.params;
        const { userId } = req.user;  // <-- verify this exists!

        if (!content || !chatId) {
            return res.status(400).json({
                message: "Content and chatId are required",
            });
        }

        const createdMessage = await messageModel.create({
            sender: userId,
            content,
            chat: chatId,
        });
        // console.log(createdMessage);
        

        const fullMessage = await messageModel
            .findById(createdMessage._id)
            .populate("sender", "-password")
            .populate("chat");
            // console.log(fullMessage);

        await chatModel.findByIdAndUpdate(chatId, { latestMessage: fullMessage._id });

        res.status(200).json({
            success: true,
            message: "Message created successfully",
            data: fullMessage,
        });
    } catch (error) {
        console.error("❌ Error in creating message:", error);
        res.status(500).json({
            success: false,
            message: "Error in creating message",
            error: error.message,
        });
    }
};
