import questionModel from '../../models/questionModel.js';
import userModel from '../../models/userModel.js';
import questionService from '../../services/client/questionService.js';

// [GET] /admin/question
const questionPage = async (req, res) => {
    try {
        const deleted = req.query.deleted || false;
        const keyword = req.query.query;
        let questions = [];

        if (keyword) {
            const rawQuestions = await questionModel
                .find({
                    description: { $regex: keyword, $options: 'i' },
                    deleted: deleted,
                })
                .limit(10);

            questions = await Promise.all(
                rawQuestions.map(async (question) => {
                    const user = await userModel
                        .findOne({
                            _id: question.user_id,
                            deleted: false,
                        })
                        .select('fullName avatar');
                    const plainQuestion = question.toObject();
                    plainQuestion.user = user;
                    return plainQuestion;
                }),
            );
        } else {
            questions = (await questionService.getAllQuestion(req, res))
                .questions;
        }

        res.render('admin/pages/question/index', {
            pageTitle: 'Quản lý câu hỏi',
            questions,
            keyword,
        });
    } catch (error) {}
};

// [GET] /admin/question/edit/:id
const editQuestion = async (req, res) => {
    try {
        const question = await questionModel.findOne({
            _id: req.params.id,
            deleted: false,
        });

        res.render('admin/pages/question/edit', {
            pageTitle: 'Chỉnh sửa câu hỏi',
            question,
        });
    } catch (error) {}
};

// [GET] /admin/question/restore/:id
const restoreQuestion = async (req, res) => {
    try {
        await questionModel.updateOne(
            {
                _id: req.params.id,
            },
            {
                deleted: false,
            },
        );

        res.redirect('back');
    } catch (error) {}
};

export default {
    questionPage,
    editQuestion,
    restoreQuestion,
};
