import express from 'express';
import { comment, deleteComment, deletePost, getFeedPost, getLikeList, getPost, getUserPost, like, updatePost } from '../controllers/post.js';

const router = express.Router();

router.get('/:userId', getUserPost)
router.get('/feed/all', getFeedPost)
router.get('/likes/:id/list', getLikeList)
router.get('/:id',  getPost).delete('/:id', deletePost).put('/:id', updatePost)
router.put('/like/:id', like)
router.put('/comment/:id', comment).delete('/comment/:id', deleteComment)
export default router;