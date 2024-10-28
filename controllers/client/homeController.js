// [GET] /
const homePage = async (req, res) => {
    try {
        // res.render('client/pages/home/index', {
        //     pageTitle: 'Trang chủ',
        // });

        res.redirect('/question');
    } catch (error) {}
};

export default {
    homePage,
};
