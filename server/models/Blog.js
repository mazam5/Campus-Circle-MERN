import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    userId: String,
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    },
    coding: {
        type: Array
    },
    hr: {
        type: Array
    },
    tr:{
        type: Array
    },
    puzzles:{
        type: Array
    },
    prepSuggestions:String,
    photo:{
        type:String,
        required:true
    },
    category: {
        type:Array,
        required:false
    }
},
    {timestamps:true}
);

const blog = mongoose.model("blog", blogSchema)

export default blog