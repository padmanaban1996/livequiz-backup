import bcryptJs from 'bcryptjs';

export async function generatejwt(password: string) {
    const salt = await bcryptJs.genSalt();
    const hash = await bcryptJs.hash(password, salt);
    return hash;
}