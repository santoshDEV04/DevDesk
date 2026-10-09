import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const {name , email , password} = req.body;

        if(typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Name , email and password must be strings."
            })
        }

        if(!name || !email || !password) {
            return res.status(400).json( {
                success: false,
                message: "Name , email and password are required."
            })
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail })

        if(existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email."
            })
        }

        const user = new User({
            name: name.trim(),
            email: normalizedEmail,
            password
        })

        await user.save();

        return res.status(201).json({
            success: true,
            message: "User registerd successfully.",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            }
        })
    } catch (error) {
        console.error("Register user error: ", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while registering the user."
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            })
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        }).select('+password');

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            })
        }

        const isPasswordValid = await user.comparePassword(password)

        if(!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            })
        }

        if(!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('JWT_SECRET is not configured.')
        }

        const accessToken = jwt.sign(
            { sub: user._id.toString() },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })

        return res.status(200).json({
            success: true,
            message: "Login successfull.",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                }
            }
        })
    } catch (error) {
        console.error('Login error: ', error);

        return res.status(500).json({
            success : false,
            message: 'Something went wrong while logging in.'
        })
    }
}