import { StatusCodes } from 'http-status-codes';
import ms from 'ms';

import userService from '../../services/client/userService.js';
import questionService from '../../services/client/questionService.js';

// [GET] /user/register
const registerPage = async (req, res) => {
    try {
        const accessToken = req.cookies?.accessToken;
        if (accessToken) {
            res.redirect(`/`);
            return;
        }

        res.render('client/pages/user/register', {
            pageTitle: 'Đăng ký',
        });
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [POST] /user/register
const registerUser = async (req, res) => {
    try {
        const newUser = await userService.createNew(req.body, res);
        if (newUser == 'emailExits') {
            res.status(StatusCodes.CONFLICT).json({
                message: 'Email đã tồn tại!',
            });
        } else {
            res.status(StatusCodes.OK).json({
                message: 'Tạo tài khoản thành công!',
            });
        }
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [GET] /user/login
const loginPage = async (req, res) => {
    try {
        const accessToken = req.cookies?.accessToken;
        if (accessToken) {
            res.redirect(`/`);
            return;
        }

        res.render('client/pages/user/login', {
            pageTitle: 'Đăng nhập',
        });
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [POST] /user/login
const loginUser = async (req, res) => {
    try {
        const user = await userService.login(req.body, res);
        if (user.userInfo) {
            res.status(StatusCodes.OK).json({
                message: user.message,
            });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: user.message,
            });
        }
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [GET] /user/logout
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.redirect('/user/login');
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [GET] /user/edit-info
const getEditInfoPage = async (req, res) => {
    try {
        const id = res.locals.user.id;
        const user = await userService.getUserByid(id);

        res.render('client/pages/user/edit-info', {
            pageTitle: 'Chỉnh sửa thông tin',
            user: user,
        });
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [POST] /user/edit-info
const postEditInfo = async (req, res) => {
    try {
        await userService.editInfo(req, res);

        res.redirect('back');
    } catch (error) {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            message: 'Server Error!',
        });
    }
};

// [GET] /user/:id
const getUserPage = async (req, res) => {
    try {
        const id = req.params.id;
        const page = req.query.page || 'questions';
        const user = await userService.getUserByid(id);
        let result = '';
        if (page == 'questions') {
            result = await questionService.getQuestionByUser(req, res);
        } else {
            result = await questionService.getReplyByUser(req, res);
        }

        res.render('client/pages/user/info', {
            pageTitle: 'Trang cá nhân',
            userInfo: user,
            page: page,
            result: result,
        });
    } catch (error) {
        return res.status(404).render('client/pages/error/404.pug', {
            pageTitle: 'Không tìm thấy trang',
            message: 'Người dùng không tồn tại!',
        });
    }
};

export default {
    registerPage,
    registerUser,
    loginPage,
    loginUser,
    logoutUser,
    getEditInfoPage,
    postEditInfo,
    getUserPage,
};
