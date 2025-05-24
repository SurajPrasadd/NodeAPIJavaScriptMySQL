const config = {
    logLevel: process.env.LOG_LEVEL || 'info',
    aesKey: process.env.AES_CBC_KEY,
    aesIv: process.env.AES_CBC_IV,
};

export default config;