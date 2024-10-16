import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generativeTextOnly = async (message) => {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini-2024-07-18', // Model GPT
            messages: [{ role: 'user', content: message }],
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

// import OpenAI from 'openai';

// const configuration = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Mảng lưu trữ lịch sử cuộc trò chuyện (tin nhắn người dùng và phản hồi AI)
// let conversationHistory = [
//   { role: 'system', content: 'You are a helpful assistant.' }, // Tin nhắn hệ thống ban đầu (nếu cần)
// ];

// const generativeTextWithContext = async (message) => {
//   try {
//     const openai = new OpenAI(configuration);

//     // Thêm tin nhắn của người dùng vào lịch sử cuộc trò chuyện
//     conversationHistory.push({ role: 'user', content: message });

//     // Gửi yêu cầu với toàn bộ lịch sử trò chuyện
//     const completion = await openai.chat.completions.create({
//       model: 'gpt-4o-mini-2024-07-18',
//       messages: conversationHistory,
//     });

//     // Phản hồi của AI
//     const aiResponse = completion.choices[0].message;

//     // Lưu phản hồi từ AI vào lịch sử trò chuyện
//     conversationHistory.push({ role: 'assistant', content: aiResponse.content });

//     // Trả về kết quả phản hồi từ AI
//     return aiResponse.content;
//   } catch (error) {
//     console.error('Error:', error);
//     return 'Lỗi Server!';
//   }
// };

// export default {
//   generativeTextWithContext,
// };
