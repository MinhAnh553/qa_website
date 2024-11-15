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
        const result = await questionService.deleteQuestion(req, res);
        res.status(StatusCodes[result]).json({
            message: result.message,
        });
        // res.redirect('back');
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [GET] /question/edit/:id
const editQuestion = async (req, res) => {
    try {
        const question = await questionModel.findOne({
            _id: req.params.id,
            deleted: false,
        });

        res.render('client/pages/question/edit', {
            pageTitle: 'Chỉnh sửa câu hỏi',
            question,
        });
    } catch (error) {}
};

// [PATCH] /question/edit/:id
const postEditQuestion = async (req, res) => {
    try {
        const result = await questionService.editQuestion(req, res);
        // res.status(StatusCodes[result]).json({
        //     message: result.message,
        // });
        res.redirect('back');
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [DELETE] /question/reply/delete/:id
const deleteReply = async (req, res) => {
    try {
        const result = await questionService.deleteReply(req, res);
        res.status(StatusCodes[result]).json({
            message: result.message,
        });
        // res.redirect('back');
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [GET] /question/reply/edit/:id
const editReply = async (req, res) => {
    try {
        const replyId = req.params.id;
        const userId = res.locals.user.id;
        const question = await questionModel.findOne({
            'reply._id': replyId,
            'reply.user_id': userId,
        });
        const reply = question.reply.find(
            (r) => r._id.toString() === replyId && r.user_id === userId,
        );
        res.render('client/pages/question/editReply', {
            pageTitle: 'Chỉnh sửa câu trả lời',
            reply,
        });
    } catch (error) {}
};

// [PATCH] /question/reply/edit/:id
const postEditReply = async (req, res) => {
    try {
        const result = await questionService.editReply(req, res);
        // res.status(StatusCodes[result]).json({
        //     message: result.message,
        // });
        res.redirect('back');
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [GET] /question/search
const searchQuestion = async (req, res) => {
    const keyword = req.query.query;

    // Kiểm tra nếu không có từ khóa
    if (!keyword) {
        return;
    }

    try {
        const questions = await questionModel
            .find({
                description: { $regex: keyword, $options: 'i' },
                deleted: false, // Chỉ lấy câu hỏi chưa bị xóa
            })
            .limit(10); // Giới hạn số lượng kết quả trả về

        // Định dạng dữ liệu trả về chỉ gồm description và images
        // const results = questions.map((question) => ({
        //     description: question.description,
        //     images: question.images,
        // }));
        for (const question of questions) {
            const user = await userModel
                .findOne({
                    _id: question.user_id,
                    deleted: false,
                })
                .select('fullName avatar');

            question.user = user;
        }

        // res.json(results);
        res.render('client/pages/question/search', {
            pageTitle: 'Tìm kiếm câu hỏi',
            questions,
            keyword,
        });
    } catch (error) {
        console.error('Error searching questions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
    editQuestion,
    postEditQuestion,
    deleteReply,
    editReply,
    postEditReply,
    searchQuestion,
};
