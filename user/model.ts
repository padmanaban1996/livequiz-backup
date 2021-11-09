import * as mongoose from 'mongoose';
import { EachClass } from '../school/class/model';
import { SchoolDetail } from '../school/school_details/model';

export interface Iteacher {
    belongs_to_class: string[],
    subjects: string[]
    is_class_teacher: boolean,
    class_teacher_of: string,
    mobile_number: number

}

export interface Istudent {

    belongs_to_class_id: string,
    parent_email_id: string,
    parent_mobile_number: number

}
export interface Iadmin {

    belongs_to_school: string,
    mobile_number: string

}


export interface ITeacherUser {

    email: string,
    password: string,
    role: string,
    name: string,
    belongs_to_school: string,
    profile: string,
    subscriptionPlan: number,
    _teacher: Iteacher,

}

export interface IStudentUser {

    email: string,
    password: string,
    schoolLevel:string,
    interestedIn:string[];
    role: string,
    name: string,
    belongs_to_school: string,
    profile: string,
    subscriptionPlan: number,
    _student: Istudent,

}

export interface IAdminUser {

    email: string,
    password: string,
    role: string,
    name: string,
    belongs_to_school: string,
    profile: string
    subscriptionPlan: number,
    _admin: Iadmin
}

export interface Iuser {
    email: string,
    schoolLevel:string,
    interestedIn:string[];
    password: string,
    role: string,
    name: string,
    belongs_to_school: string,
    profile: string,
    subscriptionPlan: number,
    _teacher: Iteacher,
    _student: Istudent,
    _admin: Iadmin
}

// after payment update the subsciption


const userSchema = new mongoose.Schema({

    email: { type: String, unique: true, required: true, sparse: true },
    password: { type: String, required: true },
    schoolLevel:String,
    interestedIn:{type:[String], default:[]},
    role: String,
    name: String,
    belongs_to_school: String,
    subscriptionPlan: Number,
    profile: String,
    subscription_status: {
        type: String,
        validity: Boolean,
        school_id: String,
    },
    _teacher: {
        belongs_to_class: [String], // each array value has to be between 1 - 12, have class name
        subjects: [String],
        is_class_teacher: { type: Boolean, default: false },
        class_teacher_of: { type: mongoose.Schema.Types.ObjectId, ref: "EachClass", default: null }, // id of the section/class/school
        mobile_number: { type: Number, unique: true, sparse: true },
    },
    _student: {
        belongs_to_class_id: String,
        // belongs_to_class: String,
        parent_email_id: String,   // email validation
        parent_mobile_number: { type: Number, unique: true, sparse: true }
    },
    _admin: { mobile_number: { type: Number, unique: true, sparse: true } }

});

// save the created to other respective model
// admin to school details
// students to class

userSchema.post('save', function (val, next) {

    if (this.role === 'admin') {
        const admin = {
            _id: this._id,
            name: this.name
        }
        SchoolDetail.findOneAndUpdate({ _id: this.belongs_to_school }, { $push: { admins: admin } }, { new: true },
            (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!", err);
                }
                console.log('updated successfuly', doc);
            });


    }
    if (this.role === 'student') {
        const student = {
            _id: this._id,
            name: this.name,

        }

        // update students in each class details.
        EachClass.findByIdAndUpdate(this._student.belongs_to_class_id, { $push: { students: student } }, { new: true },
            (err, doc) => {

                if (err !== null) {
                    console.log("Something wrong when updating data!", err);
                }
                console.log('updated successfuly', doc);
            })

    }
    if (this.role === 'teacher') {
        const teacher = {
            _id: this._id,
            name: this.name
        }

        // update teachers in each class details.
        for (const id of this._teacher.belongs_to_class) {
            EachClass.findByIdAndUpdate(id, { $push: { teachers: teacher } }, { new: true },
                (err, doc) => {
                    if (err !== null) {
                        console.log("Something wrong when belongs to class  data!", err);
                    }
                    console.log('updated successfuly', doc);
                })
        }
        if (this._teacher.class_teacher_of !== null) {
            const id = this._teacher.class_teacher_of;
            EachClass.findByIdAndUpdate(id, { $set: { classTeacher: id } }, { new: true },
                (err, doc) => {
                    if (err !== null) {
                        console.log("Something wrong when updating class teacher data!", err);
                    }
                    console.log('updated successfuly', doc);
                })
        }


    }
    next();

});

export const User = mongoose.model<Iuser & mongoose.Document>('User', userSchema);
export const StudentUser = mongoose.model<IStudentUser & mongoose.Document>('User', userSchema);
export const TeacherUser = mongoose.model<ITeacherUser & mongoose.Document>('User', userSchema);
export const AdminUser = mongoose.model<IAdminUser & mongoose.Document>('User', userSchema);

// after create add to school and class