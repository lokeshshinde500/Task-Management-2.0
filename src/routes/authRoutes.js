import { Router } from "express";

import {
  login,
  register
} from "../controllers/authController.js";
const routes = Router();

// register
routes.post("/register", register);

// login
routes.post("/login", login);

export default routes;
