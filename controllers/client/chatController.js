import chatService from '../../services/client/chatService.js';

// [GET] /chat
const chatPage = async (req, res) => {
    try {
        const chats = await chatService.getChats(res);
        res.render('client/pages/chat/index', {
            pageTitle: 'Chat AI',
            chats: chats,
        });
    } catch (error) {}
};

export default {
    chatPage,
};
