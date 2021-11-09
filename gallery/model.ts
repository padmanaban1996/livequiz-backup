import { string } from 'joi';
import mongoose from 'mongoose';

export interface IGallery {
    image: string,
    imageTitle: string,
    createdBy: string,
    belongsToSchool: string
}
const GallerySchema = new mongoose.Schema({
    image: String,
    imageTitle: String,
    createdBy: String,
    belongsToSchool: String

}, { timestamps: true });

export const Gallery = mongoose.model<IGallery & mongoose.Document>("Gallery", GallerySchema);
