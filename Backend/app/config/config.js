const config = {
    nodeEnv: process.env.NODE_ENV || 'info',
    aesKey: process.env.AES_CBC_KEY,
    aesIv: process.env.AES_CBC_IV,
};

export default config;