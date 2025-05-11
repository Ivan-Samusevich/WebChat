import express from 'express'

import authRoutes from "../src/routes/auth_route.js";
import dotenv from "dotenv"
import cors from "cors";

import { connectDB } from "./lib/db.js";

const app = express();

dotenv.config() 
const PORT = process.env.PORT


app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("HI Ivan!!!, port = " + PORT);
    
    connectDB()
});