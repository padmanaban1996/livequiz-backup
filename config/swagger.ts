import * as  questions from './swagger/api/questions';
import * as  quiz from './swagger/api/quiz';
import * as  users from './swagger/api/user';
import * as  schedule from './swagger/api/schedule';
import * as  school from './swagger/api/school';
import * as  quizresult from './swagger/api/quizresult';


// models import
import questionsModel from './swagger/model/questions'
import quizModel from './swagger/model/quiz'
import userModel from './swagger/model/user'
import scheduleModel from './swagger/model/schedule'
import classModel from './swagger/model/class';
import schooldetailsModel from './swagger/model/schooldetails';
import sectionsModel from './swagger/model/sections';
import quizresultModel from './swagger/model/quizresult';
import questionresultModel from './swagger/model/questionresult';
import liveclassuseractivityModel from './swagger/model/liveclassuseractivity';
import roomstateModel from './swagger/model/roomstate';
import adminModel from './swagger/model/admin';
import teacherModel from './swagger/model/teacher';
import studentModel from './swagger/model/student';




export default {

    "swagger": "2.0", "info": {
        "version": "1.0.0", // version of the OpenAPI Specification
        "title": "My User Project CRUD",
        "description": "My User Project Application API",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "host": "localhost:5000",
    "basePath": "/",
    "tags": [{ "name": "Users", "description": "API for users " }, { "name": "Questions", "description": "API for Questions" }],
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "paths": {
        "api/questions": questions.apiQuestions,
        "api/questions/:id": questions.apiQuestionId,
        "api/questions/download": questions.apiDownloadExcel,
        "api/question/create": questions.apiQuestionCreate,
        "api/questions/upload": questions.apiQuestionExcelUpload,
        // quiz apis
        "api/quiz": quiz.apiQuiz,
        "api/quiz/:id": quiz.apiQuizId,
        "api/Quiz/Create": quiz.apiQuizCreate,
        // users
        "api/users": users.apiUsers,
        "api/user/:id": users.apiUserId,
        "api/teachers": users.apiTeachers,
        "api/students": users.apiStudents,
        "api/admins": users.apiAdmins,
        "api/user/login": users.apiUserLogin,
        "api/user/signup": users.apiUserSignup,
        "api/teacher/create": users.apiTeacherCreate,
        "api/teachers/upload": users.apiTeachersUpload,
        "api/student/create": users.apiStudentCreate,
        "api/student/upload": users.apiStudentsUpload,
        "api/singleclassstudents/upload/:id": users.apiSingleClassStudentsUploadId,
        "api/admin/create": users.apiAdminCreate,
        // schedule
        "api/schedule": schedule.apiSchedules,
        "api/schedule/:id": schedule.apiScheduleId,
        "api/roomstate/:id": schedule.apiRoomstateId,
        "api/useractivity/:id": schedule.apiUseractivityId,
        "api/schedule/create": schedule.apiScheduleCreate,
        "api/post/roomstate/:id": schedule.apiRoomstateCreateId,
        "api/post/liveclassuseractivity/:id": schedule.apiCreateLiveclassuseractivityId,
        // school
        "api/school": school.apiSchool,
        "api/class": school.apiClass,
        "api/section": school.apiSection,
        "api/school/create": school.apiSchoolCreate,
        "api/class/create": school.apiClassCreate,
        "api/section/create": school.apiSectionCreate,
        // quiz result
        "api/quizresult": quizresult.apiQuizresults,
        "api/quizresult/:id": quizresult.apiQuizresultsId,
        "api/quizresult/score": quizresult.apiQuizresultsScore,
        "api/question/result": quizresult.apiQuestionresults,
        "api/question/result/:id": quizresult.apiQuestionresultsId,
        "api/quiz/calculate/score": quizresult.apiCalculateQuizscore,
        "api/quiz/check/studentattended": quizresult.apiCheckStudentAttended,
        "api/question/result/create/:id": quizresult.apiCreateQuestionResultId,
    },
    "definitions": {
        "Questions": questionsModel,
        "Quiz": quizModel,
        "Users": userModel,
        "Schedule": scheduleModel,
        "Sections": sectionsModel,
        "Schooldetails": schooldetailsModel,
        "Quizresult": quizresultModel,
        "Questionresult": questionresultModel,
        "Liveclassuseractivity": liveclassuseractivityModel,
        "Roomstate": roomstateModel,
        "Admin": adminModel,
        "Student": studentModel,
        "Teacher": teacherModel,
        "Class": classModel,
    }



}