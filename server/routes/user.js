import express from 'express';
import { deleteUser, follow, getUnfollowedFollowers, getUser, getUserFriends, myProfile, unfollow, updateUser } from '../controllers/user.js';

const router = express.Router();

router.get('/friends/all', getUserFriends)
router.get('/follow/user', getUnfollowedFollowers)
router.get('/me', myProfile)
router.get('/:id', getUser).put('/:id', updateUser).delete('/:id', deleteUser);

router.put('/:id/follow', follow);
router.put('/:id/unfollow', unfollow);

export default router;