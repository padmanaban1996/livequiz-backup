import * as dotenv from 'dotenv';

dotenv.config();
export async function setEnv() {

    let envPath: string;
    switch (process.env.NODE_ENV) {
        // add when needed
        case "development": {
            envPath = `${__dirname}/../../.env.development`;
            break;
        }

        case "production":
            envPath = `${__dirname}/../../.env.production`;
            break;
        default:
            envPath = `${__dirname}/../../.env.development`;
    }
    dotenv.config({ path: envPath });


}

// export const PORT = process.env.PORT;
// export const MODE = process.env.MODE;
// export const JWTSECRETKEY = process.env.JWT_SECRET_KEY;
// export const DBCONNECTIONSTRING = process.env.CONNECTION_STRING

