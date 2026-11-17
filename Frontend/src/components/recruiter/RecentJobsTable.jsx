import {
    FaEdit,
    FaTrash,
    FaEye,
} from "react-icons/fa";


import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance"


const RecentJobsTable = ({ jobs }) => {

    const navigate = useNavigate();
    const [showAll, setShowAll] = useState(false);

    const handleDelete = async (jobId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {

            await axiosInstance.delete(

                `/api/jobs/${jobId}`,

                {
                    withCredentials: true,
                }

            );

            alert("Job deleted successfully!");

            window.location.reload();

        } catch (error) {

            console.log(error);

        }

    };


    const displayedJobs = showAll ? jobs : jobs.slice(0, 3);

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            {/* Heading */}

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-semibold text-gray-800">
                    Recent Jobs
                </h2>

                <button
                    onClick={() => setShowAll(!showAll)}
                    className="
        bg-blue-600
        text-white
        px-5
        py-2
        rounded-lg
        hover:bg-blue-700
        transition
    "
                >
                    {showAll ? "Show Less" : "View All"}
                </button>

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

                <table className="w-full text-left table-fixed">

                    <thead>

                        <tr className="border-b">

                            <th className="w-1/3 py-4">Job Title</th>

                            <th className="w-1/6">Type</th>

                            <th className="w-1/6">Location</th>

                            <th className="w-1/6">Applicants</th>

                            <th className="w-1/6">Status</th>

                            <th className="w-1/6 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {displayedJobs.map((job) => (

                            <tr
                                key={job._id}
                                className="border-b hover:bg-gray-50 transition"
                            >

                                <td className="py-5 font-medium">
                                    <div
                                        className="truncate"
                                        title={job.jobTitle}
                                    >
                                        {job.jobTitle}
                                    </div>
                                </td>

                                <td>
                                    <div
                                        className="truncate"
                                        title={job.employmentType}
                                    >
                                        {job.employmentType}
                                    </div>
                                </td>

                                <td>
                                    <div
                                        className="truncate"
                                        title={job.location}
                                    >
                                        {job.location}
                                    </div>
                                </td>

                                <td>
                                    {job.applicants.length}
                                </td>

                                <td>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
                    ${job.status === "Open"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >

                                        {job.status}

                                    </span>

                                </td>

                                <td>

                                    <div className="flex justify-center gap-4">

                                        <button
                                            onClick={() => navigate(`/my-jobs/${job._id}`)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FaEye />
                                        </button>

                                        <button
                                            onClick={() => navigate(`/edit-job/${job._id}`)}
                                            className="text-yellow-500 hover:text-yellow-700"
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(job._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default RecentJobsTable;