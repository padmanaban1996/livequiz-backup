import { Request, Response } from 'express';
import statuscode from 'http-status-codes';
import { QuestionResult } from './model';
import { Iquestion, Questions } from '../../questions/models';
import { Session } from 'inspector';

export async function getAllQuestionResults(req: Request, res: Response) {
    try {
        const questionResults = await QuestionResult.find();
        if (questionResults.length === 0) {
            // res.status(statuscode.NOT_FOUND).json({ msg: "not found.create One" })
            res.status(statuscode.OK).json([])
        }
        res.status(statuscode.OK).json(questionResults);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}


export async function getSingleQuestionResults(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const questionResults = await QuestionResult.findById(id);
        if (!questionResults) {
            // res.status(statuscode.NOT_FOUND).json({ msg: "not found.create One" })
            res.status(statuscode.OK).json([])
        }
        res.status(statuscode.OK).json(questionResults);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}

export async function createQuestionResults(req: Request, res: Response) {
    try {
        const { question_id, participant_id, not_answered, answer_submitted } = req.body;
        const quizId = req.params.id;
        let actualAnswer: string;

        let result: boolean;
        await Questions.findById(question_id).then((data: Iquestion) => {
            actualAnswer = data.correctAnswer;

            if (answer_submitted === actualAnswer) {
                result = true;
            } else {
                result = false;
            }

        })
        const questionResult = await QuestionResult.create({ question_id, quiz_id: quizId, participant_id, not_answered, result, answer_submitted });
        res.status(statuscode.OK).json(questionResult);


    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}