import { json, Request, Response } from 'express';
import statuscode from 'http-status-codes';
import { IreattemptResults, ReattemptResults, SingleParticipantAnswerSheet } from './model';


export async function createReattemptResult(req: Request, res: Response) {
    const quizId = req.params.id;
    const answerSheet: SingleParticipantAnswerSheet[] = req.body.answerSheet;
    const quizName = req.body.quizName;
    try {
        const questions = await ReattemptResults.create({ quizId, quizName, answerSheet })
        return res.json(questions);
    } catch (error) {
        console.log(error.message)
    }
}

export async function getReattemptResultByResultId(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const questions = await ReattemptResults.findById(id)
        return res.json(questions);
    } catch (error) {
        console.log(error.message)
    }
}

export async function getPercentageOfReattemptedExamination(req: Request, res: Response) {
    try {
        const result = [];
        const quizId = req.params.id;
        const quizResults = await ReattemptResults.find({ quizId }).then(async (data: IreattemptResults[]) => {
            const studentMarks = [];
            for (const x of data) {
                for (const i of x.answerSheet) {
                    let mark: number = 0
                    let questLength: number = 0;
                    for (const j of i.studentAnswerSheet) {
                        if (j.qtype !== 'matches') {
                            if (j.answerOption === 'Right') {
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
                    result.push({ userDetails: userDetail, percent: percentages, studMark: mark, totalQest: questLength });
                }
            }
        })

        result.sort((a, b) => a.percent < b.percent ? 1 : -1);
        res.status(statuscode.OK).json({ result, topThree: result.slice(0, 3) });

    }
    catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}

export async function getAttemptPercentageOfSingleParticipant(req: Request, res: Response) {
    try {
        const result = [];
        const quizId = req.params.id;
        const studentId = req.params.sid;
        const quizResults = await ReattemptResults.find({ quizId }).then(async (data: IreattemptResults[]) => {
            const studentMarks = [];
            for (const x of data) {
                for (const i of x.answerSheet) {
                    let mark: number = 0
                    let questLength: number = 0;
                    for (const j of i.studentAnswerSheet) {
                        if (j.qtype !== 'matches') {
                            if (j.answerOption === 'Right') {
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
                    result.push({ userDetails: userDetail, percent: percentages, studMark: mark, totalQest: questLength });

                }
            }
        })

        result.sort((a, b) => a.percent < b.percent ? 1 : -1);

        const foundStudent = [];
        for (const [index, value] of result.entries()) {
            if (value.userDetails.id === studentId) {
                foundStudent.push(value);
            }
        }

        res.status(statuscode.OK).json(foundStudent);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}
