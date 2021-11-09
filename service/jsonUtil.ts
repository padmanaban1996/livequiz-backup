import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

require('dotenv').config();
const key = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/livequiz';
export const jwtToken = {
    async getJwtToken(payload) {
        const token = await jwt.sign(payload, key, {
            expiresIn: '1d'
        });
        return token;
    },
    async getEncryptedPwd(password) {
        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(password, salt);
        return hash;
    }

}
