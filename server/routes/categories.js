import express from 'express'
import { createCatergory, getCategory } from '../controllers/category.js'
import { isAuth } from '../middlewares/auth.js'

const router = express.Router()

router.post('/new', createCatergory)
router.get('/', getCategory)

export default router