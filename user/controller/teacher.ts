import { Request, Response } from 'express';
import { Iuser, TeacherUser, User } from '../model';
import statuscode from 'http-status-codes';
import { generatejwt } from '../services';
import { convertDatatojson, importExcelData2MongoDB, uploadDir } from '../../service/upload';



// ######----------Logics----------------#####
// there cannot be two classteachers to sameclass


export async function getTeachers(req: Request, res: Response) {
    try {
        const schoolId = req.params.id
        User.find({ belongs_to_school: schoolId, role: "teacher" }).then(data => {
            if (data.length === 0) {
                // res.status(statuscode.NOT_FOUND).json({ msg: "not found. create one" })
                res.status(statuscode.OK).json([])
            }
            res.status(statuscode.OK).json(data);
        });


    } catch (error) {
        console.log(error);

        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}
export async function saveManyTeachers(req: Request, res: Response) {
    console.log("@@@@upload req body", req.body);
    const teachers = []
    for (const element of req.body) {
        const { email, belongs_to_school, profile,subscriptionPlan, password, role, name, _teacher } = element
        const _password = await generatejwt(password);
        const teacher = await TeacherUser.create({ email, belongs_to_school, profile, subscriptionPlan, password: _password, role, name, _teacher }).catch(e => console.log("while create error", e));
        teachers.push(teacher)
    }
    res.status(statuscode.OK).json(teachers)

}
// BUgfix : get true/false and add only the corresponding value. / validation
export async function uploadTeachers(req: Request, res: Response) {

    try {
        const sheetName = "Teachers";
        const modelName = "users";
        const filePath = uploadDir + req.file.filename;
        const columnToKey = {

            B: 'name',
            C: 'is_class_teacher',
            D: 'belongs_to_class',
            E: 'mobile_number',
            F: 'email',
            G: 'password',
            H: "class_teacher_of"

        }
        const excelData = convertDatatojson(filePath, sheetName, modelName, columnToKey);

        const users = [] as Iuser[];
        for (const element of excelData.Teachers) {

            const teacherUser = {} as Iuser;
            const belongsToClass: string[] = element.belongs_to_class.split(',');
            teacherUser.name = element.name;
            teacherUser._teacher.belongs_to_class = belongsToClass;
            teacherUser._teacher.mobile_number = element.mobile_number;
            teacherUser._teacher.class_teacher_of = element.class_teacher_of;

            // get the ids and assign to _teacher in user
            teacherUser.email = element.email;
            teacherUser.password = await generatejwt(element.password);
            teacherUser.role = 'teacher';

            users.push(teacherUser);
        }

        importExcelData2MongoDB(users, "users");
        res.json(users);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
        console.error(error);
    }

}