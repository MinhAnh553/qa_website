import express from 'express';
import questionController from '../../controllers/admin/questionController.js';

const Router = express.Router();

Router.route('/').get(questionController.questionPage);

Router.route('/edit/:id').get(questionController.editQuestion);

Router.route('/restore/:id').get(questionController.restoreQuestion);

export const questionRoute = Router;
