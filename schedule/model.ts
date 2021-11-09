import mongoose from 'mongoose';


export interface PartcipantActivity {
    participant_id: string,
    email: string,
    name: string,
    activity_type: string,
    time: string
}
export interface Attendance {

    participant_id: string,
    name: string
    status: boolean

}
export interface ParticipantState {
    displayName: string,
    name: string,
    role: string,
    email: string,
    jitsiId: string,
    socketId: string,
}
export interface Ischedule { // type def of model
    name: string,
    room_id: string,
    host_id: string,
    host_joined: boolean,
    subject: string,
    starts_at: Date,
    ends_at: Date
    scheduled_date: Date,
    activities: PartcipantActivity[],
    belongs_to_school: string
    participants: string[],
    pin_status: boolean
    // participantState: ParticipantState[],
    session_started: boolean,
    sesssion_ended: boolean,
    attendance: Attendance[],
    attendanceClosed: boolean

}


// allocate all participants with default value when the object is created

// starts at and ends at time updated when teacher joins and leave i.e actual time.
// have two other variable which has the planned time and this can be rescheduled once the session ennded
const ScheduleSchema = new mongoose.Schema({
    name: String,
    room_id: { type: String, required: true },
    host_id: { type: String, required: true }, // this will be teacher and filter option
    host_joined: { type: Boolean, default: false },
    belongs_to_school: String,
    subject: String,
    starts_at: Date,
    ends_at: Date,
    scheduled_date: Date,
    activities:
        [{

            participant_id: String,
            // participant_email: String,
            activity_type: String,
            time: Date,
            name: String

        }],
    participants: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    // participantState: [{
    //     displayName: String,
    //     name: String,
    //     role: String,
    //     email: String,
    //     jitsiId: String,
    //     socketId: String,
    // }],
    // jitisi_participant_id
    session_started: { type: Boolean, default: false },
    sesssion_ended: { type: Boolean, default: false },
    pin_status: { type: Boolean, default: false },
    attendance: [{
        participant_id: String,
        name: String,
        status: Boolean,

    }],
    // update the below value in the save attendance function
    attendanceClosed: { type: Boolean, default: false }


}, { timestamps: true });
// ScheduleSchema.plugin(mongoosePaginate);

export const Schedule = mongoose.model<Ischedule & mongoose.Document>('Schedule', ScheduleSchema);

// .after create update on the teachers so that when calculating in the dashboard you can compile count from users
// check which methods land small number of requests