import express from 'express'
import signupController from '../controllers/signupController.js';
import loginController from '../controllers/loginController.js';
import profileController from '../controllers/profileController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';

const router = express.Router();



router.post('/signup' , signupController)
router.post('/login' , loginController) 
router.get('/profile' , isLoggedIn , profileController)
router.get('/checkAuth' , isLoggedIn , (req , res) =>{
    res.status(200).json({
        message:"User is authenticated"
    })
});





export default router