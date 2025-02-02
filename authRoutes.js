import express from "express"
import { loginUser, registerUser } from "./authController.js";

const auth=express.Router();

auth.post('/register',registerUser);
auth.post('/login',loginUser);

export default auth;