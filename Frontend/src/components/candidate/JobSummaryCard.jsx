import React from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import ApplyWithResumeModal from "./ApplyWithResumeModal";

import {
    MdBusiness,
    MdOutlineLocationOn,
    MdOutlineWork,
    MdOutlineLaptop,
    MdOutlineCalendarToday,
    MdOutlineBookmarkBorder,
    MdSend,
    MdPeople,
    MdCheckCircle,
} from "react-icons/md";

function JobSummaryCard({ job, applied, setApplied }) {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const [showApplyModal, setShowApplyModal] = React.useState(false);


    const company = job.companyId;




    const handleApply = async (resumeId) => {
        try {
            setLoading(true);

            const response = await axiosInstance.post(
                `/api/applications/apply/${job._id}`,
                { resumeId },
                { withCredentials: true }
            );

            setApplied(true);
            setShowApplyModal(false);

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };



    return (

        <div className="bg-white border border-gray-200 rounded-xl p-8">

            {/* Header */}

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-5">

                    {company?.logo ? (

                        <img
                            src={company.logo}
                            alt={company.companyName}
                            className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                        />

                    ) : (

                        <div className="w-20 h-20 rounded-xl bg-purple-100 flex items-center justify-center">

                            <MdBusiness
                                size={40}
                                className="text-purple-600"
                            />

                        </div>

                    )}

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">

                            {job.jobTitle}

                        </h1>

                        <p className="text-lg text-gray-600 mt-1">

                            {company?.companyName}

                        </p>

                    </div>

                </div>

            </div>


            {/* Job Details */}

            <div className="grid grid-cols-3 gap-6 mt-8">

                <div className="flex items-center gap-3">

                    <MdOutlineLocationOn
                        size={22}
                        className="text-purple-600"
                    />

                    <div>

                        <p className="text-sm text-gray-500">
                            Location
                        </p>

                        <p className="font-medium text-gray-800">
                            {job.location}
                        </p>

                    </div>

                </div>



                <div className="flex items-center gap-3">

                    <MdOutlineWork
                        size={22}
                        className="text-purple-600"
                    />

                    <div>

                        <p className="text-sm text-gray-500">
                            Employment Type
                        </p>

                        <p className="font-medium text-gray-800">
                            {job.employmentType}
                        </p>

                    </div>

                </div>



                <div className="flex items-center gap-3">

                    <MdOutlineLaptop
                        size={22}
                        className="text-purple-600"
                    />

                    <div>

                        <p className="text-sm text-gray-500">
                            Work Mode
                        </p>

                        <p className="font-medium text-gray-800">
                            {job.workMode}
                        </p>

                    </div>

                </div>



                <div>

                    <p className="text-sm text-gray-500">

                        Salary

                    </p>

                    <p className="font-semibold text-gray-800">

                        {job.salary}

                    </p>

                </div>



                <div>

                    <p className="text-sm text-gray-500">

                        Experience

                    </p>

                    <p className="font-semibold text-gray-800">

                        {job.experience || "Fresher"}

                    </p>

                </div>



                <div className="flex items-center gap-3">

                    <MdPeople
                        size={22}
                        className="text-purple-600"
                    />

                    <div>

                        <p className="text-sm text-gray-500">

                            Openings

                        </p>

                        <p className="font-medium text-gray-800">

                            {job.openings}

                        </p>

                    </div>

                </div>

            </div>



            {/* Last Date */}

            <div className="flex items-center gap-3 mt-8">

                <MdOutlineCalendarToday
                    size={20}
                    className="text-red-500"
                />

                <span className="font-medium text-gray-700">

                    Apply before{" "}

                    {new Date(
                        job.lastDateToApply
                    ).toLocaleDateString(
                        "en-IN",
                        {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        }
                    )}

                </span>

            </div>



            {/* Buttons */}

            <div className="flex gap-4 mt-8">

                <button
                    className="flex items-center gap-2 px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
                >

                    <MdOutlineBookmarkBorder size={20} />

                    Save Job

                </button>


                <button
                    onClick={() => setShowApplyModal(true)}
                    disabled={loading || applied}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition
        ${applied
                            ? "bg-green-600 text-white cursor-not-allowed"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }
    `}
                >

                    {loading ? (

                        <>
                            <MdSend size={18} />
                            Applying...
                        </>

                    ) : applied ? (

                        <>
                            <MdCheckCircle size={20} />
                            Applied
                        </>

                    ) : (

                        <>
                            <MdSend size={18} />
                            Apply Now
                        </>

                    )}

                </button>

            </div>


            {showApplyModal && (
                <ApplyWithResumeModal
                    onClose={() => setShowApplyModal(false)}
                    onApply={handleApply}
                    loading={loading}
                />
            )}

        </div>

    );

}

export default JobSummaryCard;