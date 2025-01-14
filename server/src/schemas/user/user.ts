// Docs: https://mongoosejs.com/docs/schematypes.html
import mongoose from 'mongoose';

const userMongoSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

export const UserModel = mongoose.model('users', userMongoSchema);
