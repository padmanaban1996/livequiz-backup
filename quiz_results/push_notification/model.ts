import { date, string } from 'joi';
import mongoose from 'mongoose';


export interface PushNotification {
    teacherId: string;
    studentId: string;
    view: boolean;
    studentsArray: [{
        view: boolean,
        studentId: string
    }],
    studentName: string;
    status: string;
    quizName: string;
    quizId: string;
    teacherName: string;
    medalType: string;
}

const PushNotificationSchema = new mongoose.Schema({
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    studentId: String,
    view: {type: Boolean, default:false},
    studentsArray: [{
        view: {type: Boolean, default:false},
        studentId: String
    }],
    studentName: String,
    status: String,
    quizName: String,
    quizId: String,
    teacherName: String,
    medalType: String
}, { timestamps: true });

export const PushNotify = mongoose.model<PushNotification & mongoose.Document>("Notifications", PushNotificationSchema);