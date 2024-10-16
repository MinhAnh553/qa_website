import chatService from '../../services/client/chatService.js';
import chatAiProvider from '../../providers/chatAIProvider.js';

const run = async (res) => {
    try {
        const userId = res.locals.user.id;

        _io.once('connection', (socket) => {
            socket.on('CLIENT_SEND_MESSAGE', async (data) => {
                // Lưu vào database
                await chatService.saveChat({
                    user_id: userId,
                    room_chat_id: userId,
                    content: data.content,
                });

                // Return MESSAGE
                socket.emit('SERVER_RETURN_MESSAGE', {
                    userId: userId,
                    content: data.content,
                });

                // Xử lý với AI
                const result = await chatAiProvider.generativeTextOnly(
                    userId,
                    data.content,
                );

                if (result) {
                    // Gửi socket tắt typing
                }

                // Lưu vào database
                await chatService.saveChat({
                    user_id: 'assistant',
                    room_chat_id: userId,
                    content: result,
                });

                socket.emit('SERVER_SEND_MESSAGE_AI', result);
            });
        });
    } catch (error) {
        throw new Error('Lỗi Server!');
    }
};

export default {
    run,
};
