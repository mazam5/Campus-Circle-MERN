import express from 'express'
import { AllBlogs, createBlog, deleteBlog, getBlog, updateBlog } from '../controllers/blog.js'
const router = express.Router()

router.post('/new', createBlog)
router.get('/',  AllBlogs)
router.get('/:id', getBlog)
router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)

export default router