const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
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

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    experience: {
      type: String,
      default: "Fresher",
    },

    salary: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract"],
      required: true,
    },

    workMode: {
      type: String,
      enum: ["On-site", "Remote", "Hybrid"],
      required: true,
    },

    openings: {
      type: Number,
      default: 1,
      min: 1,
    },

    lastDateToApply: {
      type: Date,
      required: true,
    },

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const jobModel = mongoose.model("Job", jobSchema);

module.exports = jobModel;