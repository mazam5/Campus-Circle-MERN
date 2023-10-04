import express from 'express';
import { deleteUser, remove, follow, getUnfollowedFollowers, getUser, getUserFriends, myProfile, getSuggestedUsers, searchUser } from '../controllers/user.js';
import {isAuth} from '../middlewares/auth.js'
const router = express.Router();

router.get('/friends/all', getUserFriends)
router.get('/follow/user', getUnfollowedFollowers)
router.get('/me', isAuth, myProfile)
router.get('/:id', getUser).delete('/:id', deleteUser);
router.get('/follow/suggestions', getSuggestedUsers)
router.get('/', searchUser)

router.put('/:id', follow);
router.put('/:id/remove', remove);

export default router;