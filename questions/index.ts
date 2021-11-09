import express from 'express';
import { createQuestions, findAll, findOne, uploadData, downloadExcel, saveManyQuestions, updateQuestion, deleteQuestion} from './controller';
import { upload } from '../service/upload';
import { debug } from 'console';



export const questionsRouter = express.Router();

try {

    questionsRouter.post('/create', createQuestions);
    questionsRouter.get('/teacher/:id', findAll);
    questionsRouter.get('/:id', findOne);
    questionsRouter.post('/upload', saveManyQuestions);
    questionsRouter.get('/download_excel', downloadExcel);

    questionsRouter.put('/update/:id',updateQuestion);
    questionsRouter.delete('/delete/:id',deleteQuestion);

} catch (error) {
    debug("error in route declaration", error);
}


// check uploaded file is correct type excel sheet and validate the values before inserting


