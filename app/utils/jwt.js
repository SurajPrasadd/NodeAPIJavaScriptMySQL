import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const generateAccessToken = (jid,expInMin) => {
    return jwt.sign(
        { jid},
        JWT_SECRET,
        { expiresIn: expInMin+'m' }
    );
};

export const generateRefreshToken = (jid,expInMin) => {
    return jwt.sign(
        { jid},
        JWT_REFRESH_SECRET,
        { expiresIn: expInMin+'m' }
    );
};

export const verifyAccessToken = (token) => jwt.verify(token, JWT_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, JWT_REFRESH_SECRET);

export const decodeToken = (token) => jwt.decode(token);

