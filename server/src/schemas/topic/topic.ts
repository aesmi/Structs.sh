// Docs: https://mongoosejs.com/docs/schematypes.html
import mongoose from 'mongoose';

const topicMongoSchema = new mongoose.Schema({
    title: String,
    description: String,
    courses: [String],
    videos: [String],
    sourceCodeIds: [String],
    image: String,
});

export const TopicModel = mongoose.model('topic', topicMongoSchema);
