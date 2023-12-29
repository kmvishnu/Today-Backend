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

todoRoutes.post("/createTodo", addTodo);
todoRoutes.put("/updateTodo", editTodo);
todoRoutes.delete("/deleteTodo/:id", deleteTodo);
todoRoutes.get("/viewAllTodos", viewAllTodo);
todoRoutes.get("/viewRecurringTodos", [validateToken]);
todoRoutes.get("/view", viewTodo);
todoRoutes.post("/sendOtp",sendOtp)
todoRoutes.post("/verifyOtp",verifyOtp)
todoRoutes.post("/login",login)
