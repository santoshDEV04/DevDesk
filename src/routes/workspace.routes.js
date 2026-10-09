import { Router } from "express"
import { authenticate } from "../middlewares/auth.middleware.js"
import { createWorkspace } from "../controllers/workspace.controller.js"

const router = Router();

router.post('/', authenticate, createWorkspace)

export default router;