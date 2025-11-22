import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const lawyerSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 8,
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/,
        unique: true
    },
    barCouncilId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    barCouncilCertificate: {
        type: String,  // Cloudinary URL
        required: true
    },
    specialization: [{
        type: String,
        enum: [
            "criminal_law",
            "civil_law",
            "property_law",
            "family_law",
            "consumer_law",
            "labor_law",
            "corporate_law",
            "tax_law",
            "constitutional_law"
        ]
    }],
    languages: [{
        type: String,
        enum: ["hi", "en", "bn", "te", "mr", "ta", "gu", "kn", "ml", "pa"]
    }],
    yearsOfExperience: {
        type: Number,
        required: true,
        min: 0
    },
    practiceLocation: {
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        district: String
    },
    avatar: {
        type: String,
        default: "default-lawyer-avatar.jpg"
    },
    bio: {
        type: String,
        maxlength: 500
    },
    verificationStatus: {
        type: String,
        enum: ["pending", "verified", "rejected", "suspended"],
        default: "pending",
        index: true
    },
    verifiedAt: {
        type: Date,
        default: null
    },
    verifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",  // Admin who verified
        default: null
    },
    rating: {
        average: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        totalReviews: {
            type: Number,
            default: 0
        }
    },
    availability: {
        isAvailable: {
            type: Boolean,
            default: true
        },
        consultationHours: {
            type: String,
            default: "9 AM - 6 PM"
        }
    },
    consultationFee: {
        type: Number,
        min: 0,
        default: 0
    },
    totalCasesHandled: {
        type: Number,
        default: 0
    },
    totalConsultations: {
        type: Number,
        default: 0
    },
    refreshToken: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Password encryption middleware
lawyerSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Custom methods
lawyerSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

lawyerSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
            role: "lawyer"
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

lawyerSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

// Indexes
lawyerSchema.index({ verificationStatus: 1, isActive: 1 });
lawyerSchema.index({ specialization: 1, "practiceLocation.state": 1 });
lawyerSchema.index({ "rating.average": -1 });

export const Lawyer = mongoose.models.Lawyer || mongoose.model("Lawyer", lawyerSchema);