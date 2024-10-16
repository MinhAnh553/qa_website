import chatModel from '../../models/chatModel.js';
import userModel from '../../models/userModel.js';
import chatSocket from '../../sockets/client/chatSocket.js';

const getChats = async (res) => {
    // Run Socket
    chatSocket.run(res);

    const userId = res.locals.user.id;

    const chats = await chatModel.find({
        room_chat_id: userId,
        deleted: false,
    });

    return chats;
};

const saveChat = async (data) => {
    const chat = new chatModel(data);
    await chat.save();
};

const getChatByRoomChatID = async (room_chat_id) => {
    const chats = await chatModel
        .find({
            room_chat_id: room_chat_id,
            deleted: false,
        })
        .sort({ createdAt: -1 })
        .limit(10);

    return chats.reverse();
};

export default { getChats, saveChat, getChatByRoomChatID };
