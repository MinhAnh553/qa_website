import bcrypt from 'bcrypt';
import userModel from '../../models/userModel.js';

const getAllUser = async (req, res) => {
    try {
        let find = {
            deleted: false,
        };
        const emailSearch = req.query.email;
        if (emailSearch) {
            find.email = { $regex: emailSearch, $options: 'i' };
        }
        const users = await userModel.find(find).select('-password');

        return users;
    } catch (error) {}
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const result = await userModel.updateOne(
        {
            _id: id,
        },
        {
            deleted: true,
        },
    );

    if (result.modifiedCount > 0) {
        return 'OK';
    } else {
        return 'NOT_FOUND';
    }
};

const getUserById = async (id) => {
    try {
        const user = await userModel.findOne({
            _id: id,
            deleted: false,
        });

        return user;
    } catch (error) {}
};

const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const userExits = await userModel.findOne({
            _id: { $ne: id },
            email: data.email,
            deleted: false,
        });
        if (userExits) {
            return 'emailExits';
        } else {
            data.password = await bcrypt.hash(data.password, 10);
            await userModel.updateOne(
                {
                    _id: id,
                    deleted: false,
                },
                {
                    ...data,
                },
            );
        }
    } catch (error) {
        throw error;
    }
};

export default {
    getAllUser,
    deleteUser,
    getUserById,
    editUser,
};
