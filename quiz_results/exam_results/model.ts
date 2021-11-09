import { date, string } from 'joi';
import mongoose from 'mongoose';

export interface SingleQuestion {
    answerOption: string  // right r wrong
    studentAns: string
    matchAnsOption: any[]
    qtype: string
    correctMatchAns: any[];
    correctAnswer: string
    selectedIndex: string
    title: string
    answer: string
}

export interface SingleParticipantAnswerSheet {
    id: string
    name: string
    className: string
    starts_at: string
    ends_at: string
    studentAnswerSheet: SingleQuestion[]
}

export interface IexamResults {
    quizId: string,
    quizName: string,
    subject: string,
    concept: string,
    department: string,
    status: string,
    answerSheet: SingleParticipantAnswerSheet[],
}

const ExamQuizResultsSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    quizName: { type: String },
    subject: { type: String },
    concept: { type: String },
    department: { type: String },
    status: String,
    answerSheet: [{
        id: String,
        name: String,
        className: String,
        starts_at: String,
        ends_at: String,
        studentAnswerSheet: [{
            answerOption: String,
            matchAnsOption: [{
                opt: String,
                ans: String
            }],
            correctMatchAns: [{
                opt: String,
                ans: String
            }],
            qtype: String,

            correctAnswer: String,
            selectedIndex: String,
            studentAns: String,
            title: String,
            answer: String,
        }]
    }]
}, { timestamps: true });

export const ExamResults = mongoose.model<IexamResults & mongoose.Document>("ExamResult", ExamQuizResultsSchema);



