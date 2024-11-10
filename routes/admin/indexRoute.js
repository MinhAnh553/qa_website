import express from 'express';
import { dashboardRoute } from './dashboardRoute.js';
import { userRoute } from './userRoute.js';
import system from '../../config/system.js';

const Router = express.Router();

const PATH_ADMIN = system.prefixAdmin;

Router.use(PATH_ADMIN, (req, res, next) => {
    if (req.path === '/') {
        res.redirect(PATH_ADMIN + '/dashboard');
    } else {
        next();
    }
});

Router.use(PATH_ADMIN + '/dashboard', dashboardRoute);

Router.use(PATH_ADMIN + '/user', userRoute);

export const adminRoute = Router;
