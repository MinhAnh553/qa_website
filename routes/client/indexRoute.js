import express from 'express';
import { homeRoute } from './homeRoute.js';
import { userRoute } from './userRoute.js';
import userMiddleware from '../../middlewares/client/userMiddleware.js';

const Router = express.Router();

Router.use(userMiddleware.infoUser);

Router.use('/', homeRoute);

Router.use('/user', userRoute);

export const clientRoute = Router;
