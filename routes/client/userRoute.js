import express from 'express';
import userController from '../../controllers/client/userController.js';
import authMiddleware from '../../middlewares/client/authMiddleware.js';

const Router = express.Router();

Router.route('/register')
    .get(userController.registerPage)
    .post(userController.registerUser);

Router.route('/login')
    .get(userController.loginPage)
    .post(userController.loginUser);

export const userRoute = Router;
