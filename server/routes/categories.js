import express from 'express'
import { createCatergory, getCategory } from '../controllers/category.js'

const router = express.Router()

router.post('/new', createCatergory)
router.get('/', getCategory)

export default router