import chatService from '../../services/client/chatService.js';
import chatAiProvider from '../../providers/chatAIProvider.js';

const run = async (res) => {
    // Nhớ try catch
    const userId = res.locals.user.id;

    _io.once('connection', (socket) => {
        socket.on('CLIENT_SEND_MESSAGE', async (data) => {
            // Lưu vào database
            await chatService.saveChat(userId, data);

            // Return MESSAGE
            _io.emit('SERVER_RETURN_MESSAGE', {
                userId: userId,
                content: data.content,
            });

            // Xử lý với AI
            const result = await chatAiProvider.generativeTextOnly(
                data.content,
            );

            if (result) {
                // Gửi socket tắt typing
            }

            const dataSave = {
                content: result,
            };

            await chatService.saveChat('assistant', dataSave);

            socket.emit('SERVER_SEND_MESSAGE_AI', result);
        });
    });
};

export default {
    run,
};
