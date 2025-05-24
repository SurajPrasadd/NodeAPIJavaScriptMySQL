import crypto from "crypto";
import config from "../config/config.js";

const secretKey = config.aesKey; // Store securely in real apps!
const iv = config.aesIv;

export function encrypt(plainString) {
    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    let encrypted = Buffer.concat([cipher.update(Buffer.from(plainString, "utf8")), cipher.final()]);
    return encrypted.toString("base64");
}

export function decrypt(base64String) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
    const deciphered = Buffer.concat([decipher.update(Buffer.from(base64String, "base64")), decipher.final()]);
    return deciphered.toString("utf8");
}