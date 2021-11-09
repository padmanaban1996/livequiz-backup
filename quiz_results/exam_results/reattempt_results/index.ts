import express from 'express';
import { createReattemptResult, getAttemptPercentageOfSingleParticipant, getPercentageOfReattemptedExamination, getReattemptResultByResultId } from './controller';



export const ReattemptResultsRouter = express.Router();

ReattemptResultsRouter.post('/create/:id', createReattemptResult);
ReattemptResultsRouter.get('/getPercentage/:id', getPercentageOfReattemptedExamination);
ReattemptResultsRouter.get('/getPerStudent/:id/:sid', getAttemptPercentageOfSingleParticipant);
ReattemptResultsRouter.get('/getResult/:id', getReattemptResultByResultId)