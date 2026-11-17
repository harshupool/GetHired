import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

import {
  MdOutlineDescription,
  MdOutlineBookmarkBorder,
  MdOutlineCheckCircle,
  MdOutlineCalendarMonth
} from "react-icons/md";

import CandidateDashboardCard from "../../components/candidate/CandidateDashboardCard";
import RecommendedJobs from "../../components/candidate/RecommendedJobs";
import RecentApplications from "../../components/candidate/RecentApplications";

function CandidateDashboard() {

  const { user, candidate } = useOutletContext();

  const [stats, setStats] = useState({
    totalApplications: 0,
    shortlisted: 0,
    interviewScheduled: 0,
    savedJobs: 0
  });

  const [loading, setLoading] = useState(true);

  // Fetch dashboard statistics
  useEffect(() => {

    const fetchDashboardStats = async () => {

      try {

        const response = await axiosInstance.get(
          "/api/candidate/dashboard-stats",
          {
            withCredentials: true
          }
        );

        setStats(response.data.stats);

      } catch (error) {

        console.log("Error fetching dashboard stats:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchDashboardStats();

  }, []);


  return (

    <section>

      {/* Welcome Section */}
      <div className="mb-8">

        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.name || "Candidate"}
        </h1>

        <p className="text-gray-500 mt-1">
          Find your next opportunity and track your job applications.
        </p>

      </div>


      {/* Dashboard Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <CandidateDashboardCard
          title="Total Applications"
          value={loading ? "..." : stats.totalApplications}
          icon={MdOutlineDescription}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <CandidateDashboardCard
          title="Shortlisted"
          value={loading ? "..." : stats.shortlisted}
          icon={MdOutlineCheckCircle}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <CandidateDashboardCard
          title="Interviews Scheduled"
          value={loading ? "..." : stats.interviewScheduled}
          icon={MdOutlineCalendarMonth}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />

        <CandidateDashboardCard
          title="Saved Jobs"
          value={loading ? "..." : stats.savedJobs}
          icon={MdOutlineBookmarkBorder}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />

      </div>


      {/* Recommended Jobs */}
      <div className="mb-8">
        <RecommendedJobs
          candidate={candidate}
          onSavedChange={(saved) => {
            setStats(prev => ({
              ...prev,
              savedJobs: prev.savedJobs + (saved ? 1 : -1)
            }));
          }}
        />
      </div>


      {/* Recent Applications */}
      <RecentApplications />

    </section>

  );
}

export default CandidateDashboard;
