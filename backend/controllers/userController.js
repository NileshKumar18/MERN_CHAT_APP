// import express from 'express'
// import userModel from '../models/userModel.js'; 

// const router = express.Router();

// router.get("/", isLoggedIn, async (req, res) => {
//   try {
//     const loggedUserId = req.user.userId;
//     const users = await User.find({ _id: { $ne: loggedUserId } }).select("-password");
//     res.status(200).json({
//       success: true,
//       data: users,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });