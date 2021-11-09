import { string } from 'joi';
import mongoose from 'mongoose';
import { SchoolDetail } from '../school_details/model';

export interface Student {
    _id: string,
    name: string
}

export interface Teacher {
    _id: string,
    name: string,
}

export interface IeachClass {
    name: string,
    belongs_to_school: string,
    classTeacher: string,
    // subjects: string[],
    students: Student[],
    teachers: Teacher[]
}

// subject is chosen in schedule. later add subject relation
const EachClassSchema = new mongoose.Schema({
    name: String,
    belongs_to_school: String,
    classTeacher: { type: String, default: null },
    // subjects: [String],
    students: [{
        _id: String,
        name: String
    }],
    teachers: [{
        _id: String,
        name: String,
    }]
});


EachClassSchema.post('save', function (val, next) {

    const _eachClass = {
        _id: this._id,
        name: this.name
    }

    SchoolDetail.findOneAndUpdate({ _id: this.belongs_to_school }, { $push: { classes: _eachClass } }, { new: true },
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log('updated successfuly', doc);
        })


    next();

});
export const EachClass = mongoose.model<IeachClass & mongoose.Document>('EachClass', EachClassSchema);