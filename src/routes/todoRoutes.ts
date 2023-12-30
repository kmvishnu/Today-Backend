import express from "express";
import { login, profile, signUp } from "../controllers/loginController";
import { sendOtp, verifyOtp } from "../controllers/otpController";
import {
  addTodo,
  deleteTodo,
  editTodo,
  viewAllTodo,
  viewTodo,
} from "../controllers/todoController";
import { validateToken } from "../middlewares";

export const todoRoutes = express.Router();

todoRoutes.post("/createTodo",[validateToken], addTodo);
todoRoutes.put("/updateTodo",[validateToken], editTodo);
todoRoutes.delete("/deleteTodo/:id", [validateToken],deleteTodo);
todoRoutes.get("/viewAllTodos",[validateToken], viewAllTodo);
todoRoutes.get("/viewRecurringTodos", [validateToken]);
todoRoutes.get("/view", [validateToken], viewTodo);
todoRoutes.post("/sendOtp",sendOtp)
todoRoutes.post("/verifyOtp",verifyOtp)
todoRoutes.post("/login",login)
