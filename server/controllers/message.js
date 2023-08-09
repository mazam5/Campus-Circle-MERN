import Message from "../models/Message.js";
import ErrorHandler from "../utils/errorhandler.js";

// addMessage
export const createMessage = async(req,res,next)=> {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}

// get messages
export const getMessage = async(req,res,next)=> {
    const id = req.params.conversationId;
    try {
        const messages = await Message.find({conversationId:id})
        res.status(200).json(messages);
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}