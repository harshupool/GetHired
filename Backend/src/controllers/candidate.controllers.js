const userModel = require("../models/user.model");
const candidateModel = require("../models/candidate.model");
const applicationModel = require('../models/application.model');
const jobModel = require("../models/job.model");
const jwt = require("jsonwebtoken");


const { uploadFile, deleteFile } = require("../config/storage.config");

async function isResumeUsedInApplications(fileId) {
    return await applicationModel.exists({
        "resume.fileId": fileId
    });
}


async function getCandidateProfile(req, res) {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        const user = await userModel
            .findById(decoded.id)
            .select("-password");


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const candidate = await candidateModel.findOne({
            userId: user._id
        });


        if (!candidate) {
            return res.status(404).json({
                message: "Candidate profile not found"
            });
        }


        return res.status(200).json({
            user,
            candidate
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}


async function updateCandidateProfile(req, res) {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const {
            phone,
            headline,
            collegeName,
            degree,
            branch,
            graduationYear,
            location,
            skills,
            bio
        } = req.body;


        const candidate = await candidateModel.findOne({
            userId: decoded.id
        });


        if (!candidate) {
            return res.status(404).json({
                message: "Candidate profile not found"
            });
        }


        candidate.phone = phone;
        candidate.headline = headline;
        candidate.collegeName = collegeName;
        candidate.degree = degree;
        candidate.branch = branch;
        candidate.graduationYear = graduationYear;
        candidate.location = location;

        candidate.skills = skills
            ? skills
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill)
            : [];

        candidate.bio = bio;


        await candidate.save();


        return res.status(200).json({
            message: "Candidate profile updated successfully",
            candidate
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

async function getCandidateProfileByUserId(req, res) {
    try {

        const { userId } = req.params;

        const user = await userModel
            .findById(userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const candidate = await candidateModel.findOne({ userId });

        if (!candidate) {
            return res.status(404).json({
                message: "Candidate profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            user,
            candidate
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
}


async function toggleSaveJob(req, res) {
    try {

        const { jobId } = req.params;

        const candidate = await candidateModel.findOne({
            userId: req.user.id
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        // Check if job is already saved
        const alreadySaved = candidate.savedJobs.some(
            id => id.toString() === jobId
        );

        if (alreadySaved) {

            candidate.savedJobs = candidate.savedJobs.filter(
                id => id.toString() !== jobId
            );

        } else {

            candidate.savedJobs.push(jobId);

        }

        await candidate.save();

        return res.status(200).json({
            success: true,
            saved: !alreadySaved,
            message: alreadySaved
                ? "Job removed from saved jobs"
                : "Job saved successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
}


async function getRecentApplications(req, res) {
    try {
        // Get logged-in user ID from middleware
        const userId = req.user.id;

        // Find candidate profile
        const candidate = await candidateModel.findOne({
            userId
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found"
            });
        }

        // Fetch latest 3 applications
        const applications = await applicationModel
            .find({ candidateId: candidate._id })
            .populate("jobId", "jobTitle")
            .populate("companyId", "companyName")
            .sort({ appliedAt: -1 })
            .limit(3);

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
}


async function getCandidateDashboardStats(req, res) {
    try {
        // 1. Get logged-in user's ID
        const userId = req.user.id;

        // 2. Find candidate profile
        const candidate = await candidateModel.findOne({
            userId
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found"
            });
        }

        // 3. Fetch application statistics
        const [
            totalApplications,
            shortlisted,
            interviewScheduled
        ] = await Promise.all([

            // Total applications
            applicationModel.countDocuments({
                candidateId: candidate._id
            }),

            // Shortlisted applications
            applicationModel.countDocuments({
                candidateId: candidate._id,
                status: "Shortlisted"
            }),

            // Interview scheduled applications
            applicationModel.countDocuments({
                candidateId: candidate._id,
                status: "Interview Scheduled"
            })

        ]);

        // 4. Count saved jobs
        const savedJobs = candidate.savedJobs.length;

        // 5. Send response
        return res.status(200).json({
            success: true,
            stats: {
                totalApplications,
                shortlisted,
                interviewScheduled,
                savedJobs
            }
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

async function getRecommendedJobs(req, res) {
    try {
        // 1. Identify the logged-in candidate
        const candidate = await candidateModel.findOne({
            userId: req.user.id
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found"
            });
        }

        // 2. Get candidate skills in lowercase
        const candidateSkills = (candidate.skills || [])
            .map(skill => skill.trim().toLowerCase())
            .filter(skill => skill);

        // 3. Find eligible jobs
        const eligibleJobs = {
            status: "Open",
            isActive: true,
            lastDateToApply: { $gte: new Date() }
        };

        const jobFields =
            "jobTitle skills location employmentType workMode salary experience lastDateToApply companyId createdAt";

        // 4. If candidate has no skills, show recent jobs
        if (candidateSkills.length === 0) {
            const jobs = await jobModel
                .find(eligibleJobs)
                .select(jobFields)
                .populate("companyId", "companyName logo")
                .sort({ createdAt: -1 })
                .limit(3);

            return res.status(200).json({
                success: true,
                recommendationType: "recent",
                jobs
            });
        }

        // 5. Find jobs having at least one matching skill
        const matchingJobs = await jobModel
            .find({
                ...eligibleJobs,
                skills: {
                    $in: candidateSkills.map(
                        skill => new RegExp(`^${skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i")
                    )
                }
            })
            .select(jobFields)
            .populate("companyId", "companyName logo");

        // 6. Calculate skill match percentage
        const recommendedJobs = matchingJobs.map(job => {
            const jobSkills = [...new Set(
                (job.skills || [])
                    .map(skill => skill.trim().toLowerCase())
                    .filter(skill => skill)
            )];

            const matchingSkills = jobSkills.filter(skill =>
                candidateSkills.includes(skill)
            );

            const matchPercentage = jobSkills.length
                ? Math.round(
                    (matchingSkills.length / jobSkills.length) * 100
                )
                : 0;

            return {
                ...job.toObject(),
                matchPercentage
            };
        });

        // 7. Sort by highest match percentage
        recommendedJobs.sort(
            (a, b) => b.matchPercentage - a.matchPercentage
        );

        // 8. Return top 3 matching jobs
        if (recommendedJobs.length > 0) {
            return res.status(200).json({
                success: true,
                recommendationType: "skill-match",
                jobs: recommendedJobs.slice(0, 3)
            });
        }

        // 9. If no skill matches, show recent jobs
        const recentJobs = await jobModel
            .find(eligibleJobs)
            .select(jobFields)
            .populate("companyId", "companyName logo")
            .sort({ createdAt: -1 })
            .limit(3);

        return res.status(200).json({
            success: true,
            recommendationType: "recent",
            jobs: recentJobs
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


// Resume Upload Controller

async function uploadResume(req, res) {
    try {
        // 1. Check whether a file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume"
            });
        }

        // 2. Get resume name
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please provide a resume name"
            });
        }

        // 3. Find candidate
        const candidate = await candidateModel.findOne({
            userId: req.user.id
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found"
            });
        }

        // 4. Check maximum resume limit
        if (candidate.resumes.length >= 3) {
            return res.status(400).json({
                success: false,
                message: "You can upload a maximum of 3 resumes"
            });
        }

        // 5. Upload file to ImageKit
        const uploadedFile = await uploadFile(req.file);

        // 6. Create resume object
        const newResume = {
            name: name.trim(),
            fileName: req.file.originalname,
            url: uploadedFile.url,
            fileId: uploadedFile.fileId,
            isDefault: candidate.resumes.length === 0
        };

        // 7. Save resume in MongoDB
        candidate.resumes.push(newResume);

        await candidate.save();

        return res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            resumes: candidate.resumes
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


// Get all resumes from Backend to display on frontend

async function getAllResumes(req, res) {
    try {
        const candidate = await candidateModel.findOne({
            userId: req.user.id
        }).select("resumes");

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            resumes: candidate.resumes
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Set default resume

async function setDefaultResume(req, res) {
    try {
        const { resumeId } = req.params;

        // Find candidate
        const candidate = await candidateModel.findOne({
            userId: req.user.id
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found"
            });
        }

        // Check whether resume exists
        const resumeExists = candidate.resumes.some(
            resume => resume._id.toString() === resumeId
        );

        if (!resumeExists) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        // Set selected resume as default
        candidate.resumes.forEach(resume => {
            resume.isDefault = resume._id.toString() === resumeId;
        });

        await candidate.save();

        return res.status(200).json({
            success: true,
            message: "Default resume updated successfully",
            resumes: candidate.resumes
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Delete Resume

async function deleteResume(req, res) {
    try {
        const { resumeId } = req.params;

        // 1. Find candidate
        const candidate = await candidateModel.findOne({
            userId: req.user.id
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found"
            });
        }

        // 2. Find the resume
        const resume = candidate.resumes.id(resumeId);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        // 3. Remember whether it was the default
        const wasDefault = resume.isDefault;
        const fileId = resume.fileId;

        // 4. Delete file from ImageKit
        // await deleteFile(resume.fileId);

        // 5. Remove resume from MongoDB
        candidate.resumes.pull(resumeId);

        // 6. If deleted resume was default, select another
        if (wasDefault && candidate.resumes.length > 0) {
            candidate.resumes[0].isDefault = true;
        }

        await candidate.save();

        // Check whether an application uses this file
        const isUsed = await isResumeUsedInApplications(fileId);

        // Delete from ImageKit only if no application uses it
        if (!isUsed) {
            try {
                await deleteFile(fileId);
            } catch (deleteError) {
                console.log("ImageKit deletion failed:", deleteError.message);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully",
            fileRetained: isUsed,
            resumes: candidate.resumes
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Replace Resume: replace the PDF of an existing resume without changing its name or default status.

async function replaceResume(req, res) {
    try {
        const { resumeId } = req.params;

        //  Check whether a new file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a replacement PDF"
            });
        }

        //  Find candidate
        const candidate = await candidateModel.findOne({
            userId: req.user.id
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found"
            });
        }

        //  Find existing resume
        const resume = candidate.resumes.id(resumeId);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        // Preserve the old file ID
        const oldFileId = resume.fileId;

        // Upload new PDF to ImageKit first
        const uploadedFile = await uploadFile(req.file);

        //  Remember old ImageKit file ID
        // const oldFileId = resume.fileId;

        //  Update existing resume details
        resume.fileName = req.file.originalname;
        resume.url = uploadedFile.url;
        resume.fileId = uploadedFile.fileId;

        await candidate.save();

        // Check whether an application uses the old file
        const isUsed = await isResumeUsedInApplications(oldFileId);

        // Delete old file only if no application uses it
        if (!isUsed) {
            try {
                await deleteFile(oldFileId);
            } catch (deleteError) {
                console.log("Old resume deletion failed:", deleteError.message);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Resume replaced successfully",
            oldFileRetained: isUsed,
            resumes: candidate.resumes
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    getCandidateProfile,
    updateCandidateProfile,
    getCandidateProfileByUserId,
    toggleSaveJob,
    getRecentApplications,
    getCandidateDashboardStats,
    getRecommendedJobs,
    uploadResume,
    getAllResumes,
    setDefaultResume,
    deleteResume,
    replaceResume,
}
