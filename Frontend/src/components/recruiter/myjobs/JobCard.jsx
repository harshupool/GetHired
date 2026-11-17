import { useNavigate } from "react-router-dom";
import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaLaptopHouse,
    FaMoneyBillWave,
    FaUsers,
    FaRegCalendarAlt,
    FaEye,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

const JobCard = ({ job, onDelete }) => {

    const navigate = useNavigate();


    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all">

            {/* Top Section */}
            <div className="flex justify-between items-start">

                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {job.jobTitle}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {job.companyId.companyName}
                    </p>
                </div>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {job.status}
                </span>

            </div>

            {/* Job Details */}

            <div className="grid md:grid-cols-2 gap-4 mt-6 text-gray-700">

                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2">
                    <FaBriefcase className="text-blue-600" />
                    <span>{job.employmentType}</span>
                </div>

                <div className="flex items-center gap-2">
                    <FaLaptopHouse className="text-blue-600" />
                    <span>{job.workMode}</span>
                </div>

                <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-blue-600" />
                    <span>{job.salary}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 hover:px-3 hover:py-2 rounded-md transition-all duration-200 hover:bg-gray-100 hover:shadow-sm hover:scale-[1.02] cursor-pointer" >
                        <FaUsers className="text-blue-600" />
                        {job.applicants.length} Applicant
                        {job.applicants.length !== 1 && "s"}
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <FaRegCalendarAlt className="text-blue-600" />
                    <span> Posted on {" "}{new Date(job.createdAt).toLocaleDateString("en-IN")}</span>
                </div>

            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-3 mt-8">

                <button
                    onClick={() => navigate(`/my-jobs/${job._id}`)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <FaEye />
                    View Details
                </button>

                <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => navigate(`/edit-job/${job._id}`)}>
                    <FaEdit />
                    Edit
                </button>

                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => onDelete(job._id)}>
                    <FaTrash />

                    Delete
                </button>

            </div>

        </div>
    );
};

export default JobCard;