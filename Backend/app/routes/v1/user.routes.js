import express from "express";
import {
    getAllUsers,
    serachUsers,
    serachUsersPagination,
    userByIdRepo,
    updateUserByIdRepo,
    deleteUserByIdRepo,
    createOrUpdateUserRepo
} from "../../controllers/user.controller.js";
import {
    verifyToken,
    isAdmin,
    isUser,
} from "../../middlewares/authJwt.js";

const router = express.Router();


router.post("/all", [verifyToken, isAdmin], getAllUsers);

router.post("/serach", [verifyToken, isAdmin], serachUsers);

router.post("/serachPage", [verifyToken, isAdmin], serachUsersPagination);

router.post("/userById",[verifyToken, isAdmin],  userByIdRepo);

router.post("/updateUserById", [verifyToken,isUser], updateUserByIdRepo);

router.post("/deleteUserById", deleteUserByIdRepo);

router.post("/createOrUpdateUser", createOrUpdateUserRepo);

export default router;