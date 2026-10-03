import mongoose, { model, Schema } from "mongoose";

const activityShema = new model (
    {
        issue: {
            type: Schema.Types.ObjectId,
            ref: "Issue",
            required: true,
            index: true
        },
        actor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        action: {
            type: String,
            enum: [
                "ISSUE_CREATED",
                "ISSUE_UPDATED",
                "ASSIGNED",
                "STATUS_CHANGED",
                "PRIORITY_CHANGED",
                "COMMENT_ADDED",
                "ISSUE_CLOSED"
            ],
            required: true
        },
        metadata: {
            type: Schema.Types.Mixed,
            default: {},
        }
    }
)

activityShema.index({ issue: 1, createdAt: -1 })

const Activity = model("Activity", activityShema);

export default Activity;