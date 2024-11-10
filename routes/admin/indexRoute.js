import express from 'express';
import { dashboardRoute } from './dashboardRoute.js';
import { userRoute } from './userRoute.js';
import { questionRoute } from './questionRoute.js';
import system from '../../config/system.js';
import authMiddleware from '../../middlewares/admin/authMiddleware.js';

const Router = express.Router();

const PATH_ADMIN = system.prefixAdmin;

Router.use(authMiddleware.isAuthorized);

Router.use(PATH_ADMIN, (req, res, next) => {
    if (req.path === '/') {
        res.redirect(PATH_ADMIN + '/dashboard');
    } else {
        next();
    }
});

Router.use(PATH_ADMIN + '/dashboard', dashboardRoute);

Router.use(PATH_ADMIN + '/user', userRoute);

Router.use(PATH_ADMIN + '/question', questionRoute);

export const adminRoute = Router;
