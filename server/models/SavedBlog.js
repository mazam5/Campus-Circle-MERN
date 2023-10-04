import mongoose from "mongoose"

const SavedBlogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    savedBlog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    }]
},
    {timestamps:true}
);


const SavedBlog = mongoose.model("SavedBlog", SavedBlogSchema)

export default SavedBlog