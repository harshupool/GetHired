const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },

        candidateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate",
            required: true,
        },

        recruiterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "Under Review",
                "Shortlisted",
                "Interview Scheduled",
                "Rejected",
                "Accepted",
            ],
            default: "Applied",
        },

        coverLetter: {
            type: String,
            default: "",
        },

        resume: {
            name: {
                type: String,
                required: true
            },
            fileName: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            fileId: {
                type: String,
                required: true
            }
        },


        appliedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const applicationModel = mongoose.model("Application", applicationSchema);

module.exports = applicationModel;