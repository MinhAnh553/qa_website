import express from 'express';
import { homeRoute } from './homeRoute.js';
import { userRoute } from './userRoute.js';
import { chatRoute } from './chatRoute.js';
import userMiddleware from '../../middlewares/client/userMiddleware.js';

const Router = express.Router();

Router.use(userMiddleware.infoUser);

Router.use('/', homeRoute);

Router.use('/user', userRoute);

Router.use('/chat', chatRoute);

export const clientRoute = Router;
