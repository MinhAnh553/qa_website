import express from 'express';
import multer from 'multer';

import userController from '../../controllers/admin/userController.js';
import uploadCloudMiddleware from '../../middlewares/client/uploadCloudMiddleware.js';

const Router = express.Router();
const fileUpload = multer();

Router.route('/').get(userController.userdPage);

Router.route('/delete/:id').delete(userController.deleteUser);

Router.route('/edit/:id')
    .get(userController.editUser)
    .patch(
        fileUpload.single('avatar'),
        uploadCloudMiddleware.uploadCloud,
        userController.postEditUser,
    );

export const userRoute = Router;
