import bcrypt from 'bcrypt';
import userModel from '../../models/userModel.js';

const createNew = async (data) => {
    try {
        const userExits = await userModel.findOne({
            email: data.email,
            deleted: false,
        });
        if (userExits) {
            return 'emailExits';
        } else {
            data.password = await bcrypt.hash(data.password, 10);
            const user = new userModel(data);

            const newUser = await user.save();

            return newUser;
        }
    } catch (error) {
        throw error;
    }
};

export default { createNew };
