import express from 'express'
import { createChat, findChat, userChat } from '../controllers/chat.js'
import { isAuth } from '../middlewares/auth.js'
const router = express.Router()

router.post('/new', createChat)
router.get('/:id', userChat)
router.get('/find/:firstId/:secondId', findChat)

export default router