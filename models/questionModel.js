import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
    {
        user_id: String,
        description: String,
        images: Array,
        status: Number,
        reply: [
            {
                user_id: String,
                description: String,
                images: Array,
                vote: {
                    like: [
                        {
                            user_id: String,
                            createdAt: {
                                type: Date,
                                default: Date.now,
                            },
                        },
                    ],
                    dislike: [
                        {
                            user_id: String,
                            createdAt: {
                                type: Date,
                                default: Date.now,
                            },
                        },
                    ],
                },
                deleted: {
                    type: Boolean,
                    default: false,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    },
);

const questionModel = mongoose.model('Question', questionSchema, 'questions');

export default questionModel;
