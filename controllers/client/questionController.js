import { StatusCodes } from 'http-status-codes';

import questionModel from '../../models/questionModel.js';
import userModel from '../../models/userModel.js';
import questionService from '../../services/client/questionService.js';

// [GET] /question
const questionPage = async (req, res) => {
    try {
        const questions = await questionModel.find({
            // status: { $ne: 0 },
            deleted: false,
        });

        for (const question of questions) {
            const user = await userModel
                .findOne({
                    _id: question.user_id,
                    deleted: false,
                })
                .select('fullName avatar');

            question.user = user;
        }

        res.render('client/pages/home/index', {
            pageTitle: 'Hỏi đáp',
            questions: questions,
        });
    } catch (error) {}
};

// [GET] /question/:id
const detailPage = async (req, res) => {
    try {
        const userId = res.locals.user.id;
        const id = req.params.id;
        const question = await questionService.getQuestionbyId(id);
        const user = await userModel
            .findOne({
                _id: question.user_id,
                deleted: false,
            })
            .select('fullName avatar');

        question.user = user;

        for (const reply of question.reply) {
            const user = await userModel
                .findOne({
                    _id: reply.user_id,
                    deleted: false,
                })
                .select('fullName avatar');

            // Thông tin người trả lời
            reply.user = user;

            let vote = 'none';
            for (const like of reply.vote.like) {
                if (like.user_id == userId) {
                    vote = 'like';
                }
            }

            for (const dislike of reply.vote.dislike) {
                if (dislike.user_id == userId) {
                    vote = 'dislike';
                }
            }
            reply.userVote = vote;
        }

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

// [POST] /question/reply/:id
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

export default {
    questionPage,
    detailPage,
    askPage,
    createAsk,
    postReply,
    voteReply,
};
