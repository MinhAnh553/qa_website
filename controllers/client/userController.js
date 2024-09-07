import { StatusCodes } from 'http-status-codes';
import ms from 'ms';

import userService from '../../servers/client/userService.js';
import JwtProvider from '../../providers/JwtProvider.js';

// [GET] /user/register
const registerPage = async (req, res) => {
    try {
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
        const data = req.body;
        const newUser = await userService.createNew(data);
        if (newUser == 'emailExits') {
            res.status(StatusCodes.CONFLICT).json({
                message: 'Email đã tồn tại!',
            });
        } else {
            // JWT
            const userInfo = {
                id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
            };
            const accessToken = await JwtProvider.generateToken(
                userInfo,
                process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
                '1h',
                // '14 days'
            );
            const refreshToken = await JwtProvider.generateToken(
                userInfo,
                process.env.REFRESH_TOKEN_SECRET_SIGNATURE,
                '14 days',
            );

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: ms('14 days'),
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: ms('14 days'),
            });

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

export default {
    registerPage,
    registerUser,
};
