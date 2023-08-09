import Blog from '../models/blog.js'
import ErrorHandler from '../utils/errorhandler.js'

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
        const blog = await Blog.findById(id)
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
    try {
        let blogs;
        if(userId) {
            blogs = await Blog.find({userId})
        }
        else if(catName) {
            blogs = await Blog.find({ category :
                {$in : [catName]}
            })
        }
        else {
            blogs = await Blog.find()
        }
        res.status(200).json(blogs)
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}