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

Router.route('/logout').get(userController.logoutUser);

export const userRoute = Router;
