import { Request, Response } from 'express';
import { PartcipantActivity, Schedule } from './model';
import statuscode from 'http-status-codes';
import { User } from '../user/model';

// on the date time change status and make them join.or they can join when teacher joins.

// ### notes
// roomid , host_id->teacher&school_admin, participants with initial room state, host_joined:boolean then enable the join button
// update create schedule to create default values in room state. write in .then function

// gets all the schedules created by one user
export async function getAllById(req: Request, res: Response) {

    try {
        const id = req.params.id;
        const schoolId = req.params.schoolId;
        const user = await User.findById(id);
        // check if there is a user with the id
        if (!user) {
            // res.status(statuscode.NOT_FOUND).json({ err: 'user not found' })
            res.status(statuscode.OK).json([])
        }
        // check if role is teacher
        if (user.role === 'teacher') {
            // retrive the schedule by id
            const schedules = await Schedule.find({ host_id: id })
            res.status(statuscode.OK).json(schedules);
        }
        if (user.role === 'student') {
            const schedules = await Schedule.find({ participants: id });
            res.status(statuscode.OK).json(schedules);

        }
        if (user.role === 'admin') {
            const schedules = await Schedule.find({ belongs_to_school: schoolId });
            res.status(statuscode.OK).json(schedules);
        }
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
        throw error;
    }
}

export async function saveAttendance(req: Request, res: Response) {
    const scheduleId = req.params.id;
    const attendance = req.body; // check and correct the format in frontend
    const scheduleAttendance = await Schedule.findOneAndUpdate({ _id: scheduleId }, { $set: { attendance, attendanceClosed: true } }, { new: true }).then(data => data.attendance);
    res.status(statuscode.OK).json(scheduleAttendance);

}



// generate room name with starting string kthree.
export async function createOne(req: Request, res: Response) {


    try {
        const { name,
            host_id,
            subject,
            starts_at,
            ends_at,
            pin_status,
            scheduled_date,
            participants,
            belongs_to_school

        } = req.body;

        const attendance = [];
        const activities = [];
        const hostJoined = false;
        const sessionStarted = false;
        const sesssionEnded = false;
        const roomId = "kthree" + Math.random().toString(36).substr(2, 9);
        const attendanceClosed = false;
        const schedule = await Schedule.create({
            name,
            room_id: roomId,
            host_id,
            host_joined: hostJoined,
            subject,
            starts_at,
            ends_at,
            pin_status,
            scheduled_date,
            activities,
            participants,
            session_started: sessionStarted,
            sesssion_ended: sesssionEnded,
            attendance,
            belongs_to_school,
            attendanceClosed
        })
        res.status(statuscode.OK).json(schedule);

    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
        throw error;
    }

}

// one schedule as user activity
export async function getLiveClassUserActivity(req: Request, res: Response) {
    try {

        const scheduleId = req.params.scheduleId
        const schedule = await Schedule.findById(scheduleId);
        if (schedule.participants.length === 0) {
            // res.status(statuscode.NOT_FOUND).json({ msg: "not Found" })
            res.status(statuscode.OK).json([])
        } else {
            const activities = schedule.activities;

            res.status(statuscode.OK).json(activities);
        }

    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
        throw error;
    }
}


export async function createLiveClassActivity(req: Request, res: Response) {
    try {

        const scheduleId = req.params.scheduleId;
        const activity = {} as PartcipantActivity;
        activity.name = req.body.name;
        activity.participant_id = req.body.participant_id;
        activity.time = req.body.time;
        activity.activity_type = req.body.activity_type

        const scheduleActivites = await Schedule.findOneAndUpdate({ _id: scheduleId }, { $push: { activities: activity } }, { new: true }).then(data => data.activities);
        res.status(statuscode.OK).json(scheduleActivites);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
        throw error;
    }
}



export async function classSessionEnded(req: Request, res: Response) {
    const id = req.params.id;
    const endsAt = req.body.ends_at;

    const schedule = await Schedule.findByIdAndUpdate(id, { $set: { sesssion_ended: true, ends_at: endsAt } }, { new: true });

    res.status(statuscode.OK).json(schedule);
}
export async function pinStatus(req: Request, res: Response) {
    const id = req.params.id;
    const startsAt = req.body.pin_status;
    const schedule = await Schedule.findByIdAndUpdate(id, { $set: { pin_status: startsAt } }, { new: true });
    res.status(statuscode.OK).json(schedule);
}
export async function unPinStatus(req: Request, res: Response) {
    const id = req.params.id;
    const startsAt = req.body.pin_status;
    const schedule = await Schedule.findByIdAndUpdate(id, { $set: { pin_status: startsAt } }, { new: true });
    res.status(statuscode.OK).json(schedule);
}
export async function classSessionStarted(req: Request, res: Response) {
    const id = req.params.id;
    const startsAt = req.body.starts_at;

    const schedule = await Schedule.findByIdAndUpdate(id, { $set: { session_started: true, starts_at: startsAt, host_joined: true } }, { new: true });
    res.status(statuscode.OK).json(schedule);
}

// edit yet to write
export async function editOne(req: Request, res: Response) {
    try {
        res.status(statuscode.OK).json();
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }

}

// delete yet to write
export async function deletOne(req: Request, res: Response) {
    try {
        res.status(statuscode.OK).json();
        const result = await Schedule.findByIdAndDelete(req.params.id)
        res.status(statuscode.OK).json(result)
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}




// write in v2 to isolate and reuse the common code and write function for common validation
// function respondAccordingly(res: Response, doc: Document[]) {

// }