const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        recruiterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        companyName: {
            type: String,
            required: true,
            trim: true,
        },

        companyWebsite: {
            type: String,
            default: "",
        },

        designation: {
            type: String,
            default: "",
        },

        location: {
            type: String,
            default: "",
            trim: true,
        },

        phone: {
            type: String,
            default: "",
            trim: true,
        },

        companyDescription: {
            type: String,
            default: "",
        },

        logo: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Company", companySchema);