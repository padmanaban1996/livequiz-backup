import express from 'express';
import { createPushNotification, deleteNotificationByTeacherId, getPushNotificationByStudentId,
    getPushNotificationByTeacherId, updatePushNotification, updatTeacherPushNotification } from './controller';


export const PushNotificationRouter = express.Router();

PushNotificationRouter.get('/getNotify/:id', getPushNotificationByTeacherId);
PushNotificationRouter.get('/getStudentNotify/:id', getPushNotificationByStudentId)
PushNotificationRouter.delete('/deleteNotify/:id', deleteNotificationByTeacherId);
PushNotificationRouter.post('/create', createPushNotification);
PushNotificationRouter.put('/update/:id', updatePushNotification);
PushNotificationRouter.put('/updateTeacher/:id', updatTeacherPushNotification)

