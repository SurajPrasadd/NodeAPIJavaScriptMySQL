import { encrypt, decrypt } from "../utils/cryptoUtil.js";

export function decryptRequest(req, res, next) {
    try {
        if (req.body?.encrypted) {
            const decryptedText = decrypt(req.body.encrypted);
            req.body = JSON.parse(decryptedText); // Replace encrypted body with real JSON
        }
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid encrypted request" });
    }
}

// Intercept and encrypt outgoing response
export function encryptResponse(req, res, next) {
    const oldJson = res.json;

    res.json = function (body) {
        const payload = typeof body === "object" ? JSON.stringify(body) : body;
        const encrypted = encrypt(payload);
        return oldJson.call(this, { encrypted });
    };

    next();
}
