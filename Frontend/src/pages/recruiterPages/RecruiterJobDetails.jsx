import RecruiterLayout from "../../layouts/RecruiterLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

import {
    MdArrowBack,
} from "react-icons/md";

const RecruiterJobDetails = () => {

    const navigate = useNavigate();
    const { jobId } = useParams();

    const [job, setJob] = useState(null);

    useEffect(() => {

        fetchJob();

    }, []);

    const fetchJob = async () => {

        const response = await axiosInstance.get(

            `/api/jobs/${jobId}`,

            {
                withCredentials: true,
            }

        );

        setJob(response.data.job);

    };


    const toggleStatus = async () => {

        try {

            const response = await axiosInstance.patch(

                `/api/jobs/${jobId}/status`,

                {},

                {

                    withCredentials: true,

                }

            );

            setJob((prev) => ({

                ...prev,

                status: response.data.status,

            }));

        }

        catch (error) {

            console.log(error);

        }

    };


    if (!job) {
        return (
            <RecruiterLayout>
                <div className="flex justify-center items-center h-full">
                    <h2 className="text-2xl font-semibold text-gray-600">
                        Loading...
                    </h2>
                </div>
            </RecruiterLayout>
        );
    }

    return (
        <RecruiterLayout>

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-black-600 hover:text-blue-700 cursor-pointer font-medium mb-6 transition"
            >
                <MdArrowBack size={22} />
                Back
            </button>

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">

                    <div className="flex justify-between items-start">

                        <div>

                            <h1 className="text-4xl font-bold text-gray-800">
                                {job.jobTitle}
                            </h1>

                            <p className="text-lg text-gray-500 mt-2">
                                {job.companyId.companyName}
                            </p>

                        </div>

                        <button
                            onClick={toggleStatus}
                            className={`px-4 py-2 rounded-full font-semibold transition cursor-pointer ${job.status === "Open"
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                                }`}
                        >
                            {job.status}
                        </button>

                    </div>

                </div>

                {/* Job Information */}

                <div className="bg-white rounded-xl shadow-md mt-8 p-8">

                    <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
                        Job Information
                    </h2>

                    <div className="space-y-6">

                        <div>
                            <h3 className="font-semibold text-gray-500 mb-2">
                                Job Description
                            </h3>

                            <p className="leading-8 text-gray-700 whitespace-pre-line">
                                {job.jobDescription}
                            </p>

                        </div>

                        <div>

                            <h3 className="font-semibold text-gray-500 mb-3">
                                Skills Required
                            </h3>

                            <div className="flex flex-wrap gap-3">

                                {job.skills.map((skill, index) => (

                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
                                    >
                                        {skill}
                                    </span>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

                {/* Employment Details */}

                <div className="bg-white rounded-xl shadow-md mt-8 p-8">

                    <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
                        Employment Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">

                        <div>
                            <p className="text-gray-500">Experience</p>
                            <p className="font-semibold text-lg">{job.experience}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Employment Type</p>
                            <p className="font-semibold text-lg">{job.employmentType}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Work Mode</p>
                            <p className="font-semibold text-lg">{job.workMode}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Location</p>
                            <p className="font-semibold text-lg">{job.location}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Salary</p>
                            <p className="font-semibold text-lg">{job.salary}</p>
                        </div>

                    </div>

                </div>

                {/* Application Details */}

                <div className="bg-white rounded-xl shadow-md mt-8 p-8">

                    <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
                        Application Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">

                        <div>
                            <p className="text-gray-500">Openings</p>
                            <p className="font-semibold text-lg">
                                {job.openings}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Applicants</p>
                            <p className="font-semibold text-lg">
                                {job.applicants.length}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Last Date to Apply</p>
                            <p className="font-semibold text-lg">
                                {new Date(job.lastDateToApply).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Posted On</p>
                            <p className="font-semibold text-lg">
                                {new Date(job.createdAt).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Buttons */}

                <div className="flex justify-end gap-4 mt-8 mb-8">

                    <button
                        onClick={() => navigate(`/edit-job/${jobId}`)}

                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        Edit Job
                    </button>

                    <button
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        Delete Job
                    </button>

                </div>

            </div>
        </RecruiterLayout>
    );

};

export default RecruiterJobDetails;