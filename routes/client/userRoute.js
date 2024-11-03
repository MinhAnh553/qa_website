import express from 'express';
import multer from 'multer';

import userController from '../../controllers/client/userController.js';
import authMiddleware from '../../middlewares/client/authMiddleware.js';
import uploadCloudMiddleware from '../../middlewares/client/uploadCloudMiddleware.js';

const Router = express.Router();
const fileUpload = multer();

Router.route('/register')
    .get(userController.registerPage)
    .post(userController.registerUser);

Router.route('/login')
    .get(userController.loginPage)
    .post(userController.loginUser);

Router.route('/logout').get(userController.logoutUser);

Router.route('/edit-info')
    .get(authMiddleware.isAuthorized, userController.getEditInfoPage)
    .post(
        authMiddleware.isAuthorized,
        fileUpload.single('avatar'),
        uploadCloudMiddleware.uploadCloud,
        userController.postEditInfo,
    );

Router.route('/:id').get(userController.getUserPage);

export const userRoute = Router;
