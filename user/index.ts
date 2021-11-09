import express from 'express';
import { createUserWithRole, forgotPassword, getAll, getSingleUser, login, payForSubscription, resetPassword, signup, deleteUser, updateUser } from './controller';
import { getAllStudents, uploadStudents, uploadSingleClassStudents, saveManyStudents } from './controller/student';
import { getAllAdmins } from './controller/admin';
import { getTeachers, saveManyTeachers, uploadTeachers } from './controller/teacher';
import { upload } from '../service/upload';

export const userRouter = express.Router();

// check whether teachers and admins of school only returns.
userRouter.post('/login', login);
userRouter.get('/school/:id', getAll); // get all users of a school
userRouter.post('/signup', signup);
userRouter.get('/singleuser/:id', getSingleUser);
userRouter.put('/updateuser/:id', updateUser)
userRouter.delete('/deleteuser/:id', deleteUser)
userRouter.post('/', createUserWithRole);
userRouter.post('/resetPassword', resetPassword);
userRouter.post('/forgotPassword', forgotPassword)

// teacher
userRouter.get('/:id/teachers/', getTeachers); // Teachers of a school
userRouter.post('/teachers/upload', saveManyTeachers);

// student
userRouter.get('/:id/student/', getAllStudents); // students of a school
userRouter.post('/student/upload', saveManyStudents);

userRouter.post('/single_class_students/upload/:className', upload.single("uploadstudents"), uploadSingleClassStudents);

// admin
userRouter.get("/:id/admin/", getAllAdmins); // admins of a school
userRouter.post('/subscription', payForSubscription)


// add school wise data filter
// class wise data filter.
// add subject to teacher and assign while creating here.