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
        res.status(200).json(post);
    }
    catch (error){
        return next(new ErrorHandler(error, 400));
    }
}

// update
export const updatePost = async(req, res, next) => {
    const id = req.params.id;
    const userId = req.user._id;
    try {
        const post = await Post.findById(id);
        if(userId.toString()===post.userId.toString()) {
            await post.updateOne({$set : req.body})
            res.status(200).json("Successfully updated the post");
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

// add Comment
export const comment = async(req,res,next) => {
    const id = req.params.id;
    const {comment} = req.body;
    try {
        const post = await Post.findById(id);
        await post.updateOne({$push: {comments: {user: req.user._id, comment:comment}}});
        res.status(200).json("added the comment!");
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}

// delete Comment
export const deleteComment = async(req,res,next) => {
    try {
        const post = await Post.findById(req.params.id);
    
        if (!post) {
          return res.status(404).json({
            success: false,
            message: "Post not found",
          });
        }
        
        // Checking If owner wants to delete
    
        if (post.userId.toString() === req.user._id.toString()) {
          if (req.body.commentId === undefined) {
            return res.status(400).json({
              success: false,
              message: "Comment Id is required",
            });
          }

          const commentIndex = post.comments.findIndex(
            (comment) => comment._id.toString() === req.body.commentId.toString()
          );
      
          if (commentIndex === -1) {
            return next(new ErrorHandler("Comment not Found", 404))
          }
    
          post.comments.forEach((item, index) => {
            if (item._id.toString() === req.body.commentId.toString()) {
              return post.comments.splice(index, 1);
            }
          });
    
          await post.save();
    
          return res.status(200).json({
            success: true,
            message: "Selected Comment has deleted",
          });
        } else {
          post.comments.forEach((item, index) => {
            if (item.user.toString() === req.user._id.toString()) {
              return post.comments.splice(index, 1);
            }
          });
    
          await post.save();
    
          return res.status(200).json({
            success: true,
            message: "Your Comment has deleted",
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
}

export const getFeedPost = async(req,res,next)=> {
    try {
        const post = await Post.find({ userId: { $ne: req.user._id } }).populate("userId likes comments.user");
        res.status(200).json(post.reverse())
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}  

export const getUserPost = async(req,res,next) => {
    try {
        const {userId} = req.params
        const post = await Post.find({userId}).populate("userId likes comments.user")
        res.status(200).json(post.reverse())
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}   

export const deleteUserPosts = async(req,res,next) => {
    try {
        const {userId} = req.params
        const post = await Post.deleteMany({userId})
        
        res.status(200).json({
          success:true,
          message:`Successfully deleted ${post.deletedCount} posts.`,
        })
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
  

  export const getMyPost = async(req,res, next) => {
    try {
        const userId = req.user._id
        const posts = await Post.find({userId}).populate("userId likes comments.user")
        res.status(200).json(posts.reverse())
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
  }