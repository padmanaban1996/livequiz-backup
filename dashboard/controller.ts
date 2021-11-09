
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { date } from "joi";
import { Schedule } from "../schedule/model";
import { User } from "../user/model";

export interface IadminDashboard {
    studentsCount: number
    teachersCount: number
    liveSchedulesCount: number
    upcomingSchedulesCount: number
    closedSchedule: number
    // subscription_valid_till: Date
    attendancePercentage: IattendancePercentage[],
    teacherClosedClassChart: IteacherClosedClassChart[]
}

export interface IattendancePercentage {

    date: string,
    participants: number
    attended: number // sum up of all classess percentage.
}
export interface IteacherClosedClassChart {
    host_id: string
    count: number
}

// seperate the below api as distinct ones.
export async function getAdminDashboard(req: Request, res: Response) {

    const belongsToSchool = req.params.id

    const studentsCount = await User.find({ belongs_to_school: belongsToSchool, role: 'student' }).countDocuments();

    const teachersCount = await User.find({ belongs_to_school: belongsToSchool, role: 'teacher' }).countDocuments();
    const liveSchedulesCount = await Schedule.find({ belongs_to_school: belongsToSchool, host_joined: true, sesssion_ended: false }).countDocuments();
    const upcomingSchedulesCount = await Schedule.find({ belongs_to_school: belongsToSchool, host_joined: false, sesssion_ended: false }).countDocuments();
    const closedSchedule = await Schedule.find({ belongs_to_school: belongsToSchool, sesssion_ended: true }).countDocuments();

    // chart
    let attendancePercentage = [] as IattendancePercentage[]
    const dates: Date[] = await Schedule.find({ belongs_to_school: belongsToSchool }).distinct("scheduled_date")
    const attendanceChart = [] as IattendancePercentage[]
    for (const eachdate of dates) {


        // use aggregate => project and give only needed parameters
        // check if attendance is 0
        const schedulesPerdate = await Schedule.find({ scheduled_date: eachdate, sesssion_ended: true })
        let participants: number = 0;
        let attended: number = 0;

        for (const sched of schedulesPerdate) {

            participants = participants + sched.participants.length;
            attended = attended + sched.attendance.filter(e => e.status === true).length;
        }

        const val: IattendancePercentage = {
            date: eachdate.toString(),
            participants,
            attended
        }
        attendanceChart.push(val)

    }

    attendancePercentage = attendanceChart;

    // chart2
    let teacherClosedClassChart = [] as IteacherClosedClassChart[];
    const scheduleHosts: string[] = await Schedule.find({ belongs_to_school: belongsToSchool }).distinct("host_id")

    const teachersClosedScheduleChart = [] as any[]

    for (const eachHost of scheduleHosts) {
        const val = {} as IteacherClosedClassChart;
        val.host_id = eachHost;
        val.count = await Schedule.countDocuments({ belongs_to_school: belongsToSchool, host_id: eachHost, sesssion_ended: true })
        teachersClosedScheduleChart.push(val);

    }

    teacherClosedClassChart = teachersClosedScheduleChart;
    res.status(StatusCodes.OK).json({ studentsCount, teachersCount, liveSchedulesCount, upcomingSchedulesCount, closedSchedule, attendancePercentage, teacherClosedClassChart });


}

export async function getCardValues(req: Request, res: Response) {

    const belongsToSchool = req.params.schoolId
    const studentsCount = await User.countDocuments({ belongs_to_school: belongsToSchool, role: 'student' });
    const teachersCount = await User.countDocuments({ belongs_to_school: belongsToSchool, role: 'teacher' });
    const liveSchedulesCount = await Schedule.countDocuments({ belongs_to_school: belongsToSchool, sesssion_started: true, sesssion_ended: false });
    const upcomingSchedulesCount = await Schedule.countDocuments({ belongs_to_school: belongsToSchool, sesssion_started: false, sesssion_ended: false });
    const closedSchedule = await Schedule.countDocuments({ belongs_to_school: belongsToSchool, sesssion_ended: true });

    res.status(StatusCodes.OK).json({ studentsCount, teachersCount, liveSchedulesCount, upcomingSchedulesCount, closedSchedule })

}


// checkout the proper method to await when you want to use. like how to async within for each
export async function getAttendanceChart(req: Request, res: Response) {

    const belongsToSchool = req.params.schoolId
    const dates = await Schedule.find({ belongs_to_school: belongsToSchool }).distinct("scheduled_date");
    const attendanceChart = [] as IattendancePercentage[]

    for (let i = 0; i < dates.length; i++) {
        Schedule.aggregate([
            // project and give only needed parameters
            // check if attendance is 0
            {
                $match: { scheduled_date: date[i], sesssion_ended: true }
            }
        ]).then(data => {
            let participants: number = 0;
            let attended: number = 0;
            data.forEach(k => {
                participants = participants + k.participants.length;
                attended = attended + k.attendance.filter(e => e.status === true);
            })
            const val: IattendancePercentage = {
                date: date[i],
                participants,
                attended
            }
            attendanceChart.push(val)

        })
        // check if -1 needed
        if (i === dates.length - 1) {
            res.status(StatusCodes.OK).json(attendanceChart)

        }

    }
}

export const getClosedClassChart = async (req: Request, res: Response) => {
    const belongsToSchool = req.params.schoolId
    const teachers = await Schedule.find({ belongs_to_school: belongsToSchool }).distinct("host_id");

    let teachersClosedScheduleChart = [] as any[]
    for (let i = 0; i < teachers.length; i++) {
        const val = {} as IteacherClosedClassChart;
        const ar = [] as any[];
        await Schedule.countDocuments({ belongs_to_school: belongsToSchool, host_id: teachers[i], sesssion_ended: true }).then(data => {
            val.host_id = teachers[i];
            val.count = data;
            ar.push(val);
            teachersClosedScheduleChart = ar;
        });
        if (i === teachers.length - 1) {
            res.status(StatusCodes.OK).json(teachersClosedScheduleChart)
        }
    }


}