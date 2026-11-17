const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
            unique: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        headline: {
            type: String,
            default: "",
            trim: true
        },

        collegeName: {
            type: String,
            required: true,
            trim: true
        },

        degree: {
            type: String,
            required: true,
            trim: true
        },

        branch: {
            type: String,
            required: true,
            trim: true
        },

        graduationYear: {
            type: Number,
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        skills: {
            type: [String],
            default: []
        },

        bio: {
            type: String,
            default: "",
            trim: true
        },

        experience: [
            {
                jobTitle: {
                    type: String,
                    trim: true
                },

                companyName: {
                    type: String,
                    trim: true
                },

                startDate: {
                    type: Date
                },

                endDate: {
                    type: Date
                },

                currentlyWorking: {
                    type: Boolean,
                    default: false
                },

                description: {
                    type: String,
                    default: ""
                }
            }
        ],

        resumes: [
            {
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
                },
                isDefault: {
                    type: Boolean,
                    default: false
                }
            }
        ],

        profilePic: {
            type: String,
            default: ""
        },

        savedJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job"
            }
        ]
    },
    {
        timestamps: true
    }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;