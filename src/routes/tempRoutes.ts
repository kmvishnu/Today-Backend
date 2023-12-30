import express from "express";
import {
  actionTodo,
  addTodo,
  deleteTodo,
  editTodo,
  viewAllTodo,
  viewTodo,
} from "../controllers/tempController";

export const tempRoutes = express.Router();

tempRoutes.post("/add", addTodo);
tempRoutes.put("/edit", editTodo);
tempRoutes.delete("/delete/:id", deleteTodo);
tempRoutes.get("/viewAll", viewAllTodo);
tempRoutes.get("/view", viewTodo);
