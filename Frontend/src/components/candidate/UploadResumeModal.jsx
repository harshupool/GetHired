import React, { useState } from "react";
// import axios from "axios";

import axiosInstance from "../../utils/axiosInstance";

import { MdClose, MdOutlineFileUpload, MdPictureAsPdf } from "react-icons/md";

function UploadResumeModal({ onClose, onUploaded }) {

    const [resumeName, setResumeName] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!resumeName.trim() || !resumeFile) {
            setError("Please provide a name and select a PDF.");
            return;
        }

        if (resumeFile.type !== "application/pdf") {
            setError("Only PDF files are allowed.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("name", resumeName.trim());
            formData.append("resume", resumeFile);

            await axiosInstance.post(
                "/api/candidate/upload-resume",
                formData,
                { withCredentials: true }
            );

            await onUploaded();
            onClose();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to upload resume. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Upload Resume
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <MdClose size={24} />
                    </button>
                </div>

                <form onSubmit={handleUpload}>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resume Name
                    </label>

                    <input
                        type="text"
                        value={resumeName}
                        onChange={(e) => setResumeName(e.target.value)}
                        placeholder="e.g. Frontend Developer Resume"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select PDF
                    </label>

                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-purple-500 transition">

                        <MdPictureAsPdf size={38} className="text-purple-600 mb-2" />

                        <span className="text-sm text-gray-600 text-center">
                            {resumeFile
                                ? resumeFile.name
                                : "Click to select your resume PDF"}
                        </span>

                        <span className="text-xs text-gray-400 mt-2">
                            Maximum file size: 5 MB
                        </span>

                        <input
                            type="file"
                            accept="application/pdf,.pdf"
                            className="hidden"
                            onChange={(e) => {
                                setResumeFile(e.target.files[0] || null);
                                setError("");
                            }}
                        />

                    </label>

                    {error && (
                        <p className="text-sm text-red-600 mt-3">
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 mt-6">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:opacity-60"
                        >
                            <MdOutlineFileUpload size={18} />
                            {loading ? "Uploading..." : "Upload Resume"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default UploadResumeModal;
