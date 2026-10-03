import { model , Schema } from 'mongoose';

const workSpaceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        description : {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true,
    }
)

const Workspace = model("Workspace", workSpaceSchema);

export default Workspace;