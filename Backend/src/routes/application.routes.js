const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const applicationController = require("../controllers/application.controllers");

const router = express.Router();

router.post("/apply/:jobId", authMiddleware, applicationController.applyForJob);

router.get("/has-applied/:jobId", authMiddleware, applicationController.hasApplied);

router.get("/my", authMiddleware, applicationController.getMyApplications);

router.get("/job/:jobId", authMiddleware, applicationController.getApplicantsByJob);

router.put("/:applicationId/status", authMiddleware, applicationController.updateApplicationStatus);


module.exports = router;