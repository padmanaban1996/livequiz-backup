import { Request, Response } from 'express';
import { Quiz } from './models';
import statuscode from 'http-status-codes'
import { User } from '../user/model';


export async function findAllByTeacher(req: Request, res: Response) {

    // only the teachers quiz.
    const teacherId = req.params.id;
    Quiz.find({ createdBy: teacherId }).then((data: any[]) => {
        const newArray = []
        if (data.length === 0)
            res.status(statuscode.OK).json([])
        else

            for (const i of data) {
                const element = {
                    name: i.name,
                    _id: i._id,
                    shareId: i.shareId,
                    scheduled: i.scheduled,
                    startAt: i.startAt,
                    session_ended: i.session_ended,
                    classes: i.classes,
                    participants: i.participants,
                    subject: i.subject,
                    subjectImage: i.subjectImage,
                    createTime: i.createdAt
                }
                newArray.push(element)

            }
        res.status(statuscode.OK).json(newArray);
    })
}

export async function findAllByStudent(req: Request, res: Response) {
    const studentId = req.params.id;
    const newArray = []
    const quiz = await Quiz.find({ "participants.studentId": studentId }).then(data => {
        if (data.length === 0)
            res.status(statuscode.OK).json([])
        else
            for (const i of data) {
                const element = {
                    name: i.name,
                    shareId: i.shareId,
                    _id: i._id,
                    scheduled: i.scheduled,
                    startAt: i.startAt,
                    session_ended: i.session_ended,
                    classes: i.classes,
                    participants: i.participants,
                    subject: i.subject,
                    subjectImage: i.subjectImage
                }
                newArray.push(element)

            }
        res.status(statuscode.OK).json(newArray);
    })
}

export function generate() {
    const sixDigitValue = (Math.floor(100000 + Math.random() * 900000)).toString();
    const returnData = Quiz.find({ "shareId": sixDigitValue });
    if (!returnData) {
        return sixDigitValue;
    }
    else {
        return (Math.floor(100000 + Math.random() * 900000)).toString();
    }
}

export async function findAllBySchool(req: Request, res: Response) {

    // only the teachers quiz.
    const schoolId = req.params.id;
    Quiz.find({ belongsToSchool: schoolId }).then(data => {
        const newArray = []
        if (data.length === 0)
            res.status(statuscode.OK).json([])
        else
            for (const i of data) {
                const element = {
                    name: i.name,
                    _id: i._id,
                    shareId: i.shareId,
                    scheduled: i.scheduled,
                    startAt: i.startAt,
                    session_ended: i.session_ended,
                    classes: i.classes,
                    participants: i.participants,
                    subject: i.subject,
                    subjectImage: i.subjectImage
                }
                newArray.push(element)

            }
        res.status(statuscode.OK).json(data);


    })

}

export async function createQuiz(req: Request, res: Response) {

    const { name, videos, concept, department, showAnswers, questions, eachQuestionTime, createdBy, subject, subjectImage, belongsToSchool, classes, participants, scheduled, startAt } = req.body;
    try {
        const sessionStarted = false
        const sessionEnded = false
        const shareIdGenerate = generate();
        const quiz = await Quiz.create({
            name, shareId: shareIdGenerate, videos, concept, department, questions, eachQuestionTime, createdBy, subject, subjectImage, showAnswers, belongsToSchool, classes, participants, startAt, session_started: sessionStarted, session_ended: sessionEnded, scheduled
        })
        return res.json(quiz);
    } catch (error) {
        console.log(error.message)
    }
}

export async function singleQuiz(req: Request, res: Response) {
    try {
        const paramId = req.params.id;
        if (paramId.length > 6) {
            await Quiz.findById({ _id: paramId }).then((data) => {
                res.json(data);
            });
        } else {
            await Quiz.findOne({ shareId: paramId }).then((data) => {
                res.json(data);
            });
        }
    } catch (error) {
        console.log(error.message)
    }
}

export async function deleteSingleQuiz(req: Request, res: Response) {
    const id = req.params.id;
    Quiz.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Quiz. Maybe Quiz details was not found!`
                });
            } else {
                res.send({
                    message: "Quiz details was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Quiz."
            });
        });
}
export async function quizparticipantAttended(req: Request, res: Response) {
    const quizId = req.params.quizId;
    const studentId = req.params.studentId;
    const quiz = await Quiz.updateOne(
        { _id: quizId, "participants.studentId": studentId },
        {
            $set: { "participants.$.attended": true }
        }
    )
    res.status(statuscode.OK).json(quiz);
}
export async function quizparticipantUpdate(req: Request, res: Response) {
    const quizId = req.params.quizId;
    const studentId = req.params.studentId;
    const quiz = await Quiz.updateOne(
        { _id: quizId },
        {
            $push: {
                participants: {
                    $each: [{ studentId, attended: true }],
                }
            }
        }
    )
    res.status(statuscode.OK).json(quiz);
}

export async function quizSessionStarted(req: Request, res: Response) {
    const id = req.params.id;
    const startsAt = req.body.starts_at;
    const schedule = await Quiz.findByIdAndUpdate(id, { $set: { "partcipants.attended": true, starts_at: startsAt } }, { new: true });
    res.status(statuscode.OK).json(schedule);
}

export async function quizSessionEnded(req: Request, res: Response) {
    const id = req.params.id;
    const endsAt = req.body.ends_at;
    const schedule = await Quiz.findByIdAndUpdate(id, { $set: { session_ended: true, ends_at: endsAt } }, { new: true });
    res.status(statuscode.OK).json(schedule);
}


export async function updateQuiz(req: Request, res: Response) {

    const id = req.params.id;
    Quiz.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Quiz. Maybe Quiz Details was not found!`
                });
            } else {
                // const participantArray = [];
                // const participantData = data.participants;
                // for(const i of participantData){
                //     participantArray.push(i.studentId);
                // }


                // const notify = PushNotify.findOneAndUpdate({"quizId": id},{$set:{"studentsArray": participantArray}});

                // const twoDaysOld = new Date()
                // twoDaysOld.setHours(twoDaysOld.getHours() - 48)
                // const notifications = PushNotify.remove({
                //     updatedAt
                //         : { $lt: twoDaysOld }
                // })

                res.send({ message: "Quiz Details was updated successfully." });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Quiz."
            });
        });

};

export async function getAllQuizResultsByTeacherId(req: Request, res: Response) {
    try {
        const results = [];
        const quizIds = [];
        const id = req.params.id;

        const quizResults = await Quiz.find({ "createdBy": id }).then(async (data1: any) => {
            for (const x of data1) {
                const attendedCount: number = 0;
                let absentCount: number = 0;

                for (const p of x.participants) {
                    if (p.attended !== true) {
                        absentCount = absentCount + 1;
                    }
                }
                const percentages = Math.round((x.participants.length - absentCount) * 100 / x.participants.length);
                results.push({
                    name: x.name,
                    value: percentages,
                    extra: {
                        quizId: x._id,
                        classes: x.classes,
                        subject: x.subject,
                        concept: x.concept,
                        department: x.department,
                        startAt: x.startAt,
                        createTime: x.createdAt,
                        updateTime: x.updatedAt
                    }
                });
            }

        });
        res.status(statuscode.OK).json({ results });
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }

}

