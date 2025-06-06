import {jsonResponse} from "../utils/response.util.js";
import {MESSAGES, STATUS_CODES} from "../config/messages.js";
import {ROLES, TIME_IN_MS} from "../config/constants.js";
import { verifyAccessToken, verifyRefreshToken} from "../utils/jwt.js";
import {findSessionByJid,deleteSessionByJid} from "../repositories/session.repositories.js";

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        return jsonResponse(res,STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
    }

    try {
        const decoded = verifyAccessToken(token.replace("Bearer ", ""));
        const foundSession = await findSessionByJid(decoded.jid);

        if (!foundSession || !foundSession.user) {
            return jsonResponse(res,STATUS_CODES.UNAUTHORIZED, MESSAGES.INVALID_OR_EXPIRED_SESSION);
        }

        req.roles = foundSession.user.roles.map((role) => role.name.toUpperCase());

        next();
    } catch (err) {
        return jsonResponse(res,STATUS_CODES.UNAUTHORIZED, MESSAGES.INVALID_OR_EXPIRED_SESSION);
    }
};

export const verifyTokenForRefresh = async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return jsonResponse(res,STATUS_CODES.BAD_REQUEST, MESSAGES.ERROR);

    try {
        const decoded = verifyRefreshToken(refreshToken);
        const foundSession = await findSessionByJid(decoded.jid);

        if (!foundSession || !foundSession.user) {
            return jsonResponse(res,STATUS_CODES.UNAUTHORIZED, MESSAGES.INVALID_OR_EXPIRED_SESSION);
        }
        req.foundSession = foundSession;
        next();
    } catch (err) {
        return jsonResponse(res,STATUS_CODES.UNAUTHORIZED, MESSAGES.INVALID_OR_EXPIRED_SESSION);
    }
};

export const deleteSession = async (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        return jsonResponse(res,STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
    }

    try {
        const decoded = verifyAccessToken(token.replace("Bearer ", ""));
        const foundSession = await findSessionByJid(decoded.jid);
        if (!foundSession) {
            return jsonResponse(res,STATUS_CODES.UNAUTHORIZED, MESSAGES.INVALID_OR_EXPIRED_SESSION);
        }else{
            await deleteSessionByJid(decoded.jid);
        }

        next();
    } catch (err) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const roles = req.roles;
        if (roles.includes(ROLES.ADMIN)) {
            next();
            return;
        }
        jsonResponse(res,STATUS_CODES.BAD_REQUEST, MESSAGES.USER_DO_NOT_HAVE_AUTHORIZED);
    } catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const isUser = async (req, res, next) => {
    try {
        const roles = req.roles;
        if (roles.includes(ROLES.USER) || roles.includes(ROLES.ADMIN)) {
            next();
            return;
        }
        jsonResponse(res,STATUS_CODES.BAD_REQUEST, MESSAGES.USER_DO_NOT_HAVE_AUTHORIZED);
    } catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};