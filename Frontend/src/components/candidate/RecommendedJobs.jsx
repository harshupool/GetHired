import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

import axiosInstance from "../../utils/axiosInstance";

import {
  MdOutlineLocationOn,
  MdOutlineWork,
  MdOutlineBookmarkBorder,
  MdBookmark
} from "react-icons/md";

function RecommendedJobs({ candidate, onSavedChange }) {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState(
    candidate?.savedJobs?.map(id => id.toString()) || []
  );
  const [recommendationType, setRecommendationType] = useState("");

  useEffect(() => {
    setSavedJobs(
      candidate?.savedJobs?.map(id => id.toString()) || []
    );
  }, [candidate]);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/candidate/recommended-jobs",
          { withCredentials: true }
        );

        setJobs(response.data.jobs);
        setRecommendationType(response.data.recommendationType);

      } catch (error) {
        console.log("Error fetching recommended jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedJobs();
  }, []);

  const handleSaveJob = async (jobId) => {
    try {
      const response = await axiosInstance.post(
        `/api/candidate/toggle-save-job/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.saved) {
        setSavedJobs(prev => [...prev, jobId]);
      } else {
        setSavedJobs(prev => prev.filter(id => id !== jobId));
      }

      onSavedChange(response.data.saved);

    } catch (error) {
      console.log("Error saving job:", error);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading recommended jobs...</p>;
  }

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6">

      {/* Heading and recommendation message */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Recommended Jobs
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {recommendationType === "recent"
              ? "No skill matches found. Here are some recently posted jobs."
              : "Jobs selected based on your skills."
            }
          </p>
        </div>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No jobs available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {jobs.map((job) => {
            const jobId = job._id.toString();
            const isSaved = savedJobs.includes(jobId);

            return (
              <div
                key={jobId}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
              >

                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold">
                    {job.companyId?.companyName?.charAt(0) || "C"}
                  </div>

                  <button
                    onClick={() => handleSaveJob(jobId)}
                    className="text-gray-400 hover:text-purple-600"
                    title={isSaved ? "Remove saved job" : "Save job"}
                  >
                    {isSaved
                      ? <MdBookmark size={22} className="text-purple-600" />
                      : <MdOutlineBookmarkBorder size={22} />
                    }
                  </button>
                </div>

                <div className="mt-5">
                  <h3 className="font-semibold text-gray-800">
                    {job.jobTitle}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {job.companyId?.companyName || "Company unavailable"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">

                  <div className="flex items-center gap-1">
                    <MdOutlineLocationOn size={18} />
                    {job.location}
                  </div>

                  <div className="flex items-center gap-1">
                    <MdOutlineWork size={18} />
                    {job.employmentType}
                  </div>

                </div>

                {job.matchPercentage !== undefined && (
                  <p className="text-sm text-green-600 font-medium mt-3">
                    {job.matchPercentage}% Skill Match
                  </p>
                )}

                <button
                  onClick={() => navigate(`/candidate/jobs/${jobId}`)}
                  className="w-full mt-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition"
                >
                  View Job
                </button>

              </div>
            );
          })}

        </div>
      )}

    </section>
  );
}

export default RecommendedJobs;
