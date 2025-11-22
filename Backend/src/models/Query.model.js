import mongoose, { Schema } from "mongoose";

const querySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    documentId: {
        type: Schema.Types.ObjectId,
        ref: "Document",
        default: null,
        index: true
    },
    queryText: {
        type: String,
        required: true,
        minlength: 3
    },
    queryLanguage: {
        type: String,
        default: "hi",
        enum: ["hi", "en", "bn", "te", "mr", "ta", "gu", "kn", "ml", "pa"]
    },
    queryType: {
        type: String,
        enum: ["document_clarification", "general_legal", "next_steps", "rights_info"],
        default: "general_legal"
    },
    aiResponse: {
        type: String,
        required: true
    },
    responseLanguage: {
        type: String,
        default: "hi"
    },
    audioResponseUrl: {
        type: String,  // TTS audio file URL
        default: null
    },
    feedback: {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: null
        },
        isHelpful: {
            type: Boolean,
            default: null
        },
        comments: {
            type: String,
            default: null
        }
    },
    processingTime: {
        type: Number,  // in milliseconds
        default: 0
    }
}, { timestamps: true });

querySchema.index({ userId: 1, createdAt: -1 });
querySchema.index({ documentId: 1 });

export const Query = mongoose.models.Query || mongoose.model("Query", querySchema);