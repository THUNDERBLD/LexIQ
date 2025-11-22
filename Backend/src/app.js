import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import cookieParser from "cookie-parser"
// routes imports
import userRouter from "./routes/user.routes.js"
import adminRouter from "./routes/admin.routes.js"

const app = express();

// CORS configuration - THIS IS THE FIX
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Specify exact origin, not '*'
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Other middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));
app.use(express.static("public"));
app.use(cookieParser());

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => res.send(`Server running on port`));

export default app;