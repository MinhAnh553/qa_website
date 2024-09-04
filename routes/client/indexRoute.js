import express from 'express';
import { homeRoute } from './homeRoute.js';

const Router = express.Router();

Router.use('/', homeRoute);

export const clientRoute = Router;
