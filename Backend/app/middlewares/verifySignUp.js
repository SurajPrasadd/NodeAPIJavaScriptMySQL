import {jsonResponse} from "../utils/response.util.js";
import {MESSAGES, STATUS_CODES} from "../config/messages.js";
import {alreadyExistUserEmail, findRoleByName} from "../repositories/auth.repository.js";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const { username, email } = req.body;

        const userByUsernameEmail = await alreadyExistUserEmail(username,email);

        if (userByUsernameEmail) {
            return jsonResponse(res,STATUS_CODES.BAD_REQUEST, MESSAGES.USERNAME_OR_EMAIL_ALREADY_EXISTS);
        }
        next();
    } catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const checkRolesExisted = async (req, res, next) => {
    if (req.body.role) {
        const userRole = await findRoleByName(req.body.role);

        if (!userRole) {
            return jsonResponse(res,STATUS_CODES.NOT_FOUND, MESSAGES.ROLE_NOT_FOUND);
        }

        next();
    }else{
        return jsonResponse(res,STATUS_CODES.NOT_FOUND, MESSAGES.ROLE_NOT_FOUND);
    }
};