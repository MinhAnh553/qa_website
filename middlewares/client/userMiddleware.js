import JwtProvider from '../../providers/JwtProvider.js';

const infoUser = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (accessToken) {
        const accessTokenDecoded = await JwtProvider.verifyToken(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
        );
        res.locals.user = accessTokenDecoded;
    }

    next();
};

export default {
    infoUser,
};
