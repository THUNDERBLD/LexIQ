import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
    feedbackType: {
        type: String,
        enum: ["bug_report", "feature_request", "general_feedback", "query_accuracy", "ocr_accuracy"],
        required: true,
        index: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    message: {
        type: String,
        required: true,
        minlength: 10
    },
    status: {
        type: String,
        enum: ["pending", "reviewed", "resolved", "dismissed"],
        default: "pending",
        index: true
    },
    adminResponse: {
        type: String,
        default: null
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium"
    }
}, { timestamps: true });

feedbackSchema.index({ userId: 1, createdAt: -1 });
feedbackSchema.index({ status: 1, priority: -1 });

export const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);