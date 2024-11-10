import JwtProvider from '../../providers/JwtProvider.js';
import userService from '../../services/client/userService.js';

const isAuthorized = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        res.redirect(`/user/login`);
        return;
    }

    if (accessToken) {
        const accessTokenDecoded = await JwtProvider.verifyToken(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
        );
        const user = await userService.getUserByid(accessTokenDecoded.id);
        if (user.isAdmin != 1) {
            res.redirect(`/`);
            return;
        }
        next();
    }
};

export default {
    isAuthorized,
};
