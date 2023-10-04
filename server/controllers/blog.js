import Blog from '../models/Blog.js'
import ErrorHandler from '../utils/errorhandler.js'
import SavedBlog from '../models/SavedBlog.js'
import User from '../models/User.js'

// create blog
export const createBlog = async(req,res,next) => {
    const blog = new Blog(req.body)
    try {
        const savedBlog = await blog.save()
        res.status(201).json(savedBlog)
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}

// update
export const updateBlog = async(req,res,next) => {
    const id = req.params.id
    const {userId} = req.body
    try {
        let blog = await Blog.findById(id)
        if(userId === blog.userId) {
           const updatedBlog = await Blog.findByIdAndUpdate(id, {$set: req.body}, {new:true})
           res.status(200).json(updatedBlog)
        }
        else {
            return next(new ErrorHandler("Access Denied! You can edit your blogs only", 400))
        }
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}

// get specific blog
export const getBlog = async(req,res,next) => {
    const id = req.params.id
    try {
        const blog = await Blog.findById(id).populate("userId comments.user")
        res.status(200).json(blog)
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}

// delete blog
export const deleteBlog = async(req,res,next) => {
    const id = req.params.id
    const {userId} = req.body 
    try {
        const blog = await Blog.findById(id)
        if(userId === blog.userId) {
            await Blog.findByIdAndDelete(id)
            res.status(200).json("Blog deleted successfully!")
        }
        else {
            return next(new ErrorHandler("Access Denied! You can delete your blogs only", 400))
        }
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}

// get all post with category
export const AllBlogs = async(req,res,next) => {
    const userId = req.query.user
    const catName = req.query.category
    const search = req.query.search
    try {
        let blogs;
        if(userId) {
            blogs = await Blog.find({userId}).populate("userId likedBy views comments.user")
        }
        else if(catName) {
            blogs = await Blog.find({ category :
                {$in : [catName]}
            }).populate("userId likedBy views comments.user")
        }
        else if(search) {
          blogs = await Blog.find({
            $or: [
              {title: {$regex: search, $options: "i"}},
              {content: { $regex: search, $options: "i" }},
            ]
          }).populate("userId views comments.user")
        }
        else {
            blogs = await Blog.find().populate("userId likedBy views comments.user")
        }
        res.status(200).json(blogs.reverse())
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}
// popular blog
export const getPopularBlog = async(req,res,next) => {
    try {
      const popularBlogs = await Blog.aggregate([
        {
          $addFields: {
            viewCount: { $size: '$views' }, // Add a new field 'viewCount' with the size of the 'views' array
          },
        },
        {
          $sort: { viewCount: -1 }, // Sort in descending order of 'viewCount'
        },
      ]);
  
      await Blog.populate(popularBlogs, { path: 'userId'});
      res.json(popularBlogs);
    } catch (err) {
      return next(new ErrorHandler(err, 400));
    }
  };

//views
export const viewBlog = async (req, res, next) => {
    const { id } = req.params;
    const userId  = req.user._id;
    try {
      const blog = await Blog.findById(id);
  
      if (!blog) {
        return res.status(404).json("Blog not found" );
      }
  
      if (!blog.views.includes(userId)) {
        // If the user's ID is not in the views array, add it
        await blog.updateOne({$push : {views : userId}}).populate("userId");
      }
  
      res.status(200).json("Blog viewed successfully" );
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  };

// like and unlike
export const like = async(req, res, next)=> {
    const id = req.params.id;
    const userId = req.user._id;
    try {
        const blog = await Blog.findById(id);
        if(!blog.likedBy.includes(userId)) {
            await blog.updateOne({$push : {likedBy : userId}}).populate("userId");
            res.status(200).json("blog liked!");
        }
        else{
            await blog.updateOne({$pull : {likedBy: userId}});
            res.status(200).json("blog unliked!");
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
        const blog = await Blog.findById(id);
        await blog.updateOne({$push: {comments: {user: req.user._id, comment:comment}}});
        res.status(200).json("added the comment!");
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}

// delete Comment
export const deleteComment = async(req,res,next) => {
    try {
        const blog = await Blog.findById(req.params.id);
    
        if (!blog) {
          return res.status(404).json({
            success: false,
            message: "blog not found",
          });
        }
    
        if (blog.userId.toString() === req.user._id.toString()) {
          if (req.body.commentId === undefined) {
            return res.status(400).json({
              success: false,
              message: "Comment Id is required",
            });
          }

          const commentIndex = blog.comments.findIndex(
            (comment) => comment._id.toString() === req.body.commentId.toString()
          );
      
          if (commentIndex === -1) {
            return next(new ErrorHandler("Comment not Found", 404))
          }
    
          blog.comments.forEach((item, index) => {
            if (item._id.toString() === req.body.commentId.toString()) {
              return blog.comments.splice(index, 1);
            }
          });
    
          await blog.save();
    
          return res.status(200).json({
            success: true,
            message: "Selected Comment has deleted",
          });
        } else {
          blog.comments.forEach((item, index) => {
            if (item.user.toString() === req.user._id.toString()) {
              return blog.comments.splice(index, 1);
            }
          });
    
          await blog.save();
    
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

// get savedBlog
export const savedBlog = async(req, res, next)=> {
  const userId = req.user._id;
  try {
      const blog = await SavedBlog.findOne({ userId }).populate({
        path: "savedBlog",
        populate: {
          path: "userId likedBy comments comments.user", // Populate the userId field inside savedBlog
          model: "User", // Replace with the actual User model name
        },
      }).exec();
      if (!blog) {
        return res.status(404).json('Saved blogs not found for this user.');
      }
      res.status(200).json(blog.savedBlog);
  } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
}

export const AddRemoveSavedBlog = async (req, res, next) => {
  const userId = req.user._id;
  const blogId = req.params.id;
  try {
    // Check if the blog is already saved
    let savedBlog = await SavedBlog.findOne({ userId });

    if (!savedBlog) {
      savedBlog = new SavedBlog({ userId, savedBlog: [] });
      await savedBlog.save()
    }

    const isBlogSaved = savedBlog.savedBlog.some((savedBlogItem) =>
      savedBlogItem.equals(blogId)
    );

    if (!isBlogSaved) {
      // Populate the blog and push it into saved blogs using findOneAndUpdate
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found.' });
      }

      await SavedBlog.findOneAndUpdate(
        { userId },
        { $push: { savedBlog: blogId } }, {},
        { new: true } // To return the updated document
      ).populate("savedBlog userId");

      res.status(200).json("saved the blog");
    } else {
      // Remove the blog from saved blogs
      await SavedBlog.findOneAndUpdate(
        { userId },
        { $pull: { savedBlog: blogId } },
        { new: true } // To return the updated document
      );

      res.status(200).json('Blog removed from saved blogs.');
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};


    // following user blogs
export const getBlogsOfFollowedUsers = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id); 
    
    const followingUsers = currentUser.following;
    
    const blogs = await Blog.find({ userId: { $in: followingUsers } })
    .populate('userId') 
    .exec();
    
    res.status(200).json(blogs);
  } 
  catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

// // search
// export const searchBlogs = async(req,res,next) => {
//   try {
//     const q = req.query.search
    
//   } catch (error) {
//     return next(new ErrorHandler(error, 400))
//   }
// }