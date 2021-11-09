import { string } from 'joi';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';


export interface Iquiz {
    name: string,
    shareId: string,
    videos: any[],
    concept: string,
    department: string,
    questions: Iquestion[],
    belongsToSchool: string,
    createdBy: string,
    subject: string,
    subjectImage: string,
    eachQuestionTime: string,
    classes: [{
        className: string
    }],
    participants: [{
        studentId: string,
        attended: boolean
    }],
    showAnswers: boolean,
    startAt: string,
    session_started: boolean,
    session_ended: boolean,
    scheduled: boolean
}

export interface ImatchAns {
    opt: string,
    ans: string
}
// export interface Idiffer{
//     headingleft: string,
//     headingright: string,
//     optionLeft: string[],
//     optionRight: string[],
// }

export interface Imatch {
    optionLeft: string[],
    optionRight: string[],
    correctAnswers: ImatchAns[],
}

export interface Iquestion {
    title: string,
    paragraph: string,
    image: string,
    matchfollow: Imatch


    // differ: Idiffer

    a: string,
    b: string,
    c: string,
    d: string,
    questionAudio: string,
    optionAaudio: string,
    optionBaudio: string,
    optionCaudio: string,
    optionDaudio: string,
    correctAnswer: string,
    qtype: string,
    seconds: number,
    createdBy: string
}


const QuizSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shareId: String,
    videos: [{
        vtype: String,
        video: String
    }],
    concept: String,
    department: String,
    eachQuestionTime: String,
    questions: [{
        title: { type: String },
        paragraph: String,
        image: String,
        matchfollow: {
            optionLeft: { type: [String] },
            optionRight: { type: [String] },
            correctAnswers: [{
                opt: String,
                ans: String
            }]
        },

        // differ: {
        //     headingleft: String,
        //     headingright: String,
        //     optionLeft: { type: [String] },
        //     optionRight: { type: [String] },
        // },

        a: String,
        b: String,
        c: String,
        d: String,

        questionAudio: String,
        optionAaudio: String,
        optionBaudio: String,
        optionCaudio: String,
        optionDaudio: String,

        correctAnswer: String,
        qtype: { type: String },
        seconds: Number,
        createdBy: String
    }],
    classes: [{
        className: String
    }],
    participants: [{
        studentId: String,
        attended: { type: Boolean, default: false }
    }],
    showAnswers: Boolean,
    subject: String,
    subjectImage: String,
    scheduled: { type: Boolean, default: false },
    startAt: String,
    session_started: { type: Boolean, default: false },
    session_ended: { type: Boolean, default: false },
    belongsToSchool: String,
    createdBy: String,

}, { timestamps: true });


// export const Quiz = mongoose.model('Quiz', QuizSchema);

export const Quiz = mongoose.model<Iquiz & mongoose.Document>("quizzes", QuizSchema);
