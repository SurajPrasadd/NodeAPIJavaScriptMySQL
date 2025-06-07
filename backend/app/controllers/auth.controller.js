import bcrypt from "bcryptjs";
import crypto from "crypto";
import {MESSAGES, STATUS_CODES} from "../config/messages.js";
import {jsonResponse} from "../utils/response.util.js";
import {createUser, findRoleByName, findUserByUsername} from "../repositories/auth.repository.js";
import {generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utils/jwt.js";
import {createSession,deleteSessionByJid,findSessionByJid} from "../repositories/session.repositories.js";
import {TIME_IN_MS} from "../config/constants.js";
import logger from "../utils/logger.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 8);
        const userRole = await findRoleByName(role);

        await createUser({
            username,
            email,
            password: hashedPassword,
        },userRole);

        return jsonResponse(res,STATUS_CODES.SUCCESS, MESSAGES.USER_REGISTERED_SUCCESSFULLY);
    } catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        logger.debug("Log in request");
        const user = await findUserByUsername(username);

        if (!user) {
            return jsonResponse(res,STATUS_CODES.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return jsonResponse(res,STATUS_CODES.BAD_REQUEST, MESSAGES.INVALID_PASSWORD);
        }
        const secretKey = crypto.randomBytes(32).toString("base64"); // Store securely in real apps!
        const iv = crypto.randomBytes(16).toString("base64");
        const session = await createSession(user.id,secretKey,iv,parseInt(process.env.JWT_TOKEN_EXP_IN_MIN, 10) * TIME_IN_MS.ONE_MIN);

        const token = generateAccessToken(session.jid,session.expiresAt);
        const tokenRefresh = generateRefreshToken(session.jid,session.expiresAt);

        const authorities = user.roles.map((role) => role.name.toUpperCase());

        return jsonResponse(res,STATUS_CODES.SUCCESS, MESSAGES.SUCCESS,{
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            tokenRefresh: tokenRefresh,
        });
    } catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) return jsonResponse(res,STATUS_CODES.BAD_REQUEST, MESSAGES.ERROR);

        const foundSession = req.foundSession;

        const session = await createSession(foundSession.user.id,null,null,parseInt(process.env.JWT_TOKEN_EXP_IN_MIN, 10) * TIME_IN_MS.ONE_MIN);

        const token = generateAccessToken(session.jid,session.expiresAt);
        const tokenRefresh = generateRefreshToken(session.jid,session.expiresAt);

        await deleteSessionByJid(foundSession.jid);

        return jsonResponse(res,STATUS_CODES.SUCCESS, MESSAGES.SUCCESS,{
            accessToken: token,
            tokenRefresh: tokenRefresh,
        });
    } catch (err) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const logout = async (req, res) => {
    return jsonResponse(res,STATUS_CODES.SUCCESS, MESSAGES.LOG_OUT_MESSAGE);
};