import express, { Router } from "express";
import {loginRoutes} from '../routes/login.routes'

const router: Router = express.Router();
router.use("/", loginRoutes);

export const indexRoutes = router;
