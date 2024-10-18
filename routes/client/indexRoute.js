import express from 'express';
import { homeRoute } from './homeRoute.js';
import { userRoute } from './userRoute.js';
import { chatRoute } from './chatRoute.js';
import { questionRoute } from './questionRoute.js';
import userMiddleware from '../../middlewares/client/userMiddleware.js';
import authMiddleware from '../../middlewares/client/authMiddleware.js';

const Router = express.Router();

Router.use(userMiddleware.infoUser);

Router.use('/', homeRoute);

Router.use('/user', userRoute);

Router.use('/chat', authMiddleware.isAuthorized, chatRoute);

Router.use('/question', authMiddleware.isAuthorized, questionRoute);

export const clientRoute = Router;
