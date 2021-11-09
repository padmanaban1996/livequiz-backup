/* eslint @typescript-eslint/no-var-requires: "off" */
import express, { Request, Response } from 'express';

// set env variables
import * as dotenv from 'dotenv';
dotenv.config();
import { middlewares } from './middlewares';
import { quizRouter } from './quiz/index';
import { dbConnect } from './config/dbConnect';
import { questionsRouter } from './questions';
import { userRouter } from './user';
import { scheduleRouter } from './schedule/index'
import consumeFromQueue from './rabbitMq/consumeFromQueue';
import { config } from './config/config';
import { schoolRouter } from './school';
import { QuizResultsRouter } from './quiz_results';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { dashBoardRouter } from './dashboard';
import favicon from 'serve-favicon';
import { StatusCodes } from 'http-status-codes';
import { PORT } from './enviroment';
import { MODE } from './enviroment';
import { superAdminRouter } from './superadmin';
import { ReattemptResultsRouter } from './quiz_results/exam_results/reattempt_results';
import { ExamResultsRouter } from './quiz_results/exam_results';
import { PushNotificationRouter } from './quiz_results/push_notification';
import { galleryRouter } from './gallery'
const app = express();



// rabbit mq recieve test
// consume like below where you need it
// consumeFromQueue(config.rabbit.queue);

// Database Connection
dbConnect();

// middleware
middlewares(app);
app.use(favicon(__dirname + '/../favicon.ico'));


// Routes
// app.use('/', (req: Request, res: Response) => {
//     res.status(200).json({ "api": "Started Successfully" })
// })
app.use('/api/questions', questionsRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/user', userRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/school', schoolRouter);
app.use('/api/quiz_results', QuizResultsRouter);
app.use('/api/dashboard', dashBoardRouter);
app.use('/api/exam_results', ExamResultsRouter);
app.use('/api/gallery', galleryRouter)
app.use('/api/superadmin', superAdminRouter);
app.use('/api/reattempt_results', ReattemptResultsRouter);
app.use('/api/push_notify', PushNotificationRouter);

// below points to the question excel upload functions


// general error
/*app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    // error.status = 404;
    next(error); // this calls the error handling middleware
}) */
// Error handling middleware.
app.use((error, req, res, next) => {
    return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
})

// serve
app.listen(PORT, () => {
    console.log(` ${MODE} model`);
    console.log(`Server runs at Port : ${PORT}`);
});

const io = require('socket.io')(app.listen(5001));

app.set('socket.io', io);

io.on('connect', socket => {
    socket.emit('id', socket.id) // send each client their socket id
    console.log("User Connected");
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

