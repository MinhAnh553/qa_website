import express from 'express';
import multer from 'multer';

import questionController from '../../controllers/client/questionController.js';
import authMiddleware from '../../middlewares/client/authMiddleware.js';
import uploadCloudMiddleware from '../../middlewares/client/uploadCloudMiddleware.js';
import rankingMiddleware from '../../middlewares/client/rankingMiddleware.js';

const Router = express.Router();
const fileUpload = multer();

Router.route('/').get(
    rankingMiddleware.getRanking,
    questionController.questionPage,
);

Router.route('/delete/:id').delete(
    authMiddleware.isAuthorized,
    questionController.deleteQuestion,
);

Router.route('/ask')
    .get(
        authMiddleware.isAuthorized,
        rankingMiddleware.getRanking,
        questionController.askPage,
    )
    .post(
        authMiddleware.isAuthorized,
        fileUpload.single('images'),
        uploadCloudMiddleware.uploadCloud,
        questionController.createAsk,
    );

Router.route('/:id').get(
    rankingMiddleware.getRanking,
    questionController.detailPage,
);

Router.route('/reply/vote').post(
    authMiddleware.isAuthorized,
    questionController.voteReply,
);

Router.route('/reply/:id').post(
    authMiddleware.isAuthorized,
    fileUpload.single('images'),
    uploadCloudMiddleware.uploadCloud,
    questionController.postReply,
);

Router.route('/complete/:id').get(
    authMiddleware.isAuthorized,
    questionController.completeQuestion,
);

export const questionRoute = Router;
