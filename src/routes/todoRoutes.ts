import express from 'express';
import { login, profile, signUp } from '../controllers/loginController';
import { addTodo, viewAlltodos } from '../controllers/todoController';
import { validateToken } from '../middlewares';

export const todoRoutes = express.Router()


todoRoutes.post('/create',[validateToken], addTodo)
todoRoutes.put('/update',[validateToken],profile)
todoRoutes.delete('/delete',signUp)
todoRoutes.get("/viewAll",[validateToken],viewAlltodos)
todoRoutes.get("/viewRecurring",[validateToken],)



