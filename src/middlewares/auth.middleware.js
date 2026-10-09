import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const authenticate = async (req, res, next) => {
    try {

        const token = req.cookies?.accessToken;

        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication Required, please login.'
            })
        }

        if (!process.env.ACCESS_TOKEN_SECRET) {
            console.error('AccessToken is not configured.')

            return res.status(500).json({
                success: false,
                message: 'Internal Server Error.'
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        )

        if(!decoded.sub) {
            return res.status(401).json({
                success: false,
                message: 'Invalid access Token.'
            })
        }

        const user = await User.findById(decoded.sub)
            .select('_id name email role avatar')

        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'User no longer exists. Please log in.'
            })
        }

        req.user = user;

        return next();

    } catch (error) {
        console.error("Authentication middleware error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}