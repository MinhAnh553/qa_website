import questionModel from '../../models/questionModel.js';
import userModel from '../../models/userModel.js';

// [GET] /question
const questionPage = async (req, res) => {
    try {
        const questions = await questionModel.find({
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

export default {
    questionPage,
    askPage,
    createAsk,
};
