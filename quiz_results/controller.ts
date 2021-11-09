import { json, Request, Response } from 'express';
import statuscode from 'http-status-codes';
import { Schedule } from '../schedule/model';
import { Questions } from '../questions/models';
import { Iquiz } from '../quiz/models';
import { Quiz } from '../quiz/models';
import { IquizResults, QuizResults, SingleStudentAnswerSheet } from './model';
import { IquestionResults, QuestionResult } from './question_results/model'
import { getLogger } from 'nodemailer/lib/shared';

import { User } from '../user/model'
import { ReattemptResults } from './exam_results/reattempt_results/model';



export async function saveQuizResults(req: Request, res: Response) {
    const scheduleId = req.params.id;

    const answerSheet: SingleStudentAnswerSheet[] = req.body.answers;
    const quizName = req.body.quizName;
    const quizId = req.body.currentQuizId
    const savedObj = await QuizResults.create({ scheduleId, quizName, quizId, answerSheet }).catch(e => {
        console.log("Error is", e);
    })
    res.status(200).json(savedObj)
}

export async function getAllQuizResults(req: Request, res: Response) {
    try {
        const quizResults = await QuizResults.find();
        if (quizResults.length === 0) {
            res.status(statuscode.OK).json([])
        }
        res.status(statuscode.OK).json(quizResults)
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}

// single schedule quiz results
export async function getSingleScheduleQuizResults(req: Request, res: Response) {
    try {
        const scheduleId = req.params.id;
        const schedule = await Schedule.findById(scheduleId);
        if (!schedule) {
            res.status(statuscode.OK).json([])
        }
        const quizResults = await QuizResults.find({ scheduleId })
        console.log();

        res.status(statuscode.OK).json(quizResults)
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}

export async function getSingleQuizById(req: Request, res: Response) {
    try {
        const _id = req.params.id;
        const quizResults = await QuizResults.findById({ _id });
        if (!quizResults) {
            res.status(statuscode.OK).json([]);
        } else {
            res.status(statuscode.OK).json(quizResults);
        }

    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}


export async function getQuizResultsPercentage(req: Request, res: Response) {
    try {
        const result = [];
        const _id = req.params.id;
        const quizResults = await QuizResults.findById({ _id }).then((data) => {
            const studentMarks = [];
            for (const i of data.answerSheet) {
                let mark: number = 0
                let questLength: number = 0;
                for (const j of i.answerSheet) {
                    if (j.qtype !== 'matches') {
                        if (j.answer === 'Right') {
                            mark = mark + 1;
                        }
                        questLength = questLength + 1;
                    }
                    else {
                        for (const k of j.correctMatchAns) {
                            for (const l of j.matchAnsOption) {
                                if (l.opt.toLowerCase() === k.opt.toLowerCase()) {
                                    if (l.ans.toLowerCase() === k.ans.toLowerCase()) {
                                        mark = mark + 1;
                                    }
                                }
                            }
                        }
                        questLength = questLength + j.correctMatchAns.length;
                    }
                }
                const percentages = Math.round(mark * 100 / questLength);
                const userDetail = i;
                result.push({ userDetails: userDetail, quizName: data.quizName, percent: percentages, studMark: mark, totalQest: questLength });
            }
        })
        result.sort((a, b) => a.percent < b.percent ? 1 : -1);
        res.status(statuscode.OK).json(result);

    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}

export async function getQuizResultPercentageOfSingleStudent(req: Request, res: Response) {
    try {
        const result = [];
        const _id = req.params.id;
        const studentId = req.params.sid;
        const quizResults = await QuizResults.findById({ _id }).then((data) => {
            const studentMarks = [];
            for (const i of data.answerSheet) {
                let mark: number = 0
                let questLength: number = 0;
                for (const j of i.answerSheet) {
                    if (j.qtype !== 'matches') {
                        if (j.answer === 'Right') {
                            mark = mark + 1;
                        }
                        questLength = questLength + 1;
                    }
                    else {
                        for (const k of j.correctMatchAns) {
                            for (const l of j.matchAnsOption) {
                                if (l.opt.toLowerCase() === k.opt.toLowerCase()) {
                                    if (l.ans.toLowerCase() === k.ans.toLowerCase()) {
                                        mark = mark + 1;
                                    }
                                }
                            }
                        }
                        questLength = questLength + j.correctMatchAns.length;
                    }
                }
                const percentages = Math.round(mark * 100 / questLength);
                const userDetail = i;
                result.push({ userDetails: userDetail, quizName: data.quizName, percent: percentages, studMark: mark, totalQest: questLength });
            }
        })
        result.sort((a, b) => a.percent < b.percent ? 1 : -1);
        const foundStudent = [];
        console.log(result.length);
        for (const [index, value] of result.entries()) {
            if (value.userDetails.id === studentId) {
                foundStudent.push({ value, rank: index + 1 });
            }
        }
        res.status(statuscode.OK).json(foundStudent);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}




// export async function calculateQuizScore(req: Request, res: Response) {

// }

// export async function checkIfStudentHasResultByQuiz(req: Request, res: Response) {




// }
