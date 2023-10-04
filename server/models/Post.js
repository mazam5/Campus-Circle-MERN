import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    image: String,
    desc: String,
    comments: [{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        comment:{
            type:String,
            required:true
        }
    }],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ]},
    {timestamps:true}
)

const post = mongoose.model("Post", PostSchema);

export default post;