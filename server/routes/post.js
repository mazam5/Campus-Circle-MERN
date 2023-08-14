import express from 'express';
import { comment, deletePost, getFeedPost, getPost, getUserPost, like, updatePost } from '../controllers/post.js';

const router = express.Router();

router.get('/:userId', getUserPost)
router.get('/feed/all', getFeedPost)
router.get('/:id',  getPost).delete('/:id', deletePost).put('/:id', updatePost)
router.put('/like/:id', like)
router.post('/:id/comment', comment)
export default router;