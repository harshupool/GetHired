import RecruiterLayout from "../../layouts/RecruiterLayout";

import DashboardCard from "../../components/recruiter/DashboardCard";
import RecentJobsTable from "../../components/recruiter/RecentJobsTable";
import { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

import {
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";



const RecruiterDashboard = () => {


  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const response = await axiosInstance.get(

        "/api/jobs/dashboard",

        {
          withCredentials: true,
        }

      );

  
      setDashboard(response.data.dashboard);

    }

    catch (error) {

      console.log(error);

    }

  };




  if (!dashboard) {

    return (

      <RecruiterLayout>

        <h2 className="text-xl font-semibold">

          Loading...

        </h2>

      </RecruiterLayout>

    )

  }

  return (
    <RecruiterLayout>

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h2>

        <p className="text-gray-500 mt-2">
          Manage your job postings and applicants from one place.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Jobs Posted"
          value={dashboard.totalJobs}
          icon={<FaBriefcase />}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Applications"
          value={dashboard.totalApplications}
          icon={<FaUsers />}
          color="bg-green-600"
        />

        <DashboardCard
          title="Active Jobs"
          value={dashboard.activeJobs}
          icon={<FaCheckCircle />}
          color="bg-purple-600"
        />

        <DashboardCard
          title="Closed Jobs"
          value={dashboard.closedJobs}
          icon={<FaTimesCircle />}
          color="bg-red-500"
        />

      </div>

      {/* Recent Jobs */}
      <RecentJobsTable
        jobs={dashboard.recentJobs}
      />

    </RecruiterLayout>
  );
};

export default RecruiterDashboard;