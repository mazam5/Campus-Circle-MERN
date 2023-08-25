import express from 'express';
import { comment, deleteComment, deletePost, deleteUserPosts, getFeedPost, getMyPost, getPost, getUserPost, like } from '../controllers/post.js';

const router = express.Router();

router.get('/:userId', getUserPost)
router.delete('/:userId/all', deleteUserPosts)
router.get('/my/posts', getMyPost)
router.get('/feed/all', getFeedPost)
router.get('/:id',  getPost).delete('/:id', deletePost)
router.put('/like/:id', like)
router.put('/comment/:id', comment).delete('/comment/:id', deleteComment)
export default router;