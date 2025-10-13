import express from 'express'
import { createChat , getChat} from '../controllers/chatController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';

const router = express.Router();

router.post('/createChat' ,isLoggedIn, createChat)

router.get('/:chatId/messages' , isLoggedIn ,getChat) 



export default router