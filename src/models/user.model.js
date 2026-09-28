import { model , Schema } from mongoose;
import bcrypt from bcrypt;

const userSchema = Schema(
    {
        username: {
            type: String,
            required: [true, "username is required!"],
            unique: true,
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

userSchema.pre("save", async function (next) {
    if(!this.isModified(password)) return next();

    this.password = await bcrypt.hash(this.password, 10);

    next();
})

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = model("User", userSchema);

export default User;