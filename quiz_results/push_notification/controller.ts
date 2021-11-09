import { json, Request, response, Response } from 'express';
import statuscode from 'http-status-codes';
import { PushNotify } from './model';


export async function createPushNotification(req: Request, res: Response) {
    const { teacherId, studentId, studentName, studentsArray, status, quizName, quizId, teacherName, medalType } = req.body;
    try {
        const notify = await PushNotify.create({ teacherId, studentId, studentName, view: false, studentsArray, status, quizName, quizId, teacherName, medalType });
        const twoDaysOld = new Date()
        twoDaysOld.setHours(twoDaysOld.getHours() - 48)
        const notifications = await PushNotify.remove({
            updatedAt
                : { $lt: twoDaysOld }
        })
        if (notify) {
            res.status(statuscode.OK).json(notify);
        } else {
            res.status(statuscode.OK).json([]);
        }
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}

export async function updatePushNotification(req: Request, res: Response) {
    const id = req.params.id
    const notify = await PushNotify.updateMany(
        { "studentsArray.studentId": id },
        {
            $set: { "studentsArray.$.view": true }
        }
    )
    console.log(notify);

    res.status(statuscode.OK).json(notify);
}

export async function getPushNotificationByTeacherId(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const notify = await PushNotify.find({ "teacherId": id });
        if (!notify) {
            res.status(statuscode.OK).json([]);
        } else {
            res.status(statuscode.OK).json(notify);
        }
    } catch (error) {
        res.json(error)
    }
}

export async function getPushNotificationByStudentId(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const notify = await PushNotify.find({ "studentsArray.studentId": id });
        if (!notify) {
            res.status(statuscode.OK).json([]);
        } else {
            res.status(statuscode.OK).json(notify);
        }
    } catch (error) {
        res.json(error)
    }
}

export async function deleteNotificationByTeacherId(req: Request, res: Response) {
    const id = req.params.id;
    PushNotify.findByIdAndRemove({ "teacherId": id })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete notification with. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "Notification was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Notification."
            });
        });
}

export async function updatTeacherPushNotification(req: Request, res: Response) {
    const id = req.params.id
    const notify = await PushNotify.updateMany(
        { "teacherId": id },
        {
            $set: { "view": true }
        }
    )
    console.log(notify);

    res.status(statuscode.OK).json(notify);
}