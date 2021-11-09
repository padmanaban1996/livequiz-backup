import { Request, Response } from 'express';
import statuscode from 'http-status-codes';
import { ISchoolEachClass, SchoolDetail } from '../school_details/model';
import { EachClass, IeachClass } from './model';

// ######----------Logics----------------#####
// get class of same class name : returns various sections of same classes

export async function createEachClass(req: Request, res: Response) {
    try {
        const { name, belongs_to_school, classTeacher, students, teachers } = req.body;
        const eachclass = await EachClass.create({ name, classTeacher, belongs_to_school, students, teachers });
        res.status(statuscode.OK).json(eachclass);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}

// school wise classses.
export async function getAllClass(req: Request, res: Response) {
    try {

        const id = req.params.id;
        const classes: IeachClass[] = await EachClass.find({ belongs_to_school: id }).then(data => {
            const classesFromSchool = data;
            return classesFromSchool;
        });
        if (classes.length === 0) {
            res.status(statuscode.OK).json([])
        }
        res.status(statuscode.OK).json(classes)
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}

export async function getOneClassDetailsById(req: Request, res: Response) {
    try {
        const eachClass = await EachClass.findById(req.params.id);
        if (eachClass)
            res.status(statuscode.OK).json(eachClass);
        else
            res.status(statuscode.OK).json({})
    } catch (error) {
        console.log("Error is getOneClassDetails", error);

        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}

export async function updateClassById(req: Request, res: Response){
    try{
        const classDetail = await EachClass.findByIdAndUpdate(req.params.id, req.body);
        if (classDetail)
            res.status(statuscode.OK).json(classDetail);
        else
            res.status(statuscode.OK).json({})
    }catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}