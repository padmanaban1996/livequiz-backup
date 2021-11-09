import { json, Request, response, Response } from 'express';
import statuscode from 'http-status-codes';
import { PushNotify } from '../../quiz_results/push_notification/model';
import { isNullOrUndefined } from 'util';
import { Iquiz, Quiz } from '../../quiz/models';
import { ExamResults, IexamResults, SingleParticipantAnswerSheet } from './model';

// Exam Results
export async function createExamResult(req: Request, res: Response) {
    const quizId = req.params.id;
    const answerSheet: SingleParticipantAnswerSheet[] = req.body.answerSheet;
    const quizName = req.body.quizName;
    const subject = req.body.subject
    const concept = req.body.concept
    const department = req.body.department
    const studentId = req.body.answerSheet[0].id;
    const studentName = req.body.answerSheet[0].name;
    const quizData: any = await Quiz.findById(quizId);
    const teacherId = quizData.createdBy;
    const teacherName = '';
    const medalType = '';

    try {
        const quiz = await ExamResults.find({ "quizId": quizId, "status": "Latest", "answerSheet.id": studentId, }).then(async (data) => {
            if (data.length === 0) {
                const quizStatusData = 'Latest';
                const questions = await ExamResults.create({ quizId, quizName, concept, department, subject, status: quizStatusData, answerSheet });
                const statusData = "Completed";
                const notify = await PushNotify.create({ teacherId, studentId, studentName, view: false, studentsArray: [], status: statusData, quizName, quizId, teacherName, medalType });
                const twoDaysOld = new Date()
                twoDaysOld.setHours(twoDaysOld.getHours() - 48)
                const notifications = await PushNotify.remove({
                    updatedAt
                        : { $lt: twoDaysOld }
                })
                return res.json(questions);
            } else {
                const quizExamData: any = data;
                const quizUpdate = await ExamResults.updateOne(
                    { _id: quizExamData[0]._id },
                    {
                        $set: { "status": "Early" }
                    }
                )
                const quizStatusData = 'Latest';
                const questions = await ExamResults.create({ quizId, quizName, concept, department, subject, status: quizStatusData, answerSheet });
                const statusData = "Reattempt";
                const notify = await PushNotify.create({ teacherId, studentId, studentName, view: false, studentsArray: [], status: statusData, quizName, quizId, teacherName, medalType });
                const twoDaysOld = new Date()
                twoDaysOld.setHours(twoDaysOld.getHours() - 48)
                const notifications = await PushNotify.remove({
                    updatedAt
                        : { $lt: twoDaysOld }
                })
                return res.json(questions);
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

export function getFilteredPercentage(studentAnswerSheet: any) {
    let mark: number = 0
    let questLength: number = 0;
    for (const j of studentAnswerSheet) {
        if (j.qtype !== 'matches') {
            if (j.answerOption === 'Right') {
                mark = mark + 1;
            }
            questLength = questLength + 1;
        }
        else {
            for (const k of j.correctMatchAns) {
                for (const l of j.matchAnsOption) {
                    if (l.opt.toLowerCase() === k.opt.toLowerCase()) {
                        if (l.ans.toLowerCase() === k.ans.toLowerCase()) {
                            mark = mark + 1;
                        }
                    }
                }
            }
            questLength = questLength + j.correctMatchAns.length;
        }
    }
    const percentages = Math.round(mark * 100 / questLength);
    return { percentages, mark, questLength };
}

export async function getQuizResultByResultId(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const questions = await ExamResults.findById(id)
        if (questions) {
            return res.status(statuscode.OK).json(questions);
        } else {
            return res.status(statuscode.OK).json([]);
        }
    } catch (error) {
        console.log(error.message)
    }
}

export async function getAllQuizResultsByStudentId(req: Request, res: Response) {

    try {
        const results = [];
        const quizIds = [];
        const id = req.params.id;

        const quizResults = await ExamResults.find({ "status": "Latest", "answerSheet.id": id }).then(async (data: IexamResults[]) => {
            const studentMarks = [];

            for (const x of data) {
                for (const i of x.answerSheet) {
                    const { percentages, mark, questLength } = getFilteredPercentage(i.studentAnswerSheet);
                    const userDetail = i;

                    results.push({
                        name: x.quizName,
                        value: percentages,
                        extra: {
                            quizId: x.quizId,
                            subject: x.subject,
                            concept: x.concept,
                            status: x.status,
                            department: x.department,
                            startTime: i.starts_at,
                            endTime: i.ends_at
                        }
                    });
                }
            }
        })

        // result.sort((a, b) => a.percent < b.percent ? 1 : -1);
        res.status(statuscode.OK).json({ results });

    }
    catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}

export async function updateExamResult(req: Request, res: Response) {

    const id = req.params.id;

    ExamResults.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Exam Details. Maybe Exam Details was not found!`
                });
            } else res.send({ message: "Exam Details was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Exam."
            });
        });
};

export async function getPercentageOfExamination(req: Request, res: Response) {
    try {
        const result = [];
        const quizId = req.params.id;
        const quizResults = await ExamResults.find({ "quizId": quizId, "status": "Latest" }).then((data: IexamResults[]) => {
            const studentMarks = [];
            for (const x of data) {
                for (const i of x.answerSheet) {
                    const { percentages, mark, questLength } = getFilteredPercentage(i.studentAnswerSheet);
                    const userDetail = i;
                    result.push({
                        userDetails: userDetail, quizname: x.quizName,
                        percent: percentages, studMark: mark, totalQest: questLength
                    });
                }
            }
        })
        result.sort((a, b) => a.percent < b.percent ? 1 : -1);
        res.status(statuscode.OK).json({ result, topThree: result.slice(0, 3) });
    }
    catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}

export async function getPercentageOfSingleParticipant(req: Request, res: Response) {
    try {
        const result = [];
        const quizId = req.params.id;
        const studentId = req.params.sid;
        const quizResults = await ExamResults.find({ "quizId": quizId, "status": "Latest" }).then(async (data: IexamResults[]) => {
            const studentMarks = [];
            for (const x of data) {
                for (const i of x.answerSheet) {
                    const { percentages, mark, questLength } = getFilteredPercentage(i.studentAnswerSheet);
                    const userDetail = i;
                    result.push({
                        userDetails: userDetail, quizname: x.quizName,
                        percent: percentages, studMark: mark, totalQest: questLength
                    });

                }
            }
        })

        result.sort((a, b) => a.percent < b.percent ? 1 : -1);

        const foundStudent = [];
        for (const [index, value] of result.entries()) {
            if (value.userDetails.id === studentId) {
                foundStudent.push({ value, rank: index + 1 });
            }
        }

        res.status(statuscode.OK).json(foundStudent);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}

export async function getpercentageListOfLastReattempt(req: Request, res: Response) {
    try {
        const results = [];
        const quizIds = [];
        const id = req.params.id;
        const sums = {};
        const quizIdList = []
        const quizResults = await ExamResults.find({ "status": "Early", "answerSheet.id": id }).then(async (data: IexamResults[]) => {
            let name;
            for (const i of data) {
                name = i.quizId;
                if (!(name in sums)) {
                    sums[name] = 0;
                    quizIdList.push(name);
                }
            }
        });
        for (const x of quizIdList) {
            const quizResponse = await ExamResults.find({ "quizId": x, "status": "Early", "answerSheet.id": id }).then(async (data: IexamResults[]) => {
                const quizData: IexamResults[] = data.reverse();
                const lastData: IexamResults = quizData[0];
                for (const i of lastData.answerSheet) {
                    const { percentages, mark, questLength } = getFilteredPercentage(i.studentAnswerSheet);
                    const userDetail = i;

                    results.push({
                        name: lastData.quizName,
                        value: percentages,
                        extra: {
                            quizId: lastData.quizId,
                            subject: lastData.subject,
                            concept: lastData.concept,
                            status: lastData.status,
                            department: lastData.department,
                            startTime: i.starts_at,
                            endTime: i.ends_at
                        }
                    });
                }

            })
        }
        res.json(results);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}

export async function getLengthofTheResults(req: Request, res: Response) {
    try {
        const results = [];
        const quizIds = [];
        const id = req.params.id;

        const quizResults = await ExamResults.find({ "answerSheet.id": id }).then(async (data: IexamResults[]) => {
            const studentMarks = [];

            for (const x of data) {
                for (const i of x.answerSheet) {
                    const { percentages, mark, questLength } = getFilteredPercentage(i.studentAnswerSheet);
                    results.push({
                        name: x.quizName,
                        value: percentages,
                        extra: {
                            quizId: x.quizId,
                            subject: x.subject,
                            concept: x.concept,
                            status: x.status,
                            department: x.department,
                            startTime: i.starts_at,
                            endTime: i.ends_at
                        }
                    });
                }
            }
        })

        // result.sort((a, b) => a.percent < b.percent ? 1 : -1);
        res.status(statuscode.OK).json({ results });

    }
    catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}

function getCounts(array) {

    const sums = {};
    const counts = {};
    const result = [];
    let name;
    for (const i of array) {
        name = i;
        if (!(name in sums)) {
            sums[name] = 0;
            counts[name] = 0;
        }
        sums[name] += i;
        counts[name]++;
    }
    result.push(counts);
    return result;
}


export async function getTeacherDashboardDetails(req: Request, res: Response) {
    const teacherId = req.params.id;
    const results = []
    const sums = {};
    const quizIdList = []
    try {
        const selectedQuiz = await Quiz.find({ createdBy: teacherId }).then((data: any[]) => {
            let name;
            for (const i of data) {
                name = i._id;
                if (!(name in sums)) {
                    sums[name] = 0;
                    const cls = []
                    for (const c of i.classes) {
                        cls.push(c.className)
                    }
                    const pCount = i.participants.length;
                    const quizName = i.name;
                    quizIdList.push({ quizId: name, quizName, cls, pCount });
                }
            }
        });
        if (quizIdList.length > 0) {
            for (const q of quizIdList) {
                const classCount = {};
                for (const s of q.cls) {
                    const countVal = await ExamResults.countDocuments({ quizId: q.quizId, "status": "Latest", "answerSheet.className": s });
                    classCount[s] = countVal;
                }
                let percentAvg: number = 0;
                let gold: number = 0;
                let silver: number = 0;
                let bronze: number = 0;
                const quizResults = await ExamResults.find({ quizId: q.quizId, "status": "Latest" }).then((data: IexamResults[]) => {
                    for (const x of data) {
                        for (const i of x.answerSheet) {
                            const { percentages, mark, questLength } = getFilteredPercentage(i.studentAnswerSheet);
                            if (percentages >= 90) {
                                gold += 1;
                                percentAvg += percentages;
                            } else if (percentages > 40 && percentages < 90) {
                                silver += 1;
                                percentAvg += percentages;
                            } else if (percentages < 40) {
                                bronze += 1;
                                percentAvg += percentages;
                            }
                        }
                    }
                    let val: number = 0;
                    if (percentAvg > 0) {
                        val = Math.round(percentAvg / data.length)
                    } else {
                        val = 0;
                    }
                    results.push({
                        quizId: q.quizId,
                        name: q.quizName,
                        value: val,
                        studentCount: q.pCount,
                        classCount,
                        classes: q.cls,
                        goldCount: gold,
                        silverCount: silver,
                        bronzeCount: bronze
                    });
                })
            }
            res.status(statuscode.OK).json({ results });
        }
        else {
            res.status(statuscode.OK).json([]);
        }

    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}

export async function getAttemptPercentageOfSingleParticipant(req: Request, res: Response) {
    const result = [];
    const quizId = req.params.id1;
    const studentId = req.params.id2;
    try {
        const quizResults = await ExamResults.find({ "quizId": quizId, "status": "Early", "answerSheet.id": studentId, })
            .then(async (data: IexamResults[]) => {
                const studentMarks = [];
                for (const x of data) {
                    for (const i of x.answerSheet) {
                        const { percentages, mark, questLength } = getFilteredPercentage(i.studentAnswerSheet);
                        const userDetail = i;
                        result.push({ userDetails: userDetail, percent: percentages, studMark: mark, totalQest: questLength });
                    }
                }
            })
        res.status(statuscode.OK).json(result);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}

export async function getpercentageListOfLatestandLastReattempt(req: Request, res: Response) {
    try {
        const results = [];
        const id = req.params.id;
        const sums = {};
        const quizIdList = []

        const quizResults = await ExamResults.find({ "status": "Latest", "answerSheet.id": id }).then(async (data: IexamResults[]) => {
            let name;
            for (const i of data) {
                name = i.quizId;
                if (!(name in sums)) {
                    sums[name] = 0;
                    quizIdList.push(name);
                }
            }
        });

        for (const x of quizIdList) {
            let earlyTime;
            const quizFilter = {};
            const quizLatestResult = {};
            const quizLatestData: IexamResults = await ExamResults.findOne({ "quizId": x, "status": "Latest", "answerSheet.id": id });
            const quizEarlyData: IexamResults[] = await ExamResults.find({ "quizId": x, "status": "Early", "answerSheet.id": id });
            if (quizLatestData !== null || quizLatestData !== undefined) {
                for (const i of quizLatestData.answerSheet) {
                    const { percentages, mark, questLength } = getFilteredPercentage(i.studentAnswerSheet);
                    quizLatestResult[quizLatestData.status] = percentages;
                }
                if (quizEarlyData.length > 0) {
                    const quizData: IexamResults[] = quizEarlyData.reverse();
                    const lastData: IexamResults = quizData[0];
                    for (const i of lastData.answerSheet) {
                        earlyTime = i.ends_at
                        const { percentages, mark, questLength } = getFilteredPercentage(i.studentAnswerSheet);
                        quizLatestResult[lastData.status] = percentages;

                    }
                } else {
                    const earlyString = "Early";
                    quizLatestResult[earlyString] = 0;
                }
                quizFilter[quizLatestData.quizName] = quizLatestResult;
            }
            const val = {
                quizFilter,
                quizId: quizLatestData.quizId,
                subject: quizLatestData.subject,
                concept: quizLatestData.concept,
                department: quizLatestData.department,
                latestEnd: quizLatestData.answerSheet[0].ends_at,
                earlyEnd: earlyTime
            };
            results.push(val);
        }
        res.status(statuscode.OK).json(results);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}


export async function deleteExamResults(req: Request, res:Response){
    const studentId = req.params.id;
    try{
    const responseData = await ExamResults.deleteMany({"answerSheet.id": studentId});
    if(responseData){
        res.send({
            message: "Exam details was deleted successfully!"
        });
    }else{
        res.send({
            message: "Quiz details was Not deleted!"
        });
    }
}
catch(error){
    res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
}
}
