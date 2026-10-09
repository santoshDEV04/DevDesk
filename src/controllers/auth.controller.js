import User from "../models/user.model.js";

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
