
const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Upload file to ImageKit
async function uploadFile(file) {
    try {
        const result = await imagekit.files.upload({
            file: file.buffer.toString("base64"),
            fileName: `${Date.now()}-${file.originalname}`,
        });

        return result;

    } catch (error) {
        throw new Error("File upload failed: " + error.message);
    }
}

// Delete file from ImageKit
async function deleteFile(fileId) {
    try {
        await imagekit.files.delete(fileId);

        return true;

    } catch (error) {
        throw new Error("File deletion failed: " + error.message);
    }
}

module.exports = {
    uploadFile,
    deleteFile
};
