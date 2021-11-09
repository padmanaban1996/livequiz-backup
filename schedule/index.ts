import express from 'express';
import { createLiveClassActivity, createOne, getAllById, getLiveClassUserActivity, classSessionStarted, classSessionEnded, deletOne, saveAttendance, pinStatus, unPinStatus } from './controller';

export const scheduleRouter = express.Router();

// CRUD API
scheduleRouter.get('/:schoolId/:id', getAllById);
scheduleRouter.post('/', createOne)
scheduleRouter.delete('/:id', deletOne)

// have differant router for each grouped functions
// liveClass state
scheduleRouter.put("/room_state/:id/schedule/sessionStarted/", classSessionStarted);
scheduleRouter.put("/room_state/:id/schedule/sessionEnded/", classSessionEnded);


// User Activity Live Class
scheduleRouter.get('/user_activity/:scheduleId', getLiveClassUserActivity); // get all user activities of single schedule
scheduleRouter.post('/user_activity/:scheduleId', createLiveClassActivity); // create user activity of user id to schedule id

// Pin Status
scheduleRouter.put("/room_state/:id/schedule/pinStatus/", pinStatus);
scheduleRouter.put("/room_state/:id/schedule/unpinStatus/", unPinStatus);
// attendace
scheduleRouter.put('/:id/attendance', saveAttendance)
// send date wise schedule