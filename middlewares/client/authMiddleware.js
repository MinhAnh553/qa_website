import JwtProvider from '../../providers/JwtProvider.js';

const isAuthorized = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        res.redirect(`/user/login`);
    }

    try {
        const accessTokenDecoded = await JwtProvider.verifyToken(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
        );
        next();
    } catch (error) {
        res.redirect(`/user/login`);
    }
};

export default {
    isAuthorized,
};
