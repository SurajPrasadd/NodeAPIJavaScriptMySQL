import express from "express";
import {
    getAllUsers
} from "../../controllers/user.controller.js";
import {
    verifyToken,
    isAdmin
} from "../../middlewares/authJwt.js";
//import {upload} from "../../middlewares/uploadLocation.js";

import  multer from "multer";
import {fileURLToPath} from "url";
import path from "path";
import fs from "fs";
import logger from "../../utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../../");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})
const upload =multer({ storage });



const router = express.Router();


router.post("/vesiontestall", [verifyToken, isAdmin], getAllUsers);

router.post("/upload_multi", [upload.array("files")], uploadFiles);

router.post("/upload_single", [upload.single("singleFile")], uploadFiles);

router.post("/upload_multi_single", [upload.fields([
    { name: "singleFile", maxCount: 1 },
    { name: "files", maxCount: 5 },
])], uploadFiles);

router.post("/download", [verifyToken, isAdmin],(req, res) => {
    const {fileName} = req.body;
    const filePath = path.join(projectRoot, "uploads", fileName);
    res.download(filePath, fileName, (err) => {
        if (err) {
            res.status(404).json({ message: "File not found or download failed" });
        }
    });
});

router.post("/downloadbase", [verifyToken, isAdmin],(req, res) => {
    const {fileName} = req.body;
    const filePath = path.join(projectRoot, "uploads", fileName);
    fs.readFile(filePath, (err, fileBuffer) => {
        if (err) {
            return res.status(404).json({ message: "File not found or read failed" });
        }

        const base64File = fileBuffer.toString("base64");

        res.status(200).json({
            fileName,
            base64: base64File,
            mimeType: "application/octet-stream", // optionally detect real MIME type
        });
    });
});

function uploadFiles(req, res) {
  //  logger.debug(req.files);
    logger.info("Successfully uploaded files");
    logger.error("File List", req.files);
    res.json({ message: "Successfully uploaded files" });
}

export default router;