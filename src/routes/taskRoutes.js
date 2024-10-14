import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskForUser,
  getTasksForAdmin,
  getTasksForUser,
  updateTask,
} from "../controllers/taskController.js";
import { isAdmin } from "../middleware/authenticate.js";
const routes = Router();

// create new task
routes.post("/", createTask);

// get all tasks for user
routes.get("/", getTasksForUser);

// get single task by id
routes.get("/:id", getTaskForUser);

// delete task by id
routes.delete("/:id", deleteTask);

// update task by id
routes.patch("/:id", updateTask);

// get all task for admin
routes.get("/all/tasks", isAdmin, getTasksForAdmin);

export default routes;
