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
    studentAnswerSheet: SingleQuestion[]
}

export interface IreattemptResults {
    quizId: string,
    quizName: string,
    answerSheet: SingleParticipantAnswerSheet[],
}

const ReattemptResultsSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    quizName: { type: String },
    answerSheet: [{
        id: String,
        name: String,
        className: String,
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


export const ReattemptResults = mongoose.model<IreattemptResults & mongoose.Document>("AttemptResult", ReattemptResultsSchema);

