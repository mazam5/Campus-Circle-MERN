import Post from "../models/Post.js";
import User from "../models/User.js";
import ErrorHandler from '../utils/errorhandler.js'

// create post
export const createPost = async(req,res,next) => {
    const newPost = new Post(req.body);
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        return next(new ErrorHandler(err, 400));
    }
}

// getPost
export const getPost = async(req,res,next) => {
    const id = req.params.id

    try {
        const post = await Post.findById(id);
        console.log(post)
        res.status(200).json(post);
    }
    catch (error){
        return next(new ErrorHandler(error, 400));
    }
}

// update
export const updatePost = async(req, res, next) => {
    const id = req.params.id;
    const {userId} = req.body;
    try {
        const post = await Post.findById(id);
        if(userId===post.userId.toString()) {
            const updatedPost = await Post.findByIdAndUpdate(id, {$set : req.body}, {new:true})
            res.status(200).json(updatedPost);
        }
        else {
            return next(new ErrorHandler("you can update you own post only", 400));
        }
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}

//delete
export const deletePost = async(req,res,next) => {
    const id = req.params.id;

    try {
        await Post.deleteOne({_id : id});
        res.status(200).json("Successfully deleted then post!");
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}

// like
export const like = async(req, res, next)=> {
    const id = req.params.id;
    const userId = req.user._id;
    try {
        const post = await Post.findById(id);
        if(!post.likes.includes(userId)) {
            await post.updateOne({$push : {likes : userId}}).populate("userId");
            res.status(200).json("post liked!");
        }
        else{
            await post.updateOne({$pull : {likes: userId}});
            res.status(200).json("post unliked!");
        }
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}

// getLikeUser
export const getLikeList = async(req,res,next) => {
    const {id} = req.params
    try {
        const post = await Post.findById(id).populate("likes")
        
        res.status(200).json(post.likes);
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}


// add Comment
export const comment = async(req,res,next) => {
    const id = req.params.id;
    const {comment} = req.body;
    try {
        const post = await Post.findById(id);
        console.log(req.body)
        console.log(comment)
        await post.updateOne({$push: {comments: {user: req.user._id, comment:comment}}});
        res.status(200).json("added the comment!");
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}

// delete Comment
export const deleteComment = async(req,res,next) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id);
        console.log(req.body)
        console.log(comment)
        await post.deleteOne({$pull: {comments: {user: req.user._id, comment:comment}}});
        res.status(200).json("added the comment!");
        
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}

export const getFeedPost = async(req,res,next)=> {
    try {
        const post = await Post.find().populate("userId likes comments.user");
        res.status(200).json(post.reverse())
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}  

export const getUserPost = async(req,res,next) => {
    try {
        const {userId} = req.params
        const post = await Post.find({userId})
        res.status(200).json(post)
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}   


export const getPostOfFollowing = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      const posts = await Post.find({
        owner: {
          $in: user.following,
        },
      }).populate("userId likes comments.user");
  
      res.status(200).json({
        success: true,
        posts: posts.reverse(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  