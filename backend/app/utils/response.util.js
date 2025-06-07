export const jsonResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        code: statusCode,
        message,
        data,
    });
};