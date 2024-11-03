import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        avatar: String,
        points: {
            type: Number,
            default: 0,
        },
        likes: {
            type: Number,
            default: 0,
        },
        birthDate: String,
        describe: String,
        status: {
            type: String,
            default: 'active',
        },
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

const userModel = mongoose.model('User', userSchema, 'users');

export default userModel;
