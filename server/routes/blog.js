import express from 'express'
import { AddRemoveSavedBlog, AllBlogs, comment, deleteBlog, deleteComment, getBlog, getBlogsOfFollowedUsers, getPopularBlog, like, savedBlog, viewBlog } from '../controllers/blog.js'
const router = express.Router()

// router.post('/new', createBlog)
router.get('/all/blogs',  AllBlogs)
router.get('/:id', getBlog)
// router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)
router.get('/popular/trend', getPopularBlog)
router.get('/:id/increment/view', viewBlog)
router.put('/:id/like', like)
router.get('/:id/comment', comment)
router.delete('/:id/deleteComment', deleteComment);
router.get('/saved/all',savedBlog)
router.get('/:id/saved/blog',AddRemoveSavedBlog)
router.get('/following/blogs', getBlogsOfFollowedUsers)

export default router