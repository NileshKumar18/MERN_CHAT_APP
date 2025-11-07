import express from "express";
import dotenv from "dotenv";
import connection from "./config/dbConfig.js";
import userRouter from "./routes/userRouter.js"
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

connection();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use('/api/users' , userRouter)
app.use('/api/chat' , chatRoutes)
app.use('/api/messages' , messageRoutes)

app.get('/', (req, res) => {
    res.send("Hello World");
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})