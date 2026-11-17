import React, { useState } from "react";
import EmailModal from "./EmailModal";
// import axios from "axios";

import axiosInstance from "../../../utils/axiosInstance"

import {
    MdPerson,
    MdSchool,
    MdLocationOn,
    MdDescription,
    MdEmail,
    MdCheckCircle,
} from "react-icons/md";

function ApplicantCard({ application, navigate, setApplications }) {

    const candidate = application.candidateId;
    const user = candidate.userId;
    const [loading, setLoading] = useState(false);

    console.log("application: ", application);

    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    const statusColors = {
        "Applied": "bg-green-100 text-green-700",
        "Under Review": "bg-yellow-100 text-yellow-700",
        "Shortlisted": "bg-blue-100 text-blue-700",
        "Interview Scheduled": "bg-purple-100 text-purple-700",
        "Accepted": "bg-emerald-100 text-emerald-700",
        "Rejected": "bg-red-100 text-red-700",
    };


    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setLoading(true);
        try {
            const res = await axiosInstance.put(
                `/api/applications/${application._id}/status`,
                {
                    status: newStatus,
                },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {

                setApplications((prevApplications) =>
                    prevApplications.map((app) =>
                        app._id === application._id
                            ? { ...app, status: newStatus }
                            : app
                    )
                );

            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };




    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-6">

            {/* Top Section */}

            <div className="flex justify-between items-start">

                <div className="flex gap-5">

                    {candidate.profilePic ? (

                        <img
                            src={candidate.profilePic}
                            alt={user.name}
                            className="w-20 h-20 rounded-full object-cover border"
                        />

                    ) : (

                        <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">

                            <MdPerson
                                size={40}
                                className="text-purple-600"
                            />

                        </div>

                    )}

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">

                            {user.name}

                        </h2>

                        <div className="flex items-center gap-2 text-gray-500 mt-1">

                            <MdEmail size={18} />

                            {user.email}

                        </div>

                        <div className="flex items-center gap-2 text-gray-600 mt-3">

                            <MdSchool size={18} />

                            <span>

                                {candidate.degree} • {candidate.branch}

                            </span>

                        </div>

                        <div className="flex items-center gap-2 text-gray-600 mt-2">

                            <MdLocationOn size={18} />

                            {candidate.location}

                        </div>

                    </div>

                </div>

                <span
                    className={`px-3 py-1 rounded-md text-sm font-medium ${statusColors[application.status]}`}
                >
                    {application.status}
                </span>

            </div>


            {/* Skills */}

            <div className="mt-6">

                <h3 className="text-sm font-semibold text-gray-700 mb-3">

                    Skills

                </h3>

                <div className="flex flex-wrap gap-2">

                    {candidate.skills.length > 0 ? (

                        candidate.skills.map((skill, index) => (

                            <span
                                key={index}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm"
                            >

                                {skill}

                            </span>

                        ))

                    ) : (

                        <span className="text-gray-500 text-sm">

                            No skills added

                        </span>

                    )}

                </div>

            </div>


            {/* About */}

            {candidate.bio && (

                <div className="mt-6">

                    <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-2">

                        <MdDescription />

                        About

                    </h3>

                    <p className="text-gray-600 leading-7">

                        {candidate.bio}

                    </p>

                </div>

            )}


            {/* Bottom Buttons */}

            <div className="flex justify-between items-center mt-8">

                <div className="flex gap-3">

                    {application.resume?.url ? (
                        <a
                            href={application.resume.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            View Resume
                        </a>
                    ) : (
                        <button
                            disabled
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed"
                        >
                            No Resume
                        </button>
                    )}

                    <button
                        onClick={() => setIsEmailModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Mail Me
                    </button>

                    <button
                        onClick={() =>
                            navigate(`/recruiter/candidate/${application.candidateId.userId._id}`)
                        }
                        className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
                    >
                        View Profile
                    </button>

                </div>


                <div className="flex items-center gap-3">

                    <select
                        defaultValue={application.status}
                        onChange={handleStatusChange}
                        disabled={loading}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="Applied">Applied</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>

                </div>

            </div>


            <EmailModal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                candidate={{
                    name: user.name,
                    email: user.email,
                }}
                job={{
                    jobTitle: application.jobId.jobTitle,
                    companyName: application.jobId.companyId.companyName,
                }}

            />
        </div>

    );

}

export default ApplicantCard;