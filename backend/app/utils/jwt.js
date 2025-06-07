import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const generateAccessToken = (jid,expiresAt) => {
    const exp = Math.floor(new Date(expiresAt).getTime() / 1000);
    return jwt.sign(
        { jid,exp},
        JWT_SECRET
    );
};

export const generateRefreshToken = (jid,expiresAt) => {
    const exp = Math.floor(new Date(expiresAt).getTime() / 1000);
    return jwt.sign(
        { jid,exp},
        JWT_REFRESH_SECRET
    );
};

export const verifyAccessToken = (token) => jwt.verify(token, JWT_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, JWT_REFRESH_SECRET);


