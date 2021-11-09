import { boolean, string } from 'joi';
import mongoose, { mongo } from 'mongoose';
export interface IquestionResults {
    question_id: string,
    participant_id: string,
    not_answered: boolean,
    result: boolean,
    quiz_id: string,
    answer_submitted: string
}
const QuestionResultsSchema = new mongoose.Schema({
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    participant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    not_answered: Boolean,
    result: Boolean,
    answer_submitted: String

});

export const QuestionResult = mongoose.model<IquestionResults & mongoose.Document>("QuestionResult", QuestionResultsSchema);