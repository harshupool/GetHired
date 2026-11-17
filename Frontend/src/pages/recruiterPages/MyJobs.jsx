import RecruiterLayout from "../../layouts/RecruiterLayout";
import JobCard from "../../components/recruiter/myjobs/JobCard";
import { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";




const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchMyJobs = async () => {
    try {

      const response = await axiosInstance.get(
        "/api/jobs/my-jobs",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setJobs(response.data.jobs);
      }

    } catch (error) {
      console.log(error);
    }
  };


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

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );

      alert("Job deleted successfully!");

    } catch (error) {

      console.log(error);

      alert("Failed to delete job.");

    }

  };


  useEffect(() => {
    fetchMyJobs();
  }, []);



  return (
    <RecruiterLayout>

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              My Jobs
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all the jobs you've posted.
            </p>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-md p-10 text-center">
                <h2 className="text-2xl font-semibold text-gray-700">
                  No Jobs Posted Yet
                </h2>

                <p className="text-gray-500 mt-2">
                  Start by posting your first job.
                </p>

                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition" onClick={() => navigate("/post-job")}>
                  Post Your First Job
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
};



export default MyJobs;