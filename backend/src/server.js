import express from "express"; // Used for web api to easy to implement them
import "dotenv/config";// To use environment variables from .env file in process.env instead of hardcoding them in the code
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();  

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies to be sent
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

// Connect to the database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});