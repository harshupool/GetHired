import React, { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

import {
    MdBusiness,
    MdLocationOn,
    MdWork,
    MdCalendarToday,
    MdCheckCircle,
} from "react-icons/md";

function MyApplications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchApplications = async () => {

            try {

                const response = await axiosInstance.get(
                    "/api/applications/my",
                    {
                        withCredentials: true,
                    }
                );

                setApplications(response.data.applications);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchApplications();

    }, []);

    const getStatusColor = (status) => {

        switch (status) {

            case "Applied":
                return "bg-blue-100 text-blue-700";

            case "Under Review":
                return "bg-yellow-100 text-yellow-800";

            case "Shortlisted":
                return "bg-green-100 text-green-800";

            case "Interview Scheduled":
                return "bg-purple-100 text-purple-800";

            case "Accepted":
                return "bg-emerald-100 text-emerald-800";

            case "Rejected":
                return "bg-red-100 text-red-800";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[60vh]">

                <p className="text-gray-500">
                    Loading applications...
                </p>

            </div>

        );

    }

    return (

        <section>

            <div className="mb-8">

                <h1 className="text-2xl font-bold text-gray-800">
                    My Applications
                </h1>

                <p className="text-gray-500 mt-1">
                    Track all the jobs you've applied for.
                </p>

            </div>

            {applications.length === 0 ? (

                <div className="bg-white border rounded-xl p-10 text-center">

                    <MdBusiness
                        size={50}
                        className="mx-auto text-gray-300"
                    />

                    <h2 className="text-xl font-semibold mt-4">
                        No Applications Yet
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Start applying to jobs to see them here.
                    </p>

                </div>

            ) : (

                <div className="grid gap-5">

                   {applications.map((application) => {

    // Handle deleted or unavailable jobs
    if (!application.jobId) {
        return (
            <div
                key={application._id}
                className="bg-white rounded-xl p-6 border"
            >
                <h2 className="text-lg font-semibold text-gray-700">
                    Job No Longer Available
                </h2>

                <p className="text-gray-500 mt-2">
                    The job associated with this application may have
                    been deleted.
                </p>

                <p className="text-gray-500 mt-2">
                    Applied on:{" "}
                    {new Date(application.appliedAt).toLocaleDateString("en-IN")}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                    Status: {application.status}
                </p>
            </div>
        );
    }

    return (
        
             <div
                            key={application._id}
                            className="bg-white  rounded-xl p-6 hover:shadow-md transition"
                        >

                            <div className="flex justify-between">

                                <div className="flex gap-4">

                                    {application.jobId.companyId.logo ? (

                                        <img
                                            src={application.jobId.companyId.logo}
                                            alt=""
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />

                                    ) : (

                                        <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center">

                                            <MdBusiness
                                                size={30}
                                                className="text-purple-600"
                                            />

                                        </div>

                                    )}

                                    <div>

                                        <h2 className="text-xl font-semibold text-gray-800">

                                            {application.jobId.jobTitle}

                                        </h2>

                                        <p className="text-gray-500">

                                            {application.jobId.companyId.companyName}

                                        </p>

                                    </div>

                                </div>

                                {
                                    application.status === "Applied" ? (

                                        <button
                                            disabled
                                            className="flex items-center gap-1.5 px-4 py-1 my-2 bg-green-600 text-white text-sm font-medium rounded-md cursor-not-allowed"
                                        >
                                            <MdCheckCircle size={15} />
                                            Applied
                                        </button>

                                    ) : (

                                        <span
                                            className={`flex items-center px-4 py-1 my-2 gap-1.5  text-sm font-medium rounded-md cursor-not-allowed ${getStatusColor(application.status)}`}
                                        >
                                            {application.status}
                                        </span>

                                    )
                                }

                            </div>


                            <div className="flex gap-8 mt-6 text-gray-600">

                                <div className="flex items-center gap-2">

                                    <MdLocationOn />

                                    {application.jobId.location}

                                </div>

                                <div className="flex items-center gap-2">

                                    <MdWork />

                                    {application.jobId.employmentType}

                                </div>

                                <div className="flex items-center gap-2">

                                    <MdCalendarToday />

                                    {new Date(application.appliedAt).toLocaleDateString("en-IN")}

                                </div>

                            </div>


                            <div className="mt-6">

                                <button
                                    onClick={() =>
                                        navigate(`/candidate/jobs/${application.jobId._id}`)
                                    }
                                    className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                >
                                    View Job
                                </button>

                            </div>

                        </div>

       
    );

})}

                </div>

            )}

        </section>

    );

}

export default MyApplications;