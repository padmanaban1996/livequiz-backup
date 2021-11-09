// start excel upload imports
import multer from 'multer';
import fs from 'fs';
import excelToJson from 'convert-excel-to-json';
import MongoClient from 'mongodb';
// Excel upload questions
export const url = process.env.CONNECTION_STRING;;


export const uploadDir: string = __dirname + '/uploads';
// const basedir = '/home/sankara/projects/livequiz-api';
// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, cb) => {

        cb(null, uploadDir)
    },
    filename: (req: Express.Request, file: Express.Multer.File, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }

});


export const upload = multer({ storage });

export function convertDatatojson(filePath: any, sheetName: string, modelName: string, columnToKey: any) {
    // -> Read Excel File to Json Data
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [{
            // Excel Sheet Name
            name: sheetName,

            // Header Row -> be skipped and will not be present at our result object.
            header: {
                rows: 1
            },

            // Mapping columns to keys
            columnToKey
        }]
    });
    fs.unlinkSync(filePath);
    return excelData;
}



// -> Import Excel File to MongoDB database
export async function importExcelData2MongoDB(data: any, modelName: string) {


    // Insert Json-Object to MongoDB
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        try {
            const dbo = db.db("livequiz");
            dbo.collection(modelName).insertMany(data, (errr, res) => {
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });

        } catch (error) {
            console.log(error);

        }
    });


}
