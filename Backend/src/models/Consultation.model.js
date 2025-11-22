import mongoose, { Schema } from "mongoose";

const consultationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    lawyerId: {
        type: Schema.Types.ObjectId,
        ref: "Lawyer",
        required: true,
        index: true
    },
    documentId: {
        type: Schema.Types.ObjectId,
        ref: "Document",
        default: null
    },
    consultationType: {
        type: String,
        enum: ["chat", "voice_call", "video_call", "in_person"],
        default: "chat"
    },
    subject: {
        type: String,
        required: true,
        minlength: 10
    },
    description: {
        type: String,
        required: true,
        minlength: 20
    },
    urgency: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium"
    },
    status: {
        type: String,
        enum: ["requested", "accepted", "in_progress", "completed", "cancelled", "rejected"],
        default: "requested",
        index: true
    },
    scheduledAt: {
        type: Date,
        default: null
    },
    completedAt: {
        type: Date,
        default: null
    },
    lawyerNotes: {
        type: String,
        default: null
    },
    lawyerAdvice: {
        type: String,
        default: null
    },
    followUpRequired: {
        type: Boolean,
        default: false
    },
    fee: {
        type: Number,
        required: true,
        min: 0
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "refunded"],
        default: "pending"
    },
    paymentId: {
        type: String,
        default: null
    },
    userRating: {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: null
        },
        review: {
            type: String,
            default: null
        }
    },
    cancelledBy: {
        type: String,
        enum: ["user", "lawyer", "admin"],
        default: null
    },
    cancellationReason: {
        type: String,
        default: null
    }
}, { timestamps: true });

consultationSchema.index({ userId: 1, status: 1, createdAt: -1 });
consultationSchema.index({ lawyerId: 1, status: 1, createdAt: -1 });
consultationSchema.index({ status: 1, scheduledAt: 1 });

export const Consultation = mongoose.models.Consultation || mongoose.model("Consultation", consultationSchema);