import { debug } from 'console';
import { json, Request, Response } from 'express';
import statuscode from 'http-status-codes';
import { SchoolDetail } from './model';

// export async function createSchoolDetails(req: Request, res: Response) {
//     try {
//         const { name,email,classes, phone_number, address, admins,
//             departments,
//             subjects,
//             logoUrl,
//             contact_person,
//             subscription,
//             account_manager,
//             subscriptionPlan,
//             pincode
//         } = req.body;
//         await SchoolDetail.find({ name, pincode }).then(data => {
//             if (data.length > 0) {
//                 res.status(statuscode.BAD_REQUEST).json({ msg: "school already exist" });
//             }
//         })

//         const schoolDetails = await SchoolDetail.create({ name,email, logoUrl, classes, subscriptionPlan, phone_number, address, admins, departments, subjects, contact_person, subscription, account_manager, pincode });
//         res.status(statuscode.OK).json(schoolDetails);



//     } catch (error) {
//         res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
//     }
// }

export async function createSchoolDetails(req: Request, res: Response) {
    try{
    const { name,email,classes, phone_number, address, admins,
                    departments,
                    subjects,
                    logoUrl,
                    contact_person,
                    subscription,
                    account_manager,
                    subscriptionPlan,
                    pincode
                } = req.body;
        console.log(name, email, phone_number)

        await SchoolDetail.find({ name, pincode }).then(async (data) => {
            if (data.length > 0) {
                res.status(statuscode.BAD_REQUEST).send({ msg: "School already exist" });
            } else {
                console.log("entered school Create")
                const schoolDetails = await SchoolDetail.create({ name,email, logoUrl, classes,
                     subscriptionPlan, phone_number, address, admins, departments,
                      subjects, contact_person, subscription, account_manager, pincode })
                        .then(detail => {
                    if (detail) {
                        res.status(statuscode.OK).json(detail);
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).send({ msg: "Internal server error" })
    }
}

// since we are deploying as multi tenant .getall is for admin purpose
export async function getAllSchoolDetails(req: Request, res: Response) {
    try {
        const schoolDetails = await SchoolDetail.find();
        if (schoolDetails.length === 0) {
            res.status(statuscode.OK).json([])
        }
        res.status(statuscode.OK).json(schoolDetails);


    } catch (error) {
        debug(error);
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}


export async function getSingleSchoolDetails(req: Request, res: Response) {
    try {
        const id = req.params.id;
        await SchoolDetail.findOne({ _id: id }).then(data => {
            if (!data._id) {
                res.status(statuscode.OK).json({})
            }
            res.status(statuscode.OK).json(data);
        }

        );

    } catch (error) {
        debug(error);
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
}

export async function deleteSchoolDetails(req: Request, res: Response) {
    const id = req.params.id;
    SchoolDetail.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete School Details. Maybe School Detail was not found!`
                });
            } else {
                res.send({
                    message: "School details was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete School Detail."
            });
        });
}

export async function updateSchoolDetails(req: Request, res: Response) {

    const id = req.params.id;
    SchoolDetail.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Institution. Maybe Details was not found!`
                });
            } else {
                res.send({ message: "Institution Details was updated successfully." });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Institution."
            });
        });
}