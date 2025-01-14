import { LessonModel } from '../schemas/lesson/lesson';
import { Lesson } from '../typedefs/lesson/Lesson';

export class LessonMongoService {
    public async createLesson(
        topicId: string,
        title: string,
        rawMarkdown: string,
        creatorId: string
    ): Promise<Lesson> {
        try {
            const createLessonResponse = (await LessonModel.create({
                topicId: topicId,
                title: title,
                rawMarkdown: rawMarkdown,
                creatorId: creatorId,
                quizzes: [],
            })) as Lesson;
            return createLessonResponse;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    public async getAllLessons(): Promise<Lesson[]> {
        try {
            const lessonList = (await LessonModel.find()) as Lesson[];
            return lessonList;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    public async getLessonById(lessonId: string): Promise<Lesson> {
        try {
            const lessonData = (await LessonModel.findById(lessonId)) as Lesson;
            return lessonData;
        } catch (err) {
            const reg = /Cast to ObjectId failed/;
            if (reg.exec(err)) {
                throw new Error('Lesson requested does not exist.');
            }
            throw new Error(err.message);
        }
    }

    public async getLessonByUserId(creatorId: string): Promise<Lesson[]> {
        try {
            const lessons = (await LessonModel.find({
                creatorId: creatorId,
            })) as Lesson[];
            return lessons;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    public async updateLessonById(
        lessonId: string,
        title: string,
        rawMarkdown: string,
        quizzes: string[]
    ): Promise<Lesson> {
        try {
            const update = {
                title: title,
                rawMarkdown: rawMarkdown,
                quizzes: quizzes,
            };
            const returnData = (await LessonModel.findByIdAndUpdate(
                lessonId,
                update,
                { new: true, useFindAndModify: false }
            )) as Lesson;
            return returnData;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
