import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'


import authRoutes from "./routes/auth.routes.js"
import workspaceRoutes from "./routes/workspace.routes.js"


const app = express()

app.use(
    cors()
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "DevDesk API is running",
    })
})

// Authentication routes
app.use("/api/auth", authRoutes);
app.use('/api/workspaces', workspaceRoutes)

export default app;