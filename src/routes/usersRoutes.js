import express from 'express';
import UserController from "../controllers/usersController.js"
import {isAuthenticated} from '../middleware/isAuthenticated.js';

const router = express.Router();

router  
    .post("/signup", UserController.createUser)
    .get("/getAll", UserController.listUser)
    .post("/auth/login", UserController.authLogin)
    .get("/private",isAuthenticated, UserController.privateAccess)
    

export default router;