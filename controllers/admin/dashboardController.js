// [GET] /admin/dashboard
const dashboardPage = async (req, res) => {
    try {
        res.render('admin/pages/dashboard/index', {
            pageTitle: 'Trang tổng quan',
        });
    } catch (error) {}
};

export default {
    dashboardPage,
};
