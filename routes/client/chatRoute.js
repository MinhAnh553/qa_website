import express from 'express';
import chatController from '../../controllers/client/chatController.js';

const Router = express.Router();

Router.route('/').get(chatController.chatPage);

export const chatRoute = Router;
