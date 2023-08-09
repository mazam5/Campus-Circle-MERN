import express from 'express';
import { comment, createPost, deletePost, getFeedPost, getPost, getUserPost, like, updatePost } from '../controllers/post.js';

const router = express.Router();

router.post('/new', createPost);
router.get('/:userId', getUserPost)
router.get('/feed/all', getFeedPost)
router.get('/:id',  getPost).put('/:id', updatePost).delete('/:id', deletePost).post('/:id', like);
router.post('/:id/comment', comment);
export default router;