import mongoose from 'mongoose';

export interface SingleQuestionAnswer {
    answerOption: string
    questionIndex: number
    selectedIndex: string
    matchAnsOption: any[]
    qtype: string
    correctMatchAns: any[]
    title: string
    answer: string
    answered: boolean
}

export interface SingleStudentAnswerSheet {
    id: string
    name: string
    answerSheet: SingleQuestionAnswer[]
}

export interface IquizResults {
    scheduleId: string,
    quizName: string,
    quizId: string,
    answerSheet: SingleStudentAnswerSheet[],
}

const QuizResultsSchema = new mongoose.Schema({
    scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    quizName: String,
    quizId: String,
    answerSheet: [{
        id: String,
        name: String,
        answerSheet: [{
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

            questionIndex: Number,
            selectedIndex: String,
            title: String,
            answer: String,
            answered: Boolean
        }]
    }]
}, { timestamps: true });



export const QuizResults = mongoose.model<IquizResults & mongoose.Document>("QuizResult", QuizResultsSchema);
