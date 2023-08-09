import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    conversationId : String,
    senderId : String,
    text:{
        type:String,
        required:true
    }
},
{timestamps:true}
);

const Message = mongoose.model("Message", messageSchema)

export default Message