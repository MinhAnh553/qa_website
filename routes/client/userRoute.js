import express from 'express';
import userController from '../../controllers/client/userController.js';

const Router = express.Router();

Router.route('/register')
    .get(userController.registerPage)
    .post(userController.registerUser);

export const userRoute = Router;
