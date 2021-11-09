import { Request, Response } from 'express';
import statuscode from 'http-status-codes'
import { Gallery } from './model';


export async function uploadImage(req: Request, res: Response) {
    try {
        const image = await Gallery.create(req.body)
        return res.json(image);
    } catch (error) {
        console.log(error.message)
    }
}
export async function findAllByTeacher(req: Request, res: Response) {
    const teacherId = req.params.id;
    Gallery.find({ createdBy: teacherId }).then(data => {
        if (data.length === 0)
            res.status(statuscode.OK).json([])
        else
            res.status(statuscode.OK).json(data);
    })
}

export async function deleteSingleImage(req: Request, res: Response) {
    const id = req.params.id;
    console.log(id);

    Gallery.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Image. Maybe Image details was not found!`
                });
            } else {
                res.send({
                    message: "Image was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Image."
            });
        });
}
