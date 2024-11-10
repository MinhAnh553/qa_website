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

Router.route('/search').get(
    rankingMiddleware.getRanking,
    questionController.searchQuestion,
);

Router.route('/delete/:id').delete(
    authMiddleware.isAuthorized,
    questionController.deleteQuestion,
);

Router.route('/edit/:id')
    .get(
        authMiddleware.isAuthorized,
        rankingMiddleware.getRanking,
        questionController.editQuestion,
    )
    .patch(
        authMiddleware.isAuthorized,
        fileUpload.single('images'),
        uploadCloudMiddleware.uploadCloud,
        questionController.postEditQuestion,
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

Router.route('/reply/delete/:id').delete(
    authMiddleware.isAuthorized,
    questionController.deleteReply,
);

Router.route('/reply/edit/:id')
    .get(
        authMiddleware.isAuthorized,
        rankingMiddleware.getRanking,
        questionController.editReply,
    )
    .patch(
        authMiddleware.isAuthorized,
        fileUpload.single('images'),
        uploadCloudMiddleware.uploadCloud,
        questionController.postEditReply,
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
