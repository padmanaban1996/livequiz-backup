import { string } from 'joi';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';


export interface ImatchAns{
    opt:string,
    ans:string
}

export interface Imatch {
    optionLeft: string[],
    optionRight: string[],
    correctAnswers: ImatchAns[],
}

export interface Iquestion {
    title: string,
    paragraph:string,
    image:string,
    matchfollow:Imatch
    a: string,
    b: string,
    c: string,
    d: string,
    correctAnswer: string,
    qtype: string,
    seconds: number,
    createdBy: string
}

const QuestionsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    paragraph:String,
    image: String,
    matchfollow:{
        optionLeft:{ type: [String], default: []},
        optionRight:{ type: [String], default: []},
        correctAnswers:[{
            opt:{type:String},
            ans:{type:String}
        }]
    },
    a: String,
    b: String,
    c: String,
    d: String,
    correctAnswer: String,
    qtype: { type: String, required: true },
    seconds: Number,
    createdBy: String
}, { timestamps: true });

// const MatchesSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     optionLeft:{ type: [String], default: []},
//     optionRight:{ type: [String], default: []},
//     correctAnswer:[{
//          opt:String,
//          ans:String
//     }],
//     qtype:String,
//     seconds: Number,
//     createdBy: String,
// }, { timestamps: true });


export const Questions = mongoose.model<Iquestion & mongoose.Document>('Questions', QuestionsSchema);
// export const MatchQuestions = mongoose.model<Imatches & mongoose.Document>('MatchQuestions', MatchesSchema);