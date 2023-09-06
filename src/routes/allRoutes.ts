import express from 'express';
import { login, profile, signUp } from '../controllers/loginController';
import { validateToken } from '../middlewares';

export const appRoutes = express.Router()


appRoutes.post('/login', login)
appRoutes.get('/profile',[validateToken],profile)
appRoutes.post('/signUp',signUp)

