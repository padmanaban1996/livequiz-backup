
import mongoose from 'mongoose';

export interface ISchoolEachClass {
    _id: string,
    name: string,
}

export interface ISchoolTeacher {
    _id: string,
    name: string,
    subject: string
}

export interface ISchoolAdmins {
    _id: string,
    name: string
}

export interface ISchoolStudents {
    _id: string,
    name: string,
    belongs_to_class: string
}

export interface ISchoolContactPerson {
    name: string,
    phone_number: number
}

export interface ISchoolSubscription {
    type: string,
    validity: boolean,
    valid_till: Date
}
export interface ISchoolAccountManager {

    name: string

}
export interface ISchoolAddress {
    line1: string,
    locality: string,
    city: string,

}
export interface Isubject{
    _id: string
    name: string,
    image: string
}

export interface IschoolDetails {
    name: string,
    classes: ISchoolEachClass[],
    logoUrl: string,
    admins: ISchoolAdmins[],
    subscriptionPlan: number,
    departments: string[],
    subjects: Isubject[],
    phone_number: number,
    address: ISchoolAddress,
    pincode: number
    contact_person: ISchoolContactPerson,
    subscription: ISchoolSubscription,
    account_manager: ISchoolAccountManager,

}

// add schools in teacher and student

const SchoolDetailSchema = new mongoose.Schema({
    name: String,
    classes: {
        type: [{
            _id: String,
            name: String,
        }],
        default: []
    },
    admins: {
        type: [{
            _id: String,
            name: String,
        }],
        default: []
    },
    logoUrl: String,
    subscriptionPlan: Number,
    departments: { type: [String], default: [] },

    subjects: { type:[{
        _id: String,
        name: String,
        image: String
    }], default: [] },

    phone_number: { type: Number, unique: true },
    address: {
        line1: String,
        locality: String,
        city: String,

    },
    pincode: Number,
    contact_person: {
        name: String,
        mobile_number: { type: Number, unique: true }
    },
    subscription: {
        type: String,
        validity: Boolean,
        valid_till: Date
    },
    account_manager: {
        name: String
    },

})

export const SchoolDetail = mongoose.model<IschoolDetails & mongoose.Document>('SchoolDetail', SchoolDetailSchema);