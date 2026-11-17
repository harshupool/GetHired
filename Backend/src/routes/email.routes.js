const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { sendEmail } = require("../controllers/email.controller");



router.post("/send", authMiddleware, sendEmail);





module.exports = router;