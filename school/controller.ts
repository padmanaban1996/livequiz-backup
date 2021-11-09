import { Request, Response } from 'express';
import statuscode from 'http-status-codes';
import { uploadDir } from '../service/upload';
import { SchoolDetail } from './school_details/model';


// ######----------Logics----------------#####
// get class of same class name : returns various sections of same Subjects

export async function createSubject(req: Request, res: Response) {
    try {
        const id = req.params.id;

        // convert all to lowercase and remove the spaces.
        // check if the same name already exists.

        SchoolDetail.findOneAndUpdate({ _id: id }, { $push: { subjects: req.body } }, { new: true }).then(data => {
            const SubjectsFromSchool = data.subjects;

            res.status(statuscode.OK).json(SubjectsFromSchool);
        });
    } catch (error) {
        console.log("error in createSubject", error);

        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}

// school wise classses.
export async function getAllSubject(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const Subjects = await SchoolDetail.findOne({ _id: id }).then(data => {
            const SubjectsFromSchool = data.subjects;

            return SubjectsFromSchool;
        });

        if (Subjects.length === 0) {
            res.status(statuscode.NOT_FOUND).json({ msg: 'no Subjects found' });
        }
        res.status(statuscode.OK).json(Subjects)
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}

// export async function updateSubject(req: Request, res: Response) {
//     try {

//         const id = req.params.id;
//         const Subjects = await SchoolDetail.findOneAndUpdate({ _id: id },
//             {
//                 $set: { "subjects": req.body }
//             },{new: true});
//             res.status(statuscode.OK).json(Subjects)
//     } catch (error) {
//         res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
//     }
// }

export async function uploadLogo(req: Request, res: Response) {
    const file = req.file;
    const _id = req.params.id;
    const filePath = uploadDir + file.filename
    if (!file) {
        res.status(statuscode.BAD_REQUEST).json({ msg: 'file not attached' });
    }
    const uploadedFile = await SchoolDetail.findByIdAndUpdate(_id, { set: { logoUrl: filePath } })
    res.status(statuscode.OK).json(uploadedFile)
}