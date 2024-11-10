import questionService from '../../services/client/questionService.js';

// [GET] /admin/question
const questionPage = async (req, res) => {
    try {
        const result = await questionService.getAllQuestion(req, res);

        res.render('admin/pages/question/index', {
            pageTitle: 'Quản lý câu hỏi',
            questions: result.questions,
        });
    } catch (error) {}
};

export default {
    questionPage,
};
