import Chat from '../models/Chat.js'
import ErrorHandler from '../utils/errorhandler.js';

// create chat b/w two users
export const createChat = async(req,res,next) => {
    const newConversation = new Chat({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}

// All the list of chats of the user
export const userChat = async(req,res,next)=> {
    // const id = req.params.id;
    try {
        const chat = await Chat.find({
            members : {$in : [req.params.id]}
        })
        
        res.status(200).json(chat.reverse());
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error, 400));
    }
}

// specific chat of a user.
export const findChat = async(req,res,next) => {
    try {
        const chat = await Chat.findOne({
            members :{$all : [req.params.firstId, req.params.secondId]}
        })
        res.status(200).json(chat);
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}