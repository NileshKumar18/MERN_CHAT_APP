import express from "express";
import dotenv from "dotenv";
import connection from "./config/dbConfig.js";
import userRouter from "./routes/userRouter.js"
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;
const server = createServer(app)
connection();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})
io.on("connection", (socket) => {
    console.log("✅ New socket connected:", socket.id);
    socket.on("joinChat", (chatId) => {
        socket.join(chatId)
        // console.log("User joined chat:", chatId);
    })

    socket.on("sendMessage", (messageData) => {
        const chatId = messageData.chat._id;  // ✅ extract id properly
        io.to(chatId).emit("receiveMessage", messageData);
        // console.log("Message sent to chat:", chatId);
        // console.log("Broadcasting message to:", chatId, "Rooms:", io.sockets.adapter.rooms);

    });
    socket.on("typing", (chatId) => {
        socket.in(chatId).emit("typing", chatId);
    });

    socket.on("disconnect", () => {
        console.log("❌ Socket disconnected:", socket.id);
    });
})


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use('/api/users', userRouter)
app.use('/api/chat', chatRoutes)
app.use('/api/messages', messageRoutes)

app.get('/', (req, res) => {
    res.send("Hello World");
})
process.on('unhandledRejection', (err) => console.log('Unhandled:', err.message));
process.on('uncaughtException', (err) => console.log('Uncaught:', err.message));

server.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server and Socket.IO running on http://localhost:${PORT}`);
});

