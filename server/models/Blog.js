import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    },
    photo:{
        type:String
    },
    likedBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
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
    views: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    readingTime:{
        type:Number,
    },
    category: {
        type:Array,
        required:true
    }
},
    {timestamps:true}
);

function calculateReadingTime(content) {

    const wordsPerMinute = 505; 
  
    const wordCount = content.split(/\s+/).length;
  
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
    return readingTimeMinutes;
  }

  blogSchema.pre('save', function (next) {
    this.readingTime = calculateReadingTime(this.content);
    next();
  });

const blog = mongoose.model("Blog", blogSchema)

export default blog