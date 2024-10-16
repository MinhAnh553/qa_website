import OpenAI from 'openai';
import dotenv from 'dotenv';
import chatService from '../services/client/chatService.js';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generativeTextOnly = async (userId, message) => {
    try {
        // 10 tin nhắn gần nhất + 1 tin người dùng mới gửi
        const chatsHistory = await chatService.getChatByRoomChatID(userId);
        let conversationHistory = [];
        chatsHistory.forEach((chat) => {
            conversationHistory.push({
                role: chat.user_id == 'assistant' ? 'assistant' : 'user',
                content: chat.content,
            });
        });

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini-2024-07-18', // Model GPT
            messages: conversationHistory,
        });

        const result = completion.choices[0].message.content;

        const convertBackticksToCodeTags = (text) => {
            let isInsideCodeBlock = false;

            return text.replace(/```/g, () => {
                if (isInsideCodeBlock) {
                    isInsideCodeBlock = false;
                    return '</code>';
                } else {
                    isInsideCodeBlock = true;
                    return '<code>';
                }
            });
        };

        const escapeSpecialCharacters = (text) => {
            const escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;',
                '\n': '<br>',
                '\t': '&nbsp;&nbsp;&nbsp;&nbsp;',
            };

            return text.replace(
                /[&<>"'\n\t]/g,
                (match) => escapeMap[match] || match,
            );
        };

        let safeResult = escapeSpecialCharacters(result);
        // console.log('MinhAnh553: generativeTextOnly -> safeResult', safeResult);

        safeResult = convertBackticksToCodeTags(safeResult);
        // console.log('MinhAnh553: generativeTextOnly -> safeResult', safeResult);

        return safeResult;
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error('Lỗi Server!');
    }
};

export default {
    generativeTextOnly,
};
