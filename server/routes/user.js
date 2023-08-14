import express from 'express';
import { deleteUser, follow, getUnfollowedFollowers, getUser, getUserFriends, myProfile } from '../controllers/user.js';
import {isAuth} from '../middlewares/auth.js'
const router = express.Router();

router.get('/friends/all', getUserFriends)
router.get('/follow/user', getUnfollowedFollowers)
router.get('/me', isAuth, myProfile)
router.get('/:id', getUser).delete('/:id', deleteUser);


router.put('/:id', follow);
// router.put('/:id/unfollow', unfollow);

export default router;