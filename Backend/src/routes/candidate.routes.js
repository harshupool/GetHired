const express = require("express");
const candidateController = require("../controllers/candidate.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const createUploadMiddleware = require("../middlewares/multer.middleware");

const uploadResumeMiddleware = createUploadMiddleware({
    allowedMimeTypes: ["application/pdf"],
    maxSizeMB: 5
});


const router = express.Router();



router.get("/profile", candidateController.getCandidateProfile);

router.get("/profile/:userId", candidateController.getCandidateProfileByUserId);

router.put("/profile", candidateController.updateCandidateProfile);

router.post("/toggle-save-job/:jobId", authMiddleware, candidateController.toggleSaveJob);

router.get("/recent-applications", authMiddleware, candidateController.getRecentApplications);

router.get("/dashboard-stats", authMiddleware, candidateController.getCandidateDashboardStats);

router.get("/recommended-jobs", authMiddleware, candidateController.getRecommendedJobs);

router.post("/upload-resume", authMiddleware, uploadResumeMiddleware.single("resume"), candidateController.uploadResume);

router.get("/resumes", authMiddleware, candidateController.getAllResumes);

router.put("/resumes/:resumeId/default", authMiddleware, candidateController.setDefaultResume);

router.delete("/resumes/:resumeId", authMiddleware, candidateController.deleteResume);

router.put("/resumes/:resumeId", authMiddleware, uploadResumeMiddleware.single("resume"), candidateController.replaceResume);




module.exports = router;