import express from 'express';
import dashboardController from '../../controllers/admin/dashboardController.js';
import rankingMiddleware from '../../middlewares/client/rankingMiddleware.js';

const Router = express.Router();

Router.route('/').get(
    rankingMiddleware.getRanking,
    dashboardController.dashboardPage,
);

export const dashboardRoute = Router;
