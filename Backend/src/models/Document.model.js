import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    documentType: {
        type: String,
        enum: ["FIR", "land_record", "ration_card", "court_notice", "rent_agreement", "other"],
        required: true,
        index: true
    },
    originalFileName: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,  // Cloudinary or S3 URL
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    uploadLanguage: {
        type: String,
        default: "hi",  // Hindi as default
        enum: ["hi", "en", "bn", "te", "mr", "ta", "gu", "kn", "ml", "pa"]
    },
    processingStatus: {
        type: String,
        enum: ["uploaded", "processing", "completed", "failed"],
        default: "uploaded",
        index: true
    },
    ocrText: {
        type: String,
        default: null
    },
    extractedEntities: {
        names: [String],
        dates: [String],
        locations: [String],
        caseNumbers: [String],
        amounts: [String],
        legalTerms: [String]
    },
    simplifiedSummary: {
        type: String,
        default: null
    },
    aiAnalysis: {
        type: String,
        default: null
    },
    confidence: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

documentSchema.index({ userId: 1, createdAt: -1 });
documentSchema.index({ documentType: 1, processingStatus: 1 });

export const Document = mongoose.models.Document || mongoose.model("Document", documentSchema);