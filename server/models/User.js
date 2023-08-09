import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
    },
    lastName: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required : [true, "Please provide email"],
    },
    password: {
        type:String,
        required : [true, "Please provide password"],
        unique:false,
        select: false,
    },
    admin : {
        type:Boolean,
        default:false,
    },
    desc: String,
    location: String,
    occupation:String,
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    viewedProfiles:{
        type:Number,
        default:0
    },
    avatar: {
        type:String,
        default:""
    }
},
    {timestamps:true}

);

const user = mongoose.model("Users", userSchema);

export default user;

// verified : false