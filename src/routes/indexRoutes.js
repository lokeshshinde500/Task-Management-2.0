import { Router } from "express";
import authRoutes from "./authRoutes.js";
import taskRoutes from "./taskRoutes.js";
import { authenticate, isAdmin } from "../middleware/authenticate.js";
const routes = Router();

// auth routes
routes.use("/auth", authRoutes);

// task routes
routes.use("/task", authenticate, taskRoutes);

export default routes;
