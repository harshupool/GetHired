const multer = require("multer");

const storage = multer.memoryStorage();

const createUploadMiddleware = ({ allowedMimeTypes, maxSizeMB }) => {
    return multer({
        storage: storage,

        limits: {
            fileSize: maxSizeMB * 1024 * 1024,
            files: 1,
        },

        fileFilter: (req, file, cb) => {
            if (!allowedMimeTypes.includes(file.mimetype)) {
                return cb(new Error("Invalid file type"));
            }

            cb(null, true);
        },
    });
};

module.exports = createUploadMiddleware;