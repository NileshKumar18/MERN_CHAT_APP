import express from 'express'
import signupController from '../controllers/signupController.js';
import loginController from '../controllers/loginController.js';
import profileController from '../controllers/profileController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';
import userModel from '../models/userModel.js';


const router = express.Router();



router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/profile', isLoggedIn, profileController)
router.get('/checkAuth', isLoggedIn, (req, res) => {
    res.status(200).json({
        message: "User is authenticated",
        data: {
            userId: req.user.userId,
            name: req.user.name,
            email: req.user.email
        }
    })
});
router.get("/", isLoggedIn, async (req, res) => {
    try {
        const loggedUserId = req.user.userId;
        const users = await userModel.find({ _id: { $ne: loggedUserId } }).select("-password");
        // console.log(users);
        
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});







export default router