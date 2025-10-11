import express from 'express'
import signupController from '../controllers/signupController.js';
import loginController from '../controllers/loginController.js';
import profileController from '../controllers/profileController.js';

const router = express.Router();



router.post('/signup' , signupController)
router.post('/login' , loginController)
router.post('/profile' , profileController)


router.get('/login' , (req , res) => {
    res.json({message:"Welcome to the login Page"})
})



export default router