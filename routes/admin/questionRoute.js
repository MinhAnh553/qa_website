import express from 'express';
import questionController from '../../controllers/admin/questionController.js';
import rankingMiddleware from '../../middlewares/client/rankingMiddleware.js';

const Router = express.Router();

Router.route('/').get(questionController.questionPage);

export const questionRoute = Router;
