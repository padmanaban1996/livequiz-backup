import express from 'express';

import { createQuiz, deleteSingleQuiz, findAllBySchool, findAllByTeacher, quizSessionEnded, quizSessionStarted, singleQuiz, updateQuiz, findAllByStudent, getAllQuizResultsByTeacherId, quizparticipantAttended, quizparticipantUpdate } from './controller';

export const quizRouter = express.Router();

quizRouter.post('/create', createQuiz);
quizRouter.get('/student/:id', findAllByStudent);
quizRouter.get('/teacher/:id', findAllByTeacher);
quizRouter.get('/school/:id', findAllBySchool);
quizRouter.get('/:id', singleQuiz);

quizRouter.delete("/delete/:id", deleteSingleQuiz);
quizRouter.put('/update/:id', updateQuiz);

quizRouter.get('/teacherResults/:id', getAllQuizResultsByTeacherId);

quizRouter.put("/quiz_state/:id/quiz/sessionStarted/", quizSessionStarted);
quizRouter.put("/quiz_state/:id/quiz/sessionEnded/", quizSessionEnded);
quizRouter.put('/quiz_participant_state/:quizId/:studentId', quizparticipantAttended)
quizRouter.put('/quiz_participant_update/:quizId/:studentId', quizparticipantUpdate)

