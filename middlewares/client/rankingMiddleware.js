import userModel from '../../models/userModel.js';

const getRanking = async (req, res, next) => {
    const users = await userModel
        .find({
            status: 'active',
            deleted: false,
            points: { $gt: 0 },
        })
        .sort({ points: -1 })
        .limit(10)
        .select('-password');

    res.locals.ranking = users;

    next();
};

export default {
    getRanking,
};
