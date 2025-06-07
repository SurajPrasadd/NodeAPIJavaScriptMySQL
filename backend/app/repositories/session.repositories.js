import db from '../models/index.js';

const { session: Session,user :User,role :Role } = db;

export const createSession = async (userId, postKey = null, postIv = null, expiresInMs = 15 * 60 * 1000 ) => {
    try {
        const expiresAt = new Date(Date.now() + expiresInMs);

        const session = await Session.create({
            userId,
            postKey,
            postIv,
            expiresAt,
        });
        return session;
    } catch (error) {
        throw error;
    }
};

export const findSessionByJid = async (jid) => {
    try {
        return await Session.findOne({
            where: { jid },
            include:
                {
                    model: User,
                    as: "user",
                    include: {model: Role, as: "roles"}
                },
        });
    } catch (error) {
        throw error;
    }
};

export const deleteSessionByJid = async (jid) => {
    try {
        return await Session.destroy({ where: { jid } });
    } catch (error) {
        throw error;
    }
};