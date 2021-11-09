import { Request, Response } from 'express';
import status from 'http-status-codes';
import bcryptJs from 'bcryptjs';
import { AdminUser, Iuser, StudentUser, TeacherUser, User } from './model';
import jwt from 'jsonwebtoken';
import statuscode from 'http-status-codes';
import { generatejwt } from './services';
import { JWT_SECRET_KEY } from '../enviroment';
import async from 'async';
import crypto from 'crypto';
import nodemailer from 'nodemailer'
import MongoClient from 'mongodb';
import { SchoolDetail } from '../school/school_details/model';
import { jwtToken } from '../service/jsonUtil';
import { mailModule } from '../service/mail';
import { config } from '../config/config';
import Razorpay from 'razorpay'

// --------------------------Start--CRUD-and-common-api-functions---------------------------------------------
export async function getAll(req: Request, res: Response) {
    try {
        const schoolId = req.params.id;

        const users = await User.find({ belongs_to_school: schoolId });
        if (users.length === 0)
            res.status(statuscode.OK).json([])
        else
            res.status(statuscode.OK).json(users);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}

// create user
export async function signup(req: Request, res: Response) {
    try {
        // validate object ||do later
        // const { error, value } = userValidation.validateSchema(req.body);
        // if (error && error.details) {
        //     res.status(400).json(error);
        // }
        const { name, email, password, role } = req.body;

        const newUser = {} as Iuser;
        // create new user with recieved values and hashed pwd
        newUser.name = name;
        newUser.email = email;
        newUser.password = await generatejwt(password);
        newUser.role = role;



        const user = await User.create(newUser);
        return res.json({ success: true, message: 'user created successfully', user });

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}


// --------------------------Start--other-functions---------------------------------------------
export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        console.log("password", password);

        // validate object and send if its bad request
        // const { error, value } = userValidation.loginValidation(req.body);
        // if (error && error.details) {
        //     return res.status(400).json(error);
        // }

        // check if user is available
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(status.BAD_REQUEST).json({ err: 'invalid email or password' });
        }

        // passsword comparison
        const matched = await bcryptJs.compare(password, user.password);
        if (!matched) {
            return res.status(status.UNAUTHORIZED).json({ err: 'Invalid password' })
        }


        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: '1d' });
        return res.json({ success: true, token, user });


    } catch (error) {
        console.error(error);
        res.status(status.INTERNAL_SERVER_ERROR).json(error);
    }
}


// get single student
export async function getSingleUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
        res.status(statuscode.NOT_FOUND).json({ err: "no id found" });
    }
    const user = await User.findById(id);
    if (!user) {
        // res.status(statuscode.NOT_FOUND).json({ err: "user not found with given id" });
        res.status(statuscode.OK).json({})
    }
    res.status(statuscode.OK).json(user);

}

// create user with role
export async function createUserWithRole(req: Request, res: Response) {
    try {

        const { email, password, schoolLevel, interestedIn, role, name, belongs_to_school, profile,
            _teacher,
            _student,
            _admin, subscriptionPlan
        } = req.body;

        const _password = await generatejwt(password);

        User.find({ email }).then(data => {

            if (data.length > 0) {

                res.json(statuscode.BAD_REQUEST).json({ msg: "user already exist" })
            }
        })

        if (role === 'student') {

            const student = await StudentUser.create({ email, schoolLevel, interestedIn, belongs_to_school, profile, subscriptionPlan, password: _password, role, name, _student })
            res.status(statuscode.OK).json(student);


        } else if (role === 'teacher') {

            const user = await TeacherUser.create({ email, belongs_to_school, profile, subscriptionPlan, password: _password, role, name, _teacher })
            res.status(statuscode.OK).json(user);

        } else if (role === 'admin') {
            const user = await AdminUser.create({ email, belongs_to_school, profile, subscriptionPlan, password: _password, role, name, _admin })

            res.status(statuscode.OK).json(user);
        }
    } catch (error) {
        console.log('user create', error);
        res.status(statuscode.CONFLICT).json(error);
    }
}
// async.waterfall
export async function forgotPassword(req: Request, res: Response) {
    try {
        // const {error, value} = userValidation.forgotPasswordValidation(req.body);
        //  if(error && error.details) {
        //    return res.status(400).json(error);
        //  }
        const email = req.body.email
        console.log("Forgot password function called", email);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(statuscode.NO_CONTENT).json({ msg: 'could not find user' })
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: '1d' });
        console.log("token is ", token);

        // change the url below if there is env
        const resetLink = `
     <h4> Please click the link below to reset the password</h4>
     <a href=${process.env.APP_URL || 'http://localhost:4200'}/#/reset-password/${token}>Click me to reset</a>
     `;

        const results = await mailModule.sendTransportMail({
            html: resetLink,
            subject: "Password reset",
            email: user.email
        });
        console.log("result", results);


        return res.json(results);
    } catch (error) {
        console.error(error);
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
}
export async function resetPassword(req: Request, res: Response) {
    try {

        const { pwd, id } = req.body;

        if (!pwd) {
            return res.status(statuscode.BAD_REQUEST).json({ err: 'password is required' });
        }

        const user = await User.findById(id);
        const hash = await jwtToken.getEncryptedPwd(pwd);
        user.password = hash;
        await user.save();
        return res.json({ success: true })

    } catch (error) {
        console.error(error);
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }

}
// export async function contactUs(req: Request, res: Response) {
//     try {

//         const contact = req.body;
//         console.log(contact);

//         const results = await mailModule.sendMail(contact, (err, info) => {
//             if (err) {
//                 console.log(err);
//                 res.status(400);
//                 res.send({ error: "Failed to send email" });
//             } else {
//                 console.log("Email has been sent");
//                 res.send(info);
//             }
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
//     }


// }

export async function payForSubscription(req: Request, res: Response) {
    const options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    const instance = new Razorpay({
        key_id: config.razPay.key,
        key_secret: config.razPay.secret
    })
    instance.orders.create(options, (err, order) => {
        res.status(statuscode.OK).json(order)
    });
}
export async function updateUser(req: Request, res: Response) {
    const email = req.body.email;
    // const user = await User.findOne({ email });
    // if (user) return res.status(404).send({
    //     message: `Email already registered.`
    // });
    const id = req.params.id;
    // console.log("data", req.body);
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot update User. Maybe User was not found!`
                });
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User."
            });
        });

};
export async function deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User."
            });
        });
}