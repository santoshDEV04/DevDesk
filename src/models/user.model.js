import { model , Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "username is required!"],
            trim: true,
            minlength: 3,
            maxlength: 40
        },
        email: {
            type: String,
            required: [true,"email is required!"],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },
        role: {
            type: String,
            enum: ["dev", "manager", "admin"],
            default: 'dev'
        },
        avatar: {
            type: String,
            default: null,
        },
        refreshToken: {
            type: String,
            select: false,
            default: null
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = model("User", userSchema);

export default User;