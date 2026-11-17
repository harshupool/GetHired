const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');
const companyController = require('../controllers/company.controllers');


const createUploadMiddleware = require("../middlewares/multer.middleware");

const uploadImage = createUploadMiddleware({
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxSizeMB: 2,
});


const router = express.Router();


router.get('/profile', authMiddleware, companyController.getCompanyProfile);
router.put('/update', authMiddleware, uploadImage.single("logo"), companyController.updateCompanyProfile);





module.exports = router;