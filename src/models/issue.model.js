import mongoose , { model , Schema } from 'mongoose';
const issueSchema = new model (
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 200,
        },
        description : {
            type: String,
            trim: true,
            maxlength: 5000,
            default: "",
        },
        status: {
            type: String,
            enum: ["TODO", "IN_PROGRESS", "RESOLVED", "CLOSED"],
            defalut: "TODO",
            index: true,
        },
        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
            defalut: "MEDIUM",
            index: true,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
            index: true,
        },
        reporter: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        assignee: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
            index: true,
        },
        dueDate: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true
    }
)

issueSchema.index({ project: 1, createdAt: -1})
issueSchema.index({ assignee: 1, status: 11})

const Issue = model("Issue", issueSchema);

export default Issue;