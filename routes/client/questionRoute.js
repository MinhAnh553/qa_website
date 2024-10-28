import express from 'express';
import multer from 'multer';

import questionController from '../../controllers/client/questionController.js';
import uploadCloudMiddleware from '../../middlewares/client/uploadCloudMiddleware.js';

const Router = express.Router();
const fileUpload = multer();

Router.route('/').get(questionController.questionPage);

Router.route('/ask')
    .get(questionController.askPage)
    .post(
        fileUpload.single('images'),
        uploadCloudMiddleware.uploadCloud,
        questionController.createAsk,
    );

Router.route('/:id').get(questionController.detailPage);

Router.route('/reply/vote').post(questionController.voteReply);

Router.route('/reply/:id').post(
    fileUpload.single('images'),
    uploadCloudMiddleware.uploadCloud,
    questionController.postReply,
);

Router.route('/complete/:id').get(questionController.completeQuestion);

export const questionRoute = Router;
