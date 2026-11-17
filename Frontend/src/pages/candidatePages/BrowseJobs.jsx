import React, { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    MdOutlineSearch,
    MdOutlineLocationOn,
    MdOutlineWork,
    MdOutlineBookmarkBorder,
    MdBusiness,
    MdOutlineLaptop,
    MdOutlineCalendarToday,
    MdBookmark,
} from "react-icons/md";


function BrowseJobs() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchJobs = async () => {

            try {

                const response = await axiosInstance.get(
                    "/api/jobs/open-jobs",
                    {
                        withCredentials: true
                    }
                );

                setJobs(response.data.jobs);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };


        fetchJobs();

    }, []);


    const handleSaveJob = async (jobId) => {

        try {

            const res = await axiosInstance.post(
                `/api/candidate/toggle-save-job/${jobId}`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {

                setJobs((prevJobs) =>
                    prevJobs.map((job) =>
                        job._id === jobId
                            ? {
                                ...job,
                                isSaved: res.data.saved,
                            }
                            : job
                    )
                );
                
                // toast.success(res.data.message);



            }

        } catch (error) {

            console.log(error);

            toast.error("Something went wrong");

        }

    };


    if (loading) {

        return (
            <div className="flex items-center justify-center min-h-[60vh]">

                <p className="text-gray-500">
                    Loading jobs...
                </p>

            </div>
        );

    }


    return (
        <section>

            {/* Page Header */}

            <div className="mb-8">

                <h1 className="text-2xl font-bold text-gray-800">
                    Browse Jobs
                </h1>

                <p className="text-gray-500 mt-1">
                    Find jobs that match your skills and interests.
                </p>

            </div>


            {/* Search Section */}

            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">

                <div className="grid grid-cols-3 gap-4">

                    <div className="relative">

                        <MdOutlineSearch
                            size={21}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search by job title or keyword"
                            className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 text-sm outline-none focus:border-purple-600"
                        />

                    </div>


                    <div className="relative">

                        <MdOutlineLocationOn
                            size={21}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Location"
                            className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 text-sm outline-none focus:border-purple-600"
                        />

                    </div>


                    <select
                        className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm text-gray-600 outline-none focus:border-purple-600"
                    >

                        <option value="">
                            All Employment Types
                        </option>

                        <option value="Full Time">
                            Full Time
                        </option>

                        <option value="Part Time">
                            Part Time
                        </option>

                        <option value="Internship">
                            Internship
                        </option>

                        <option value="Contract">
                            Contract
                        </option>

                    </select>

                </div>

            </div>


            {/* Job Count */}

            <div className="mb-5">

                <p className="text-sm text-gray-600">

                    <span className="font-semibold text-gray-800">
                        {jobs.length}
                    </span>

                    {" "}jobs found

                </p>

            </div>


            {/* Jobs */}

            {jobs.length > 0 ? (

                <div className="grid grid-cols-2 gap-5">

                    {jobs.map((job) => (

                        <div
                            key={job._id}
                            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                        >

                            {/* Header */}

                            <div className="flex items-start justify-between">

                                <div className="flex items-center gap-4 min-w-0">

                                    {job.companyId?.logo ? (

                                        <img
                                            src={job.companyId.logo}
                                            alt={job.companyId.companyName}
                                            className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                                        />

                                    ) : (

                                        <div className="w-14 h-14 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">

                                            <MdBusiness size={28} />

                                        </div>

                                    )}


                                    <div className="min-w-0">

                                        <h2
                                            className="font-semibold text-gray-800 text-lg truncate"
                                            title={job.jobTitle}
                                        >
                                            {job.jobTitle}
                                        </h2>

                                        <p
                                            className="text-sm text-gray-500 mt-1 truncate"
                                            title={job.companyId?.companyName}
                                        >
                                            {job.companyId?.companyName || "Company"}
                                        </p>

                                    </div>

                                </div>


                                <button
                                    onClick={() => handleSaveJob(job._id)}
                                    type="button"
                                    className="text-gray-400 hover:text-purple-600 transition shrink-0"
                                >

                                    {job.isSaved ? (
                                        <MdBookmark size={23} />
                                    ) : (
                                        <MdOutlineBookmarkBorder size={23} />
                                    )}

                                </button>

                            </div>


                            {/* Job Details */}

                            <div className="flex items-center gap-5 mt-5 text-sm text-gray-500">

                                <div className="flex items-center gap-1.5 min-w-0">

                                    <MdOutlineLocationOn
                                        size={18}
                                        className="shrink-0"
                                    />

                                    <span
                                        className="truncate"
                                        title={job.location}
                                    >
                                        {job.location}
                                    </span>

                                </div>


                                <div className="flex items-center gap-1.5 shrink-0">

                                    <MdOutlineWork size={18} />

                                    <span>
                                        {job.employmentType}
                                    </span>

                                </div>


                                <div className="flex items-center gap-1.5 shrink-0">

                                    <MdOutlineLaptop size={18} />

                                    <span>
                                        {job.workMode}
                                    </span>

                                </div>

                            </div>


                            {/* Skills */}

                            <div className="flex flex-wrap gap-2 mt-5">

                                {job.skills?.slice(0, 4).map((skill, index) => (

                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-purple-50 text-purple-600 text-xs font-medium rounded-lg"
                                    >
                                        {skill}
                                    </span>

                                ))}

                                {job.skills?.length > 4 && (

                                    <span className="px-3 py-1.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-lg">

                                        +{job.skills.length - 4} more

                                    </span>

                                )}

                            </div>


                            {/* Description */}

                            <p className="text-sm text-gray-600 leading-6 mt-5 line-clamp-2">

                                {job.jobDescription}

                            </p>


                            {/* Footer */}

                            <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">

                                <div className="flex items-center gap-8">

                                    {/* Salary */}

                                    <div>

                                        <p className="text-sm font-semibold text-gray-800">
                                            {job.salary}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {job.experience || "Fresher"}
                                        </p>

                                    </div>


                                    {/* Last Date */}

                                    <div>

                                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">

                                            <MdOutlineCalendarToday
                                                size={17}
                                                className="text-purple-600"
                                            />

                                            <span>
                                                {new Date(job.lastDateToApply).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </span>

                                        </div>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Last date to apply
                                        </p>

                                    </div>

                                </div>


                                {/* View Job */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(`/candidate/jobs/${job._id}`)
                                    }
                                    className="px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition"
                                >

                                    View Job

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

                    <MdOutlineWork
                        size={45}
                        className="text-gray-300 mx-auto mb-4"
                    />

                    <h2 className="text-lg font-semibold text-gray-700">
                        No jobs available
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        There are currently no open jobs.
                    </p>

                </div>

            )}

        </section>
    );
}


export default BrowseJobs;