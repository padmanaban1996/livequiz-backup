import express from 'express';
import { deleteSingleImage, findAllByTeacher, uploadImage } from './controller';



export const galleryRouter = express.Router();

galleryRouter.post('/upload', uploadImage);
galleryRouter.get('/all/:id', findAllByTeacher);
galleryRouter.delete('/delete/:id', deleteSingleImage);
