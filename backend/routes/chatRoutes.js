import express from 'express'
import { createChat , getAllChats, getMessages} from '../controllers/chatController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';

const router = express.Router();

router.post('/createChat' ,isLoggedIn, createChat)

router.get('/:chatId/messages' , isLoggedIn ,getMessages) 

router.get("/", isLoggedIn, getAllChats);



export default router