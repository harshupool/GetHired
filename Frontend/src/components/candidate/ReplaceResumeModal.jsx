import React, { useState } from "react";
// import axios from "axios";

import axiosInstance from "../../utils/axiosInstance";
import {
    MdClose,
    MdPictureAsPdf,
    MdOutlineFileUpload
} from "react-icons/md";

function ReplaceResumeModal({ resume, onClose, onReplaced }) {

    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleReplace = async (e) => {
        e.preventDefault();

        if (!resumeFile) {
            setError("Please select a PDF file.");
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
            formData.append("resume", resumeFile);

            await axiosInstance.put(
                `/api/candidate/resumes/${resume._id}`,
                formData,
                { withCredentials: true }
            );

            await onReplaced();
            onClose();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to replace resume."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

                <div className="flex items-center justify-between mb-5">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Replace Resume
                    </h2>

                    <button onClick={onClose} type="button">
                        <MdClose size={24} className="text-gray-500" />
                    </button>

                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Replacing <strong>{resume.name}</strong>
                </p>

                <form onSubmit={handleReplace}>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select New PDF
                    </label>

                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-purple-500 transition">

                        <MdPictureAsPdf
                            size={38}
                            className="text-purple-600 mb-2"
                        />

                        <span className="text-sm text-gray-600 text-center">
                            {resumeFile
                                ? resumeFile.name
                                : "Click to select a PDF"}
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
                            {loading ? "Replacing..." : "Replace Resume"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default ReplaceResumeModal;
