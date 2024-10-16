import chatModel from '../../models/chatModel.js';
import userModel from '../../models/userModel.js';
import chatSocket from '../../sockets/client/chatSocket.js';

const getChats = async (res) => {
    // Socket
    chatSocket.run(res);

    const chats = await chatModel.find({
        deleted: false,
    });

    // if (chats) {
    //     for (const chat of chats) {
    //         const user = await userModel
    //             .findOne({
    //                 _id: chat.user_id,
    //                 deleted: false,
    //             })
    //             .select('fullName');

    //         chat.infoUser = user;
    //     }
    // }
    return chats;
};

const saveChat = async (userId, data) => {
    const chat = new chatModel({
        user_id: userId,
        content: data.content,
    });
    await chat.save();
};

export default { getChats, saveChat };
