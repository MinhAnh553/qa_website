import { StatusCodes } from 'http-status-codes';

import questionModel from '../../models/questionModel.js';
import userModel from '../../models/userModel.js';
import questionService from '../../services/client/questionService.js';

// [GET] /question
const questionPage = async (req, res) => {
    try {
        const result = await questionService.getAllQuestion(req, res);

        res.render('client/pages/home/index', {
            pageTitle: 'Hỏi đáp',
            questions: result.questions,
            sort: result.keySort,
        });
    } catch (error) {}
};

// [GET] /question/:id
const detailPage = async (req, res) => {
    try {
        const question = await questionService.getQuestionbyId(req, res);

        res.render('client/pages/question/detail', {
            pageTitle: 'Hỏi đáp',
            question: question,
        });
    } catch (error) {}
};

// [GET] /question/ask
const askPage = async (req, res) => {
    try {
        res.render('client/pages/question/ask', {
            pageTitle: 'Đặt câu hỏi',
        });
    } catch (error) {}
};

// [POST] /question/ask
const createAsk = async (req, res) => {
    try {
        const data = req.body;
        data.status = 0;
        // Create By
        data.user_id = res.locals.user.id;

        const question = new questionModel(data);
        await question.save();

        res.redirect('/question');
    } catch (error) {}
};

// [POST] /question/reply/:id
const postReply = async (req, res) => {
    try {
        await questionService.postReply(req, res);

        res.redirect('back');
    } catch (error) {}
};

// [POST] /question/reply/vote
const voteReply = async (req, res) => {
    try {
        const result = await questionService.voteReply(req, res);

        if (result.status != 304) {
            res.status(StatusCodes.OK).json({
                message: result.message,
            });
            return;
        }

        res.status(StatusCodes.NOT_MODIFIED).json({
            message: result.message,
        });
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [GET] /question/complete/:id
const completeQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        await questionService.completeQuestion(id);

        res.redirect('back');
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [DELETE] /question/delete/:id
const deleteQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await questionService.deleteQuestion(id);
        res.status(StatusCodes.OK).json({
            message: result.message,
        });
        // res.redirect('back');
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

export default {
    questionPage,
    detailPage,
    askPage,
    createAsk,
    postReply,
    voteReply,
    completeQuestion,
    deleteQuestion,
};
