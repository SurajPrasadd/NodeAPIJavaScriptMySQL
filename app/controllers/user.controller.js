import {
    allUsersPagination, searchUsersByString, serachUsersPaginationByString,
    findUserById, updateUserById, deleteUserById, createOrUpdateUser
} from '../repositories/user.repositories.js';
import {jsonResponse} from "../utils/response.util.js";
import {MESSAGES, STATUS_CODES} from "../config/messages.js";

export const getAllUsers = async (req, res) => {
    try {
        const {limit, page} = req.body;
        let list = await allUsersPagination(page, limit);
        return jsonResponse(res, STATUS_CODES.SUCCESS, MESSAGES.SUCCESS, list);
    }catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const serachUsers = async (req, res) => {
    try {
        const {keyword} = req.body;
        let list = await searchUsersByString(keyword);
        return jsonResponse(res, STATUS_CODES.SUCCESS, MESSAGES.SUCCESS, list);
    }catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const serachUsersPagination = async (req, res) => {
    try {
        const {keyword,page, limit} = req.body;
        let list = await serachUsersPaginationByString(keyword,page, limit);
        return jsonResponse(res, STATUS_CODES.SUCCESS, MESSAGES.SUCCESS, list);
    }catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const userByIdRepo = async (req, res) => {
    try {
        const {id} = req.body;
        let user = await findUserById(id);
        return jsonResponse(res, STATUS_CODES.SUCCESS, MESSAGES.SUCCESS, user);
    }catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const updateUserByIdRepo = async (req, res) => {
    try {
        const {id,username} = req.body;
        let user = await updateUserById(id,username);
        return jsonResponse(res, STATUS_CODES.SUCCESS, MESSAGES.SUCCESS, user);
    }catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const deleteUserByIdRepo = async (req, res) => {
    try {
        const {id} = req.body;
        await deleteUserById(id);
        return jsonResponse(res, STATUS_CODES.SUCCESS, MESSAGES.SUCCESS);
    }catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};

export const createOrUpdateUserRepo = async (req, res) => {
    try {
        let user = await createOrUpdateUser(req);
        return jsonResponse(res, STATUS_CODES.SUCCESS, MESSAGES.SUCCESS, user);
    }catch (error) {
        return jsonResponse(res,STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR);
    }
};