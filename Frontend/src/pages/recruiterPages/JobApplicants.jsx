import React, { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

import RecruiterLayout from "../../layouts/RecruiterLayout";
import ApplicantCard from "../../components/recruiter/myjobs/ApplicantCard";

import {
    MdArrowBack,
    MdBusinessCenter,
} from "react-icons/md";

function JobApplicants() {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchApplicants = async () => {

            try {

                const response = await axiosInstance.get(
                    `/api/applications/job/${jobId}`,
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

        fetchApplicants();

    }, [jobId]);

    return (

        <RecruiterLayout>

            {/* Back Button */}

            <button
                onClick={() => navigate("/my-jobs")}
                className="flex items-center gap-2 text-black hover:text-blue-600 cursor-pointer font-medium mb-6"
            >

                <MdArrowBack size={22} />

                Back to My Jobs

            </button>


            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">

                    Job Applicants

                </h1>

                <p className="text-gray-500 mt-2">

                    Manage candidates who applied for this position.

                </p>

            </div>


            {/* Total Applicants */}

            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">

                        <MdBusinessCenter
                            size={24}
                            className="text-purple-600"
                        />

                    </div>

                    <div>

                        <p className="text-gray-500 text-sm">

                            Total Applicants

                        </p>

                        <h2 className="text-2xl font-bold text-gray-800">

                            {applications.length}

                        </h2>

                    </div>

                </div>

            </div>


            {/* Loading */}

            {loading && (

                <div className="bg-white rounded-xl p-10 text-center">

                    <p className="text-gray-500">

                        Loading applicants...

                    </p>

                </div>

            )}


            {/* Empty State */}

            {!loading && applications.length === 0 && (

                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">

                    <MdBusinessCenter
                        size={60}
                        className="mx-auto text-gray-300"
                    />

                    <h2 className="text-2xl font-semibold mt-5 text-gray-800">

                        No Applicants Yet

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Once candidates apply for this job, they'll appear here.

                    </p>

                </div>

            )}


            {/* Applicant Cards */}

            <div className="space-y-6">

                {applications.map((application) => (

                    <ApplicantCard
                        key={application._id}
                        application={application}
                        navigate={navigate}
                        setApplications={setApplications}
                    />

                ))}

            </div>

        </RecruiterLayout>

    );

}

export default JobApplicants;