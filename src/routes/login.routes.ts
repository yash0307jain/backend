import express, { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userController = new UserController();
const router: Router = express.Router();

router.post("/signup", userController.signUp);

export const loginRoutes = router;
