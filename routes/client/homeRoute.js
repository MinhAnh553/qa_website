import express from 'express';
import homeController from '../../controllers/client/homeController.js';

const Router = express.Router();

Router.route('/').get(homeController.homePage);

export const homeRoute = Router;
