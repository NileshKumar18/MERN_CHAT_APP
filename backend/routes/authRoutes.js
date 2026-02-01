import express from 'express'
import { refreshAccessToken } from '../controllers/authController.js'
const router = express.Router()

router.get('/refresh', refreshAccessToken)
export default router