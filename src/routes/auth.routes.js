import express,{ Router } from "express";
import {registerUser, loginUser} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/register", registerUser)
router.post("/login", loginUser)

router.get("/me", authenticate, (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                avatar: req.user.avatar
            }
        }
    });
});

export default router;