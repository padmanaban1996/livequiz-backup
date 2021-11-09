import jwt from 'jsonwebtoken';
import statuscode from 'http-status-codes';
import { generatejwt } from '../user/services';
import { JWT_SECRET_KEY } from '../enviroment';
import { Request, Response } from 'express';
import status from 'http-status-codes';
import bcryptJs from 'bcryptjs';
import { User } from '../user/model';


export async function createSuperAdmin(req: Request, res: Response) {
    try {

        const users = await User.find({ role: "superadmin" });
        if(users.length === 0){
        const newUser = {} as any;
        newUser.email = "superadmin@insightmirror.in";
        newUser.password = await generatejwt("pwd");
        newUser.role = "superadmin";

        const user = await User.create(newUser);
        console.log("super admin created.");
        res.status(statuscode.OK).json([]);
    }else{
        console.log("super admin already exits");
        res.status(statuscode.OK).json([]);
    }

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

}