import { Request, Response } from 'express';
import { Questions } from './models';
import statuscode from 'http-status-codes';
import { importExcelData2MongoDB, convertDatatojson, uploadDir } from '../service/upload';



export async function findAll(req: Request, res: Response) {
    // question by teacher
    const id = req.params.id;
    const questionList = await Questions.find({ createdBy: id })
    if (questionList.length === 0)
        res.status(statuscode.OK).json([])
    res.status(statuscode.OK).json(questionList);
}

export async function findOne(req: Request, res: Response) {
    try {
        const id = req.params.id;
        Questions.findById(id).then((data) => {
            res.json(data);
        });
    } catch (error) {
        console.log(error.message)
    }
}

export async function createQuestions(req: Request, res: Response) {
    const { title, paragraph, image, matchfollow, a, b, c, d, correctAnswer, qtype, seconds, createdBy } = req.body;
    try {
        const questions = await Questions.create({
            title, paragraph, image, matchfollow, a, b, c, d, correctAnswer, qtype, seconds, createdBy
        })
        return res.json(questions);
    } catch (error) {
        console.log(error.message)
    }
}
export async function saveManyQuestions(req: Request, res: Response) {
    const questions = []
    for (const element of req.body) {
        const { title, paragraph, image, matchfollow, a, b, c, d, correctAnswer, qtype, seconds, createdBy } = element

        const question = await Questions.create({ title, paragraph, image, matchfollow, correctAnswer, qtype, a, b, c, d, seconds, createdBy }).catch(e => console.log("while create error", e));
        questions.push(question)
    }
    res.status(statuscode.OK).json(questions)

}

export async function uploadData(req: Request, res: Response) {

    try {
        const sheetName = "Questions";
        const modelName = "questions";
        const filePath = uploadDir + req.file.filename;
        const columnToKey = {

            B: 'title',
            C: 'a',
            D: 'b',
            E: 'c',
            F: 'd',
            G: 'correctAnswer',
        }
        console.log(columnToKey);

        const excelData = convertDatatojson(filePath, sheetName, modelName, columnToKey);

        importExcelData2MongoDB(excelData.Questions, modelName);
        res.json({
            'msg': 'File uploaded/import successfully!', 'file': req.file
        });
    } catch (error) {
        console.error(error);
    }

}

export async function downloadExcel(req: Request, res: Response) {
    try {

        const filePath = __dirname;
        const filename = "questions.xlsx";

        res.status(statuscode.OK).download(filePath, filename);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}


export async function updateQuestion(req: Request, res: Response) {

    const id = req.params.id;
    Questions.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Question. Maybe Question was not found!`
                });
            } else res.send({ message: "Question Details was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Question."
            });
        });
}

export async function deleteQuestion(req: Request, res: Response) {
    const id = req.params.id;
    Questions.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Question. Maybe Question was not found!`
                });
            } else {
                res.send({
                    message: "Question details was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Question."
            });
        });
}


// match
// export async function createMatches(req: Request, res: Response) {

//     const { title,optionLeft,optionRight,correctAnswer,qtype,createdBy } = req.body;
//     try {
//         const questions = await MatchQuestions.create({
//             title,optionLeft,optionRight,correctAnswer,qtype, createdBy
//         })
//         return res.json(questions);
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// export async function matchfindOne(req: Request, res: Response) {
//     try {
//         const id = req.params.id;
//         MatchQuestions.findById(id).then((data) => {
//             res.json(data);
//         });
//     } catch (error) {
//         console.log(error.message)
//     }
// }

