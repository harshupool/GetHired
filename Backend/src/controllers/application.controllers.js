const jwt = require("jsonwebtoken");

const applicationModel = require("../models/application.model");
const candidateModel = require("../models/candidate.model");
const jobModel = require("../models/job.model");
const userModel = require("../models/user.model");

const applyForJob = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 1. Find candidate
        const candidate = await candidateModel.findOne({
            userId: decoded.id
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found"
            });
        }

        // 2. Get selected resume ID
        const { resumeId } = req.body;

        if (!resumeId) {
            return res.status(400).json({
                success: false,
                message: "Please select a resume"
            });
        }

        // 3. Find selected resume
        const selectedResume = candidate.resumes.id(resumeId);

        if (!selectedResume) {
            return res.status(404).json({
                success: false,
                message: "Selected resume not found"
            });
        }

        // 4. Find job
        const job = await jobModel.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.status !== "Open" || !job.isActive) {
            return res.status(400).json({
                success: false,
                message: "This job is no longer accepting applications."
            });
        }

        // 5. Check duplicate application
        const alreadyApplied = await applicationModel.findOne({
            jobId: job._id,
            candidateId: candidate._id
        });

        if (alreadyApplied) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job."
            });
        }

        // 6. Create application with resume snapshot
        const application = await applicationModel.create({
            jobId: job._id,
            candidateId: candidate._id,
            recruiterId: job.recruiterId,
            companyId: job.companyId,

            resume: {
                name: selectedResume.name,
                fileName: selectedResume.fileName,
                url: selectedResume.url,
                fileId: selectedResume.fileId
            }
        });

        // 7. Update job applicants
        job.applicants.push(candidate.userId);
        await job.save();

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully.",
            application
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const hasApplied = async (req, res) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const candidate = await candidateModel.findOne({
            userId: decoded.id,
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }

        const application = await applicationModel.findOne({
            jobId: req.params.jobId,
            candidateId: candidate._id,
        });

        return res.status(200).json({
            success: true,
            applied: !!application,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};


const getMyApplications = async (req, res) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const candidate = await candidateModel.findOne({
            userId: decoded.id,
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }

        const applications = await applicationModel
            .find({
                candidateId: candidate._id,
            })
            .populate({
                path: "jobId",
                populate: {
                    path: "companyId",
                    select: "companyName logo",
                },
            })
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            success: true,
            applications,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

const getApplicantsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const applications = await applicationModel
            .find({ jobId })
            .populate({
                path: "candidateId",
                select: "collegeName degree branch graduationYear skills profilePic location phone bio userId",
                populate: {
                    path: "userId",
                    select: "name email"
                }
            })
            .populate({
                path: "jobId",
                select: "jobTitle companyId",
                populate: {
                    path: "companyId",
                    select: "companyName"
                }
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        const application = await applicationModel.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        application.status = status;

        await application.save();

        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    applyForJob,
    hasApplied,
    getMyApplications,
    getApplicantsByJob,
    updateApplicationStatus,
};