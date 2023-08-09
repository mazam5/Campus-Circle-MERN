import express from "express";
import {login, logout} from '../controllers/auth.js'
const router = express.Router();

router.get('/logout', logout);
router.post('/login', login);

export default router