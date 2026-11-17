const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const jobController = require('../controllers/job.controllers');

const router = express.Router();

router.post('/create', authMiddleware, jobController.createJob);

router.get("/dashboard", authMiddleware, jobController.getDashboardData);

router.get('/my-jobs', authMiddleware, jobController.getMyJobs);

router.get("/open-jobs", authMiddleware, jobController.getAllOpenJobs); // New route to get all open jobs

router.get('/:id', authMiddleware, jobController.getJobById);


router.put("/:id", authMiddleware, jobController.updateJob);
router.delete("/:id", authMiddleware, jobController.deleteJob);
router.patch("/:id/status", authMiddleware, jobController.toggleJobStatus);



module.exports = router;
