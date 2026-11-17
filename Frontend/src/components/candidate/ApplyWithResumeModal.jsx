import React, { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance"
import {
    MdClose,
    MdPictureAsPdf,
    MdCheckCircle,
    MdSend
} from "react-icons/md";

function ApplyWithResumeModal({ onClose, onApply, loading }) {

    const [resumes, setResumes] = useState([]);
    const [selectedResumeId, setSelectedResumeId] = useState("");
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axiosInstance.get(
                    "/api/candidate/resumes",
                    { withCredentials: true }
                );

                const fetchedResumes = response.data.resumes || [];

                setResumes(fetchedResumes);

                // Preselect the default resume
                const defaultResume = fetchedResumes.find(
                    resume => resume.isDefault
                );

                if (defaultResume) {
                    setSelectedResumeId(defaultResume._id);
                } else if (fetchedResumes.length > 0) {
                    setSelectedResumeId(fetchedResumes[0]._id);
                }

            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Unable to fetch your resumes."
                );
            } finally {
                setFetching(false);
            }
        };

        fetchResumes();
    }, []);

    const handleSubmit = () => {
        if (!selectedResumeId) {
            setError("Please select a resume.");
            return;
        }

        onApply(selectedResumeId);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-2">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Select Resume
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <MdClose size={24} />
                    </button>

                </div>

                <p className="text-sm text-gray-500 mb-5">
                    Choose the resume you want to submit with your application.
                </p>

                {/* Loading */}
                {fetching && (
                    <p className="text-sm text-gray-500 py-6 text-center">
                        Loading your resumes...
                    </p>
                )}

                {/* Error */}
                {!fetching && error && resumes.length === 0 && (
                    <p className="text-sm text-red-600 py-4">
                        {error}
                    </p>
                )}

                {/* No resumes */}
                {!fetching && !error && resumes.length === 0 && (
                    <div className="text-center py-6">
                        <MdPictureAsPdf
                            size={42}
                            className="text-gray-400 mx-auto mb-3"
                        />

                        <p className="text-gray-700 font-medium">
                            No resumes uploaded yet.
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                            Please upload a resume from your Candidate Profile before applying.
                        </p>
                    </div>
                )}

                {/* Resume list */}
                {!fetching && resumes.length > 0 && (
                    <div className="space-y-3 max-h-72 overflow-y-auto">

                        {resumes.map((resume) => (

                            <label
                                key={resume._id}
                                className={`flex items-center justify-between gap-3 border rounded-lg p-3 cursor-pointer transition ${
                                    selectedResumeId === resume._id
                                        ? "border-purple-600 bg-purple-50"
                                        : "border-gray-200 hover:border-purple-300"
                                }`}
                            >

                                <div className="flex items-center gap-3 min-w-0">

                                    <MdPictureAsPdf
                                        size={32}
                                        className="text-purple-600 shrink-0"
                                    />

                                    <div className="min-w-0">

                                        <p className="text-sm font-semibold text-gray-800 wrap-break-words">
                                            {resume.name}
                                        </p>

                                        <p className="text-xs text-gray-500 truncate mt-1">
                                            {resume.fileName}
                                        </p>

                                        {resume.isDefault && (
                                            <span className="inline-block text-xs text-purple-600 mt-1">
                                                Default Resume
                                            </span>
                                        )}

                                        <a
                                            href={resume.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="block text-xs text-purple-600 hover:underline mt-1"
                                        >
                                            Preview PDF
                                        </a>

                                    </div>

                                </div>

                                <input
                                    type="radio"
                                    name="selectedResume"
                                    value={resume._id}
                                    checked={selectedResumeId === resume._id}
                                    onChange={() => setSelectedResumeId(resume._id)}
                                    className="w-4 h-4 accent-purple-600 shrink-0"
                                />

                            </label>

                        ))}

                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    {resumes.length > 0 && !fetching && (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading || !selectedResumeId}
                            className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:opacity-60"
                        >
                            <MdSend size={18} />
                            {loading ? "Applying..." : "Submit Application"}
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}

export default ApplyWithResumeModal;
