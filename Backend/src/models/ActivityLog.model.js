import mongoose, { Schema } from "mongoose";

const activityLogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    actionType: {
        type: String,
        enum: [
            "document_upload",
            "document_view",
            "query_submitted",
            "audio_played",
            "language_changed",
            "login",
            "logout",
            "profile_update"
        ],
        required: true,
        index: true
    },
    documentId: {
        type: Schema.Types.ObjectId,
        ref: "Document",
        default: null
    },
    queryId: {
        type: Schema.Types.ObjectId,
        ref: "Query",
        default: null
    },
    metadata: {
        type: Map,
        of: Schema.Types.Mixed,
        default: {}
    },
    ipAddress: {
        type: String,
        default: null
    },
    userAgent: {
        type: String,
        default: null
    },
    deviceType: {
        type: String,
        enum: ["mobile", "tablet", "desktop", "unknown"],
        default: "unknown"
    }
}, { timestamps: true });

activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ actionType: 1, createdAt: -1 });

export const ActivityLog = mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);