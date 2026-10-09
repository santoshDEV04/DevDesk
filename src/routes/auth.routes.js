import express,{ Router } from "express";
import {registerUser, loginUser} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";


const router = Router();

router.post("/register", registerUser)
router.post("/login", loginUser)

router.get('/admin-test', authenticate, authorize('admin'), (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'admin login granted.'
    })
}
)
export default router;