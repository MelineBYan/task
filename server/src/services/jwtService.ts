import jwt from 'jsonwebtoken';

const key = process.env.JWT_KEY || 'sample_key';

type IToken = {
    userId: string;
    email: string;
    token?: string;
    iat: number;
    exp: number;
};
export default class Jwt {
    generateToken(email: string, userId: string): string {
        try {
            return jwt.sign({ userId, email }, key, {
                expiresIn: process.env.AUTH_JWT_EXP,
            });
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
