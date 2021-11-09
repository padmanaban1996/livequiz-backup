import express from 'express';
import {
     getAllQuizResults, getSingleScheduleQuizResults, saveQuizResults,
    getQuizResultsPercentage, getQuizResultPercentageOfSingleStudent, getSingleQuizById,
} from './controller';
import { createQuestionResults, getAllQuestionResults, getSingleQuestionResults } from './question_results/controller';

export const QuizResultsRouter = express.Router();

// quiz_results
QuizResultsRouter.post('/:id', saveQuizResults);
QuizResultsRouter.get('/', getAllQuizResults);
QuizResultsRouter.get('/:id', getSingleScheduleQuizResults);

QuizResultsRouter.get('/getById/:id', getSingleQuizById)
QuizResultsRouter.get('/getPercentage/:id', getQuizResultsPercentage)
QuizResultsRouter.get('/getPerStudent/:id/:sid', getQuizResultPercentageOfSingleStudent)

// question_result
QuizResultsRouter.get('/question_result', getAllQuestionResults);
QuizResultsRouter.post('/question_result/:id', createQuestionResults);
QuizResultsRouter.get('/question_result/:id', getSingleQuestionResults);
// QuizResultsRouter.get('/getPercentage/:id',getPercentageOfSingleParticipant);




