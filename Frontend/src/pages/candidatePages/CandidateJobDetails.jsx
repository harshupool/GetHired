import React, { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

import { MdArrowBack } from "react-icons/md";

import JobSummaryCard from "../../components/candidate/JobSummaryCard";
import JobDescriptionCard from "../../components/candidate/JobDescriptionCard";
import JobSkillsCard from "../../components/candidate/JobSkillsCard";
import CompanyInfoCard from "../../components/candidate/CompanyInfoCard";

function CandidateJobDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applied, setApplied] = useState(false);

    useEffect(() => {

        const fetchJob = async () => {

            try {

                const response = await axiosInstance.get(
                    `/api/jobs/${id}`,
                    {
                        withCredentials: true,
                    }
                );

                setJob(response.data.job);
                const appliedResponse = await axiosInstance.get(
                    `/api/applications/has-applied/${id}`,
                    {
                        withCredentials: true,
                    }
                );

                setApplied(appliedResponse.data.applied);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchJob();

    }, [id]);



    if (loading) {

        return (

            <div className="flex items-center justify-center min-h-[70vh]">

                <p className="text-gray-500 text-lg">
                    Loading job details...
                </p>

            </div>

        );

    }


    if (!job) {

        return (

            <div className="flex flex-col items-center justify-center min-h-[70vh]">

                <h2 className="text-2xl font-semibold text-gray-800">
                    Job Not Found
                </h2>

                <p className="text-gray-500 mt-2">
                    This job may have been removed.
                </p>

                <button
                    onClick={() => navigate("/candidate/jobs")}
                    className="mt-6 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                    Back to Jobs
                </button>

            </div>

        );

    }



    return (

        <section className="space-y-6">

            {/* Back Button */}

            <button
                onClick={() => navigate("/candidate/jobs")}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition"
            >

                <MdArrowBack size={22} />

                Back to Jobs

            </button>


            {/* Job Summary */}

            <JobSummaryCard
                job={job}
                applied={applied}
                setApplied={setApplied} />


            {/* Job Description */}

            <JobDescriptionCard job={job} />


            {/* Skills */}

            <JobSkillsCard job={job} />


            {/* Company */}

            <CompanyInfoCard company={job.companyId} />

        </section>

    );

}

export default CandidateJobDetails;