import express from "express";
import {signup, signin, logout, refresh} from "../../controllers/auth.controller.js";
import { checkDuplicateUsernameOrEmail, checkRolesExisted,deleteSession, verifyTokenForRefresh } from "../../middlewares/index.js";

const router = express.Router();

router.post("/signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], signup);

router.post("/signin", signin);

router.post("/refresh", [verifyTokenForRefresh], refresh);

router.post("/logout", [deleteSession], logout);

export default router;