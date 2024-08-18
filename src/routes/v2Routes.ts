import express from "express";

import { sendOtp, verifyOtp } from "../controllers/v2OtpController";
import { login, refreshToken } from "../controllers/v2LoginController";
import {
  addTodo,
  deleteTodo,
  editTodo,
  viewAllTodo,
  viewTodo,
} from "../controllers/v2TodoController";
import { validateToken } from "../middlewares";

export const v2Routes = express.Router();

v2Routes.post("/createTodo",[validateToken], addTodo);
v2Routes.put("/updateTodo",[validateToken], editTodo);
v2Routes.delete("/deleteTodo/:id", [validateToken],deleteTodo);
v2Routes.get("/viewAllTodos",[validateToken], viewAllTodo);
v2Routes.get("/viewRecurringTodos", [validateToken]);
v2Routes.get("/view/:id", [validateToken], viewTodo);
v2Routes.post("/sendOtp",sendOtp)
v2Routes.post("/verifyOtp",verifyOtp)
v2Routes.post("/login",login)
v2Routes.post("/refreshToken",refreshToken)
v2Routes.get("/test",(req,res)=>{
  res.json(" TodoApp healthcheck Success")
})
