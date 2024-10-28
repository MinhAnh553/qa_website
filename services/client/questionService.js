import questionModel from '../../models/questionModel.js';

const getQuestionbyId = async (id) => {
    const question = await questionModel.findOne({
        _id: id,
        // status: { $ne: 0 },
        deleted: false,
    });

    return question;
};

const postReply = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    // Create By
    data.user_id = res.locals.user.id;

    await questionModel.updateOne(
        {
            _id: id,
            deleted: false,
        },
        {
            $push: { reply: data },
        },
    );
};

const voteReply = async (req, res) => {
    const userId = res.locals.user.id;
    const { idQuestion, idReply, type } = req.body;
    const notType = type === 'like' ? 'dislike' : 'like';

    try {
        const question = await questionModel.findOne({
            _id: idQuestion,
            'reply._id': idReply,
            deleted: false,
        });

        if (!question) {
            return {
                status: 404,
                message: 'Câu hỏi hoặc phản hồi không tồn tại.',
            };
        }

        // Tìm reply với idReply
        const reply = question.reply.find((r) => r.id === idReply);
        if (!reply) {
            return {
                status: 404,
                message: 'Phản hồi không tồn tại.',
            };
        }

        // Kiểm tra xem người dùng đã vote kiểu `type` chưa
        if (
            reply.vote[type].some(
                (element) => element.user_id.toString() === userId,
            )
        ) {
            return {
                status: 304,
                message: 'Người dùng đã vote kiểu này rồi.',
            };
        }

        let updateData = {
            $push: {
                [`reply.$.vote.${type}`]: {
                    user_id: userId,
                },
            },
        };

        // Kiểm tra nếu người dùng đã vote kiểu `notType`, nếu có thì chuyển đổi trạng thái
        if (
            reply.vote[notType].some(
                (element) => element.user_id.toString() === userId,
            )
        ) {
            updateData = {
                $push: {
                    [`reply.$.vote.${type}`]: {
                        user_id: userId,
                    },
                },
                $pull: {
                    [`reply.$.vote.${notType}`]: {
                        user_id: userId,
                    },
                },
            };
        }

        await questionModel.updateOne(
            {
                _id: idQuestion,
                'reply._id': idReply,
                deleted: false,
            },
            updateData,
        );

        return {
            status: 200,
            message: 'Bình chọn thành công!',
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Đã xảy ra lỗi khi cập nhật bình chọn.',
        };
    }
};

const completeQuestion = async (id) => {
    await questionModel.updateOne(
        {
            _id: id,
            deleted: false,
        },
        {
            status: 1,
        },
    );
};

export default {
    getQuestionbyId,
    postReply,
    voteReply,
    completeQuestion,
};
