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
    console.log(req.body);
    console.log(req.files);
    // [
    //     {
    //         fieldname: 'files',
    //         originalname: 'Screenshot 2024-12-13 121121.png',
    //         encoding: '7bit',
    //         mimetype: 'image/png',
    //         destination: 'uploads/',
    //         filename: 'd24eff97298d563a81011e49fa69a3d0',
    //         path: 'uploads\\d24eff97298d563a81011e49fa69a3d0',
    //         size: 143938
    //     },
    //     {
    //         fieldname: 'files',
    //         originalname: 'Screenshot 2024-12-13 121139.png',
    //         encoding: '7bit',
    //         mimetype: 'image/png',
    //         destination: 'uploads/',
    //         filename: '2fe886ae1aec7dead4db45c64d2ddc8e',
    //         path: 'uploads\\2fe886ae1aec7dead4db45c64d2ddc8e',
    //         size: 133847
    //     }
    // ]

    res.json({ message: "Successfully uploaded files" });
}

export default router;