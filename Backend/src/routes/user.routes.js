import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updateUserAvatar,
    getCurrentUser,
    updateAccountDetials,
    changeCurrentPassword,
    classifyDocument
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ================= AUTH ROUTES =================

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/update-details").patch(verifyJWT, updateAccountDetials);

router.route("/update-avatar").put(
    verifyJWT,
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    updateUserAvatar
);

// ================= ML ROUTE =================

// 🔥 ADD THIS BLOCK
router.route("/classify").post(
    upload.single("file"),   // must match Django key
    classifyDocument
);

export default router;