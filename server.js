import express from "express";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api/beepers", authRouter);
app.listen(PORT, () => {
    console.log("server is on");
});
