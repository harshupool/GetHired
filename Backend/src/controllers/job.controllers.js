const jobModel = require('../models/job.model');
const Company = require('../models/company.model');
const candidateModel = require('../models/candidate.model');


const createJob = async (req, res) => {

    try {

        const recruiterId = req.user.id;

        const company = await Company.findOne({
            recruiterId,
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        const {
            jobTitle,
            jobDescription,
            skills,
            experience,
            salary,
            location,
            employmentType,
            workMode,
            openings,
            lastDateToApply,
        } = req.body;

        const newJob = await jobModel.create({
            recruiterId,
            companyId: company._id,

            jobTitle,
            jobDescription,
            skills,
            experience,
            salary,
            location,
            employmentType,
            workMode,
            openings,
            lastDateToApply,
        });

        res.status(201).json({
            success: true,
            message: "Job Created Successfully",
            job: newJob,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

}


const getMyJobs = async (req, res) => {
    try {

        const recruiterId = req.user.id;

        const jobs = await jobModel
            .find({ recruiterId })
            .populate("companyId", "companyName logo")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            jobs,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};


const getJobById = async (req, res) => {

    try {

        const job = await jobModel
            .findById(req.params.id)
            .populate("companyId",
                "companyName logo companyWebsite location companyDescription");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        res.status(200).json({
            success: true,
            job,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }


}


const updateJob = async (req, res) => {

    try {

        const recruiterId = req.user.id;

        const job = await jobModel.findOne({
            _id: req.params.id,
            recruiterId,
        });

        if (!job) {

            return res.status(404).json({
                success: false,
                message: "Job not found",
            });

        }

        const updatedJob = await jobModel.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true,
            }

        );

        res.status(200).json({

            success: true,
            message: "Job updated successfully",

            job: updatedJob,

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};


const deleteJob = async (req, res) => {

    try {

        const recruiterId = req.user.id;

        const job = await jobModel.findOne({
            _id: req.params.id,
            recruiterId,
        });

        if (!job) {

            return res.status(404).json({
                success: false,
                message: "Job not found",
            });

        }

        await jobModel.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,
            message: "Job deleted successfully",

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error",

        });

    }

};



const toggleJobStatus = async (req, res) => {

    try {

        const recruiterId = req.user.id;

        const job = await jobModel.findOne({
            _id: req.params.id,
            recruiterId,
        });

        if (!job) {

            return res.status(404).json({
                success: false,
                message: "Job not found",
            });

        }

        job.status = job.status === "Open" ? "Closed" : "Open";

        await job.save();

        res.status(200).json({

            success: true,
            message: "Job status updated",

            status: job.status,

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error",

        });

    }

};

const getDashboardData = async (req, res) => {

    try {

        const recruiterId = req.user.id;

        const jobs = await jobModel
            .find({ recruiterId })
            .sort({ createdAt: -1 });

        const totalJobs = jobs.length;

        const activeJobs = jobs.filter(
            job => job.status === "Open"
        ).length;

        const closedJobs = jobs.filter(
            job => job.status === "Closed"
        ).length;

        let totalApplications = 0;

        jobs.forEach(job => {
            totalApplications += job.applicants.length;
        });

        const recentJobs = jobs.slice(0, 5);

        res.status(200).json({

            success: true,

            dashboard: {

                totalJobs,
                activeJobs,
                closedJobs,
                totalApplications,
                recentJobs,

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};


async function getAllOpenJobs(req, res) {

    try {

        const candidate = await candidateModel.findOne({
            userId: req.user.id,
        });

        const jobs = await jobModel
            .find({
                status: "Open",
                isActive: true,
                lastDateToApply: {
                    $gte: new Date()
                }
            })
            .populate("companyId")
            .sort({
                createdAt: -1
            });

        const jobsWithSavedStatus = jobs.map((job) => {

            const isSaved = candidate?.savedJobs?.some(
                (savedJobId) =>
                    savedJobId.toString() === job._id.toString()
            );

            return {
                ...job.toObject(),
                isSaved,
            };

        });

        return res.status(200).json({
            message: "Open jobs fetched successfully",
            jobs: jobsWithSavedStatus,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

module.exports = {
    createJob,
    getMyJobs,
    getJobById,
    updateJob,
    deleteJob,
    toggleJobStatus,
    getDashboardData,
    getAllOpenJobs,
}
