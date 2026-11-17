import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import EditCandidateProfileModal from "../../components/candidate/EditCandidateProfileModal";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import UploadResumeModal from "../../components/candidate/UploadResumeModal";
import ReplaceResumeModal from "../../components/candidate/ReplaceResumeModal";


import {
    MdPerson,
    MdLocationOn,
    MdEdit,
    MdOutlineDescription,
    MdOutlineFileUpload,
    MdAdd,
    MdSchool,
    MdPictureAsPdf,
    MdMoreVert,
    MdStar,
    MdDelete,
    MdSwapHoriz,
} from "react-icons/md";

function CandidateProfile() {

    const { user, candidate, setCandidate } = useOutletContext();
    const [showEditModal, setShowEditModal] = useState(false);


    const [resumes, setResumes] = useState([]);
    const [showResumeModal, setShowResumeModal] = useState(false);

    const [activeMenu, setActiveMenu] = useState(null);

    const [resumeToReplace, setResumeToReplace] = useState(null);

    const fetchResumes = async () => {
        try {
            const response = await axiosInstance.get(
                "/api/candidate/resumes",
                { withCredentials: true }
            );

            setResumes(response.data.resumes || []);

        } catch (error) {
            console.log("Error fetching resumes:", error);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);


    // Handle default resume

    const handleSetDefault = async (resumeId) => {
        try {
            await axiosInstance.put(
                `/api/candidate/resumes/${resumeId}/default`,
                {},
                { withCredentials: true }
            );

            await fetchResumes();
            setActiveMenu(null);

        } catch (error) {
            alert(error.response?.data?.message || "Failed to update default resume");
        }
    };

    // Delete resume

    const handleDeleteResume = async (resumeId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(
                `/api/candidate/resumes/${resumeId}`,
                { withCredentials: true }
            );

            await fetchResumes();
            setActiveMenu(null);

        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete resume");
        }
    };


    return (
        <section>

            {/* Profile Header */}

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-5">

                        {/* Profile Picture Section */}

                        {/* <div className="flex flex-col items-center gap-2">

                            {candidate?.profilePic ? (

                                <img
                                    src={candidate.profilePic}
                                    alt="Candidate"
                                    className="w-24 h-24 rounded-full object-cover"
                                />

                            ) : (

                                <div className="w-24 h-24 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">

                                    <MdPerson size={48} />

                                </div>

                            )}

                            <button
                                type="button"
                                className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline transition"
                            >
                                {candidate?.profilePic
                                    ? "Change profile picture"
                                    : "Upload picture"}
                            </button>

                        </div> */}


                        {/* Candidate Information */}

                        <div>

                            <h1 className="text-2xl font-bold text-gray-800">
                                {user?.name || "Candidate"}
                            </h1>

                            <p className="text-gray-600 mt-1">
                                {candidate?.headline || "Add your professional headline"}
                            </p>

                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">

                                <MdLocationOn size={18} />

                                <span>
                                    {candidate?.location || "Location not added"}
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* Edit Profile Button */}

                    <button
                        onClick={() => setShowEditModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition"
                    >

                        <MdEdit size={18} />

                        Edit Profile

                    </button>

                </div>

            </div>


            {/* About and Resume */}

            <div className="grid grid-cols-3 gap-6 mb-6">

                {/* About */}

                <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-6">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        About
                    </h2>

                    <p className="text-sm text-gray-600 leading-6">

                        {candidate?.bio || "Tell recruiters about yourself."}

                    </p>

                </div>



                {/* Resume */}

                <div className="bg-white border border-gray-200 rounded-xl p-6">

                    <div className="flex items-center gap-2 mb-5">

                        <MdOutlineDescription
                            size={22}
                            className="text-purple-600"
                        />

                        <h2 className="text-lg font-semibold text-gray-800">
                            Resume
                        </h2>

                    </div>

                    {resumes.length === 0 ? (

                        <div>
                            <p className="text-sm text-gray-500 mb-5">
                                No resume uploaded yet.
                            </p>

                            <button
                                onClick={() => setShowResumeModal(true)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition"
                            >
                                <MdOutlineFileUpload size={19} />
                                Upload Resume
                            </button>
                        </div>

                    ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            {resumes.map((resume) => (


                                <div
                                    key={resume._id}
                                    className="relative border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition"
                                >
                                    {/* Three-dot menu */}
                                    <div className="absolute top-2 right-2">

                                        <button
                                            onClick={() =>
                                                setActiveMenu(
                                                    activeMenu === resume._id ? null : resume._id
                                                )
                                            }
                                            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                                        >
                                            <MdMoreVert size={21} />
                                        </button>

                                        {activeMenu === resume._id && (
                                            <div className="absolute right-0 top-8 z-20 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1">

                                                {!resume.isDefault && (
                                                    <button
                                                        onClick={() => handleSetDefault(resume._id)}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50"
                                                    >
                                                        <MdStar size={18} />
                                                        Set as Default
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => {
                                                        setResumeToReplace(resume);
                                                        setActiveMenu(null);
                                                    }}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50"
                                                >
                                                    <MdSwapHoriz size={18} />
                                                    Replace
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteResume(resume._id)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <MdDelete size={18} />
                                                    Delete
                                                </button>

                                            </div>
                                        )}

                                    </div>

                                    {/* Resume information */}
                                    <div className="flex items-start gap-3 pr-5">

                                        <MdPictureAsPdf
                                            size={32}
                                            className="text-purple-600 shrink-0"
                                        />

                                        <div className="min-w-0">
                                            <h3 className="text-sm font-semibold text-gray-800 wrap-break-words">
                                                {resume.name}
                                            </h3>

                                            <p className="text-xs text-gray-500 mt-1 truncate">
                                                {resume.fileName}
                                            </p>

                                            {resume.isDefault && (
                                                <span className="inline-block mt-2 px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-md">
                                                    Default Resume
                                                </span>
                                            )}
                                        </div>

                                    </div>

                                    <a
                                        href={resume.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-sm text-purple-600 font-medium mt-3 hover:underline"
                                    >
                                        View Resume
                                    </a>

                                </div>

                            ))}

                            {resumes.length < 3 && (

                                <button
                                    onClick={() => setShowResumeModal(true)}
                                    className="min-h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-purple-600 hover:border-purple-500 hover:bg-purple-50 transition"
                                >
                                    <MdAdd size={28} />
                                    <span className="text-sm font-medium">
                                        Upload Another Resume
                                    </span>
                                </button>

                            )}

                        </div>

                    )}

                </div>
            </div>





            {/* Skills */}

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold text-gray-800 mb-5">
                    Skills
                </h2>


                {candidate?.skills?.length > 0 ? (

                    <div className="flex flex-wrap gap-3">

                        {candidate.skills.map((skill, index) => (

                            <span
                                key={index}
                                className="px-4 py-2 bg-purple-50 text-purple-600 text-sm font-medium rounded-lg"
                            >
                                {skill}
                            </span>

                        ))}

                    </div>

                ) : (

                    <p className="text-sm text-gray-500">
                        No skills added yet.
                    </p>

                )}

            </div>


            {/* Education */}

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">

                <div className="flex items-center gap-2 mb-5">

                    <MdSchool
                        size={22}
                        className="text-purple-600"
                    />

                    <h2 className="text-lg font-semibold text-gray-800">
                        Education
                    </h2>

                </div>


                <h3 className="font-semibold text-gray-800">
                    {candidate?.collegeName || "College not added"}
                </h3>

                <p className="text-sm text-gray-600 mt-2">

                    {candidate?.degree || "Degree"}

                    {candidate?.branch && (
                        <>
                            {" - "}
                            {candidate.branch}
                        </>
                    )}

                </p>

                <p className="text-sm text-gray-500 mt-2">
                    Graduation Year: {candidate?.graduationYear || "Not added"}
                </p>

            </div>


            {/* Experience */}

            {/* <div className="bg-white border border-gray-200 rounded-xl p-6">

                <div className="flex items-center justify-between mb-5">

                    <h2 className="text-lg font-semibold text-gray-800">
                        Experience
                    </h2>

                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition">

                        <MdAdd size={19} />

                        Add Experience

                    </button>

                </div>


                {candidate?.experience?.length > 0 ? (

                    <div className="space-y-5">

                        {candidate.experience.map((experience, index) => (

                            <div
                                key={experience._id || index}
                                className="border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
                            >

                                <h3 className="font-semibold text-gray-800">
                                    {experience.jobTitle}
                                </h3>

                                <p className="text-sm text-gray-600 mt-1">
                                    {experience.companyName}
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                    {experience.description}
                                </p>

                            </div>

                        ))}

                    </div>

                ) : (

                    <p className="text-sm text-gray-500">
                        No experience added yet.
                    </p>

                )}

            </div> */}

            {showEditModal && (

                <EditCandidateProfileModal
                    candidate={candidate}
                    setCandidate={setCandidate}
                    onClose={() => setShowEditModal(false)}
                />

            )}

            {showResumeModal && (
                <UploadResumeModal
                    onClose={() => setShowResumeModal(false)}
                    onUploaded={fetchResumes}
                />
            )}

            {resumeToReplace && (
                <ReplaceResumeModal
                    resume={resumeToReplace}
                    onClose={() => setResumeToReplace(null)}
                    onReplaced={fetchResumes}
                />
            )}

        </section>
    );
}

export default CandidateProfile; 