import { StatusCodes } from 'http-status-codes';

import userService from '../../services/admin/userService.js';

// [GET] /admin/user
const userdPage = async (req, res) => {
    try {
        const users = await userService.getAllUser(req, res);

        res.render('admin/pages/user/index', {
            pageTitle: 'Người dùng',
            users,
        });
    } catch (error) {}
};

// [DELETE] /admin/user/delete/:id
const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req, res);
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

// [GET] /admin/user/edit/:id
const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);

        res.render('admin/pages/user/edit', {
            pageTitle: 'Chỉnh sửa người dùng',
            user,
        });
    } catch (error) {}
};

// [PATCH] /admin/user/edit/:id
const postEditUser = async (req, res) => {
    try {
        await userService.editUser(req, res);

        res.redirect('back');
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

export default {
    userdPage,
    deleteUser,
    editUser,
    postEditUser,
};
