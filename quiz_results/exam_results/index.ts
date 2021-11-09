import express from 'express';
import {
    createExamResult, getAllQuizResultsByStudentId,
    getPercentageOfExamination, getPercentageOfSingleParticipant, getQuizResultByResultId,
    getAttemptPercentageOfSingleParticipant, getLengthofTheResults,
    getpercentageListOfLastReattempt, getpercentageListOfLatestandLastReattempt, getTeacherDashboardDetails, deleteExamResults
} from './controller';


export const ExamResultsRouter = express.Router();

ExamResultsRouter.post('/create/:id', createExamResult);
ExamResultsRouter.get('/getPercentage/:id', getPercentageOfExamination);
ExamResultsRouter.get('/getPerStudent/:id/:sid', getPercentageOfSingleParticipant);
ExamResultsRouter.get('/results/:id', getAllQuizResultsByStudentId)
ExamResultsRouter.get('/getResult/:id', getQuizResultByResultId)

ExamResultsRouter.get('/getAttemptResult/:id1/:id2', getAttemptPercentageOfSingleParticipant)
ExamResultsRouter.get('/getLength/:id', getLengthofTheResults);
ExamResultsRouter.get('/getEarlyLength/:id', getpercentageListOfLastReattempt);
ExamResultsRouter.get('/getLatestandEarly/:id', getpercentageListOfLatestandLastReattempt)

ExamResultsRouter.get('/teacherDashboard/:id', getTeacherDashboardDetails);

ExamResultsRouter.delete('/deleteExamResults/:id', deleteExamResults);

