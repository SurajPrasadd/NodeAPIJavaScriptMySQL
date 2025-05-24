import db from '../models/index.js';
import {Op} from "sequelize";
const { user :User } = db;

export const allUsersPagination  = async (inputPage, inputLimit) => {
    const page = parseInt(inputPage) || 1;  // Default to page 1
    const limit = parseInt(inputLimit) || 10; // Default to 10 per page
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await User.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']]  // Optional sorting
        });

        const totalPages = Math.ceil(count / limit);

        return {
            data: rows,
            meta: {
                totalItems: count,
                currentPage: page,
                totalPages,
                perPage: limit
            }
        };
    } catch (error) {
        throw error;
    }
};

export const searchUsersByString = async (keyword, res) => {
    try {
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { username: { [Op.like]: `%${keyword}%` } },
                    { email: { [Op.like]: `%${keyword}%` } }
                ]
            },
            order: [['createdAt', 'DESC']]
        });

        return { data: users };
    } catch (error) {
        throw error;
    }
};

export const serachUsersPaginationByString = async (keyword,inputPage, inputLimit) => {
    const page = parseInt(inputPage) || 1;
    const limit = parseInt(inputLimit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await User.findAndCountAll({
            where: {
                [Op.or]: [
                    { username: { [Op.like]: `%${keyword}%` } },
                    { email: { [Op.like]: `%${keyword}%` } }
                ]
            },
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return {
            data: rows,
            meta: {
                totalItems: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit)
            }
        };
    } catch (error) {
        throw error;
    }
};

export const updateUserById = async (id,username) => {
    try {

        // Find the user by ID
        const user = await User.findByPk(id);

        if (!user) {
            return {};
        }

        // Update the username
        user.username = username;
        await user.save();

        return { data: user };
    } catch (error) {
        throw error;
    }
};

export const deleteUserById = async (id) => {
    try {
        await User.destroy({ where: { id } });
    }catch (error) {
        throw error;
    }
};

export const createOrUpdateUser = async (req) => {
    try {
        const { id, ...data } = req.body;
        let user;

        if (id) {
            const [updatedRows] = await User.update(data, { where: { id } });

            if (updatedRows === 0) {
                return { error: 'User not found or no changes made' };
            }

            user = await User.findByPk(id);
        } else {
            user = await User.create(data);
        }

        return { data: user };
    } catch (error) {
        console.error('Error in createOrUpdateUser:', error);
        throw error;
    }
};

export const findUserById = async (id) => {4
    try {
        const user = await User.findByPk(id);
        return user || {};
    }catch (error) {
        throw error;
    }
};