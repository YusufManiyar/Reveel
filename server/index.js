import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import PostRoutes from "./routes/Post.js";
import GenerateImageRouter from "./routes/GenerateImage.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", PostRoutes);
app.use("/api/generateImage", GenerateImageRouter);

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Hello GFG Developers",
    });    
});

// Error-handling middleware — placed after all routes
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("Failed to connect to DB");
        throw err;
    }
};

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error("Server failed to start:", error.message);
    }
};

startServer();
