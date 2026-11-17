const express = require('express')
const upload = require('../middlewares/multer.middleware')
const authController = require('../controllers/auth.controllers')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router();


router.post('/register', authController.registerUser);
router.post('/candidate-register', authController.candidateinfo)
router.post('/recruiter-register', authController.recruiterinfo)
router.post('/login', authController.login)
router.post("/logout", authController.logout);


router.get('/me', authMiddleware, authController.getCurrentUser)





module.exports = router;