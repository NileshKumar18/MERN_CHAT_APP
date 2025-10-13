import express from 'express'

export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params
        const messages = await messageModel.findById(chatId).populate("sender", "-password").populate("chat")
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
    
    const { content } = req.body;
    const {chatId} = req.params;
    const { userId } = req.user;
    if (!content || !chatId) {
        return res.status(400).json({
            message: "Content and chatId are required"
        })
    }

    const createdMessage = await messageModel.create({
        sender: userId,
        content: content,
        chat: chatId
    })
    const fullMessage = await messageModel.findById(createdMessage._id).populate("sender", "-password").populate("chat")
    await chatModel.findByIdAndUpdate(chatId, { latestMessage: fullMessage._id })
    res.status(200).json({
        success: true,
        message: "Message created successfully",
        data: fullMessage
    })


} catch (error) {
    res.status(500).json({
        success: false,
        message: "Error in creating message",
        error: error.message
    })
}

}