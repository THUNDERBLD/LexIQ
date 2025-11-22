import mongoose, { Schema } from "mongoose";

const legalTemplateSchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ["FIR", "land_dispute", "consumer_complaint", "property", "family_law", "labor", "general"],
        index: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    simplifiedExplanation: {
        type: Map,
        of: String,  // Key: language code, Value: explanation text
        required: true
    },
    commonQuestions: [{
        question: {
            type: Map,
            of: String
        },
        answer: {
            type: Map,
            of: String
        }
    }],
    nextSteps: [{
        step: {
            type: Map,
            of: String
        },
        order: {
            type: Number,
            required: true
        }
    }],
    relatedLaws: [{
        lawName: String,
        section: String,
        description: String
    }],
    verifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "Lawyer",
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    usageCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

legalTemplateSchema.index({ category: 1, isActive: 1 });

export const LegalTemplate = mongoose.models.LegalTemplate || mongoose.model("LegalTemplate", legalTemplateSchema);