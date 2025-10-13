import express from 'express'
import { getMessages } from '../controllers/messageController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';
import { createMessages } from '../controllers/messageController.js';
const router = express.Router();

router.get('/:chatId' , isLoggedIn, getMessages)
router.post('/:chatId' , isLoggedIn, createMessages)




export default router