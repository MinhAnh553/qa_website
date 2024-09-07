import express from 'express';
import { homeRoute } from './homeRoute.js';
import { userRoute } from './userRoute.js';

const Router = express.Router();

Router.use('/', homeRoute);

Router.use('/user', userRoute);

export const clientRoute = Router;
