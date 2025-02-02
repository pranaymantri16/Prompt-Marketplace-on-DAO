import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import auth from "./authRoutes.js";

const app=express();
app.use(express.json());
app.use(cors())

app.use('/api/auth',auth);

dotenv.config()

app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})


