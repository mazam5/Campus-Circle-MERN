import mongoose from "mongoose";

const charSchema = new mongoose.Schema({
    members: {
        type:Array,
    }
},
    {timestamps:true}
);

const chat = mongoose.model("Chat", charSchema);

export default chat;