import db from "../models/index.js";
import {Op} from "sequelize";

const { user: User, role: Role } = db;

export const findRoleByName = async (roleName) => {4
    try {
        return await Role.findOne({where: {name: roleName}});
    }catch (error) {
        throw error;
    }
};

export const alreadyExistUserEmail = async (username, email) => {
    try {
        return await User.findOne({
            where: {
                [Op.or]: [{username: username}, {email: email}],
            }
        });
    }catch (error) {
        throw error;
    }
};

export const createUser = async ({ username, email, password}, userRole) => {
    try {
        const user = await User.create({username, email, password});
        user.setRoles([userRole])
    }catch (error) {
        throw error;
    }
};

export const findUserByUsername = async (username) => {
    try {
        return await User.findOne({
            where: {username},
            include: {model: Role, as: "roles"},
        });
    }catch (error) {
        throw error;
    }
};