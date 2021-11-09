import { Request, Response } from 'express';
import statuscode from 'http-status-codes';
import { Iuser, User } from '../model';
import { generatejwt } from '../services';
// create one


export async function getAllAdmins(req: Request, res: Response) {
    try {
        const schoolId = req.params.id;
        const admins = await User.find({ belongs_to_school: schoolId, _role: 'admin' });
        if (admins.length === 0)
            res.status(statuscode.OK).json([])
        else
            res.status(statuscode.OK).json(admins)
    } catch (error) {
        console.log(error);
        res.status(statuscode.INTERNAL_SERVER_ERROR);
    }
}


