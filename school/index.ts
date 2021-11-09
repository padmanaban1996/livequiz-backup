import express from 'express';
import { upload } from '../service/upload';
import { createEachClass, getAllClass, getOneClassDetailsById, updateClassById } from './class/controller';
import { createSubject, getAllSubject, uploadLogo } from './controller';
import { createSchoolDetails, getAllSchoolDetails, getSingleSchoolDetails } from './school_details/controller';


export const schoolRouter = express.Router();

// school details
schoolRouter.post('/', createSchoolDetails)
schoolRouter.get('/', getAllSchoolDetails)
schoolRouter.get('/:id', getSingleSchoolDetails)
schoolRouter.post('/upload/school/logo/:id', upload.single("uploadLogo"), uploadLogo)

// class
schoolRouter.get('/:id/class', getAllClass);
schoolRouter.post('/class', createEachClass);
schoolRouter.get('/class/:id/details', getOneClassDetailsById);
schoolRouter.put('/class/:id/update', updateClassById);

// create subject and add to school subject
schoolRouter.get('/:id/subject', getAllSubject);
schoolRouter.post('/:id/subject/', createSubject);
// schoolRouter.put('/:id/update',updateSubject)
