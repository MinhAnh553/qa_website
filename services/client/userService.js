import bcrypt from 'bcrypt';
import ms from 'ms';

import userModel from '../../models/userModel.js';
import JwtProvider from '../../providers/JwtProvider.js';

const createNew = async (data, res) => {
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

            // JWT
            const userInfo = {
                id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
            };
            const accessToken = await JwtProvider.generateToken(
                userInfo,
                process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
                // '1h',
                '14 days',
            );

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: ms('14 days'),
            });

            return newUser;
        }
    } catch (error) {
        throw error;
    }
};

const login = async (data, res) => {
    try {
        const { email, password } = data;
        const user = await userModel.findOne({
            email: email,
            deleted: false,
        });
        if (!user) {
            return { message: 'Tài khoản không tồn tại trong hệ thống!' };
        }
        if (user.status == 'unActive') {
            return { message: 'Tài khoản đã bị cấm!' };
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
            const userInfo = {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
            };
            const accessToken = await JwtProvider.generateToken(
                userInfo,
                process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
                // '1h',
                '14 days',
            );

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: ms('14 days'),
            });

            return {
                userInfo: userInfo,
                message: 'Đăng nhập thành công!',
            };
        } else {
            return { message: 'Mật khẩu không chính xác!' };
        }
    } catch (error) {
        throw error;
    }
};

export default { createNew, login };
