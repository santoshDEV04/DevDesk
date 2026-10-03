import mongoose , { model, Schema } from "mongoose";

const commentSchema = new model (
    {
        issue: {
            type: Schema.Types.ObjectId,
            ref: "Issue",
            required: true,
            index: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 3000,
        },
    },
    {
        timestamps: true,
    }
)

commentSchema.index({ issue: 1, createdAt: -1})

const Comment = model("Comment", commentSchema);

export default Comment;