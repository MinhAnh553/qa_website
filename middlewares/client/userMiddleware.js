import JwtProvider from '../../providers/JwtProvider.js';
import userService from '../../services/client/userService.js';

const infoUser = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (accessToken) {
        const accessTokenDecoded = await JwtProvider.verifyToken(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
        );
        const user = await userService.getUserByid(accessTokenDecoded.id);
        res.locals.user = user;
    }

    next();
};

export default {
    infoUser,
};
