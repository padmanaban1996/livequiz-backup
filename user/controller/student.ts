import { json, Request, Response } from 'express';
import statuscode from 'http-status-codes';
import { Istudent, StudentUser, TeacherUser } from '../model';
import { convertDatatojson, importExcelData2MongoDB, uploadDir } from '../../service/upload';
import { Iuser, User } from '../model';
import { EachClass } from '../../school/class/model';
import { generatejwt } from '../services';




// ###############-------------logic-------------------########
// assert belongs_to_class before save

export async function getAllStudents(req: Request, res: Response) {
    try {
        const schoolId = req.params.id;
        const students = await User.find({ belongs_to_school: schoolId, role: "student" });
        if (students.length === 0) {
            // res.status(statuscode.NOT_FOUND).json({ msg: "not found. create one" })
            res.status(statuscode.OK).json([])
        }
        res.status(statuscode.OK).json(students);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}

export async function saveManyStudents(req: Request, res: Response) {
    console.log("@@@@upload req body", req.body);
    const students = []
    for (const element of req.body) {
        const { email, schoolLevel, interestedIn, belongs_to_school, profile, subscriptionPlan, password, role, name, _student } = element
        const _password = await generatejwt(password);
        const student = await StudentUser.create({ email, schoolLevel, interestedIn, belongs_to_school, profile, subscriptionPlan, password: _password, role, name, _student }).catch(e => console.log("while create error", e));
        students.push(student)
    }
    res.status(statuscode.OK).json(students)

}

export async function uploadStudents(req: Request, res: Response) {

    try {

        const sheetName = "Students";
        const modelName = "users";
        const filePath = uploadDir + req.file.filename;
        const columnToKey = {

            B: 'name',
            C: 'belongs_to_class',
            D: 'parent_email_id',
            E: 'parent_phone_number',
            F: 'email',
            G: 'password',

        }
        const excelData = convertDatatojson(filePath, sheetName, modelName, columnToKey);
        const students = [] as Istudent[];
        const users = [] as Iuser[];
        for (const element of excelData.Students) {
            const singleStudent = {} as Iuser;

            singleStudent.name = element.name;
            // singleStudent._student.belongs_to_class = element.belongs_to_class
            singleStudent._student.parent_mobile_number = element.parent_phone_number;
            singleStudent._student.parent_email_id = element.parent_email_id;

            singleStudent.email = element.email;
            singleStudent.password = await generatejwt(element.password);
            singleStudent.role = 'student';

            users.push(singleStudent);
        }


        importExcelData2MongoDB(students, modelName);
        importExcelData2MongoDB(users, "users");
        res.json({
            'msg': 'File uploaded/import successfully!', 'file': req.file
        });
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
        console.error(error);
    }

}


export async function uploadSingleClassStudents(req: Request, res: Response) {

    try {
        const sheetName = "Students";
        const modelName = "users";
        const filePath = uploadDir + req.file.filename;
        const columnToKey = {

            B: 'name',
            C: 'parent_email_id',
            D: 'parent_phone_number',
            E: 'email',
            F: 'password',

        }
        const excelData = convertDatatojson(filePath, sheetName, modelName, columnToKey);

        const users = [] as Iuser[];
        for (const element of excelData.Students) {
            const singleStudent = {} as Iuser;
            const belongsToCLass = req.params.className;


            singleStudent.name = element.name;

            singleStudent._student.parent_mobile_number = element.parent_phone_number;
            singleStudent._student.parent_email_id = element.parent_email_id;

            singleStudent.email = element.email;
            singleStudent.password = await generatejwt(element.password);
            singleStudent.role = 'student';

            users.push(singleStudent);
        }


        importExcelData2MongoDB(users, "users");
        res.json(users);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
        console.error(error);
    }

}