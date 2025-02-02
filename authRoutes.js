import express from "express"
import { loginUser, registerUser } from "./authController.js";
import verifyToken from "./authMiddleware.js";

const auth=express.Router();

auth.post('/register',registerUser);
auth.post('/login',loginUser);
auth.get('/protect',verifyToken,async(req,res)=>{
    return res.status(200).send({ok:true});
})

export default auth;