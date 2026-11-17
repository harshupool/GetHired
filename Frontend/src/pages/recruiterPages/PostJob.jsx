import { useState, useEffect } from "react";
import RecruiterLayout from "../../layouts/RecruiterLayout";
// import axios from 'axios';
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
} from "react-icons/md";

const PostJob = () => {

  const navigate = useNavigate();
  const { jobId } = useParams();
  const isEditMode = !!jobId;

  const initialJobData = {
    jobTitle: "",
    jobDescription: "",
    skills: "",
    experience: "",
    employmentType: "",
    workMode: "",
    location: "",
    salary: "",
    openings: 1,
    lastDateToApply: "",
  };

  const [jobData, setJobData] = useState(initialJobData);

  useEffect(() => {

    if (isEditMode) {
      fetchJob();
    }

  }, []);

  const fetchJob = async () => {

    try {

      const response = await axiosInstance.get(

        `/api/jobs/${jobId}`,

        {
          withCredentials: true,
        }

      );

      const job = response.data.job;

      setJobData({

        jobTitle: job.jobTitle,
        jobDescription: job.jobDescription,
        skills: job.skills.join(", "),
        experience: job.experience,
        employmentType: job.employmentType,
        workMode: job.workMode,
        location: job.location,
        salary: job.salary,
        openings: job.openings,
        lastDateToApply: job.lastDateToApply.substring(0, 10),

      });

    }

    catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {

      jobTitle: jobData.jobTitle,
      jobDescription: jobData.jobDescription,
      skills: jobData.skills.split(",").map(skill => skill.trim()),
      experience: jobData.experience,
      salary: jobData.salary,
      location: jobData.location,
      employmentType: jobData.employmentType,
      workMode: jobData.workMode,
      openings: jobData.openings,
      lastDateToApply: jobData.lastDateToApply,

    };


    try {
      if (isEditMode) {

        await axiosInstance.put(

          `/api/jobs/${jobId}`,

          data,

          {
            withCredentials: true,
          }

        );

        alert("Job updated successfully!");
        navigate(`/my-jobs/${jobId}`);
      }

      else {

        await axiosInstance.post(

          "/api/jobs/create",

          data,

          {
            withCredentials: true,
          }

        );

        alert("Job posted successfully!");

        setJobData(initialJobData);

      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };
  const handleCancel = () => {
    setJobData(initialJobData);
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
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {isEditMode ? "Edit Job" : "Post a New Job"}
            </h1>
            <p className="text-gray-500 mt-2">
              {
                isEditMode
                  ? "Update the details of your job."
                  : "Fill in the details below to create a new job posting."
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Job Information */}
            <div>
              <h2 className="text-xl font-semibold mb-5 border-b pb-2">
                Job Information
              </h2>

              <div className="space-y-5">

                <div>
                  <label className="block mb-2 font-medium">
                    Job Title
                  </label>

                  <input
                    type="text"
                    name="jobTitle"
                    value={jobData.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g. MERN Stack Developer"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Job Description
                  </label>

                  <textarea
                    rows="6"
                    name="jobDescription"
                    value={jobData.jobDescription}
                    onChange={handleChange}
                    placeholder="Describe the job role..."
                    className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Skills Required
                  </label>

                  <input
                    type="text"
                    name="skills"
                    value={jobData.skills}
                    onChange={handleChange}
                    placeholder="Skill1, Skill2, Skill3"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>
            </div>

            {/* Employment Details */}
            <div>
              <h2 className="text-xl font-semibold mb-5 border-b pb-2">
                Employment Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className="block mb-2 font-medium">
                    Experience
                  </label>

                  <select
                    name="experience"
                    value={jobData.experience}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">Select</option>
                    <option>Fresher</option>
                    <option>0-1 Years</option>
                    <option>1-2 Years</option>
                    <option>2-4 Years</option>
                    <option>5+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Employment Type
                  </label>

                  <select
                    name="employmentType"
                    value={jobData.employmentType}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">Select</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Work Mode
                  </label>

                  <select
                    name="workMode"
                    value={jobData.workMode}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">Select</option>
                    <option>On-site</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={jobData.location}
                    onChange={handleChange}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Salary / Stipend
                  </label>

                  <input
                    type="text"
                    name="salary"
                    value={jobData.salary}
                    onChange={handleChange}
                    placeholder="Salary or stipend details"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Openings
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="openings"
                    value={jobData.openings}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

              </div>
            </div>

            {/* Application Details */}
            <div>
              <h2 className="text-xl font-semibold mb-5 border-b pb-2">
                Application Details
              </h2>

              <div>
                <label className="block mb-2 font-medium">
                  Last Date to Apply
                </label>

                <input
                  type="date"
                  name="lastDateToApply"
                  value={jobData.lastDateToApply}
                  onChange={handleChange}
                  className="w-full md:w-1/2 border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">

              <button
                type="button"
                className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                onClick={handleCancel}
              >
                {isEditMode ? "Clear" : "Cancel"}
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {isEditMode ? "Update Job" : "Post Job"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default PostJob;