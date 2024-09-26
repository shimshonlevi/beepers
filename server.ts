import express, { Application } from "express";
import authRouter from "./routes/auth.js";
import bookRouter from "./routes/beeperRouter.js"
import dotenv from "dotenv";

dotenv.config();

const PORT: number | string = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());

app.use("/api/beepers", authRouter); 


app.listen(PORT, () => {
  console.log("server is on");
}); 
