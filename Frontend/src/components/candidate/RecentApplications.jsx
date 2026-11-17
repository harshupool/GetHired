
import React, { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

function RecentApplications() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch recent applications
  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const response = await axiosInstance.get(
          "/api/candidate/recent-applications",
          {
            withCredentials: true
          }
        );

        setApplications(response.data.applications);

      } catch (error) {

        console.log(error);
        setError("Unable to load recent applications.");

      } finally {

        setLoading(false);

      }

    };

    fetchApplications();

  }, []);


  // Application status styles
  const statusStyles = {
    Applied: "bg-blue-100 text-blue-600",
    "Under Review": "bg-yellow-100 text-yellow-700",
    Shortlisted: "bg-green-100 text-green-600",
    "Interview Scheduled": "bg-purple-100 text-purple-600",
    Rejected: "bg-red-100 text-red-600",
    Accepted: "bg-green-100 text-green-700"
  };


  // Format application date
  const formatDate = (date) => {

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

  };


  // Loading state
  if (loading) {
    return (
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-gray-500">Loading applications...</p>
      </section>
    );
  }


  // Error state
  if (error) {
    return (
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }


  return (

    <section className="bg-white border border-gray-200 rounded-xl">

      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

        <h2 className="text-lg font-semibold text-gray-800">
          Recent Applications
        </h2>

        <button className="text-sm text-purple-600 font-medium hover:underline">
          View All Applications
        </button>

      </div>


      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr className="text-left text-sm text-gray-500">

              <th className="px-6 py-4 font-medium">
                Job Title
              </th>

              <th className="px-6 py-4 font-medium">
                Company
              </th>

              <th className="px-6 py-4 font-medium">
                Applied Date
              </th>

              <th className="px-6 py-4 font-medium">
                Status
              </th>

            </tr>

          </thead>


          <tbody>

            {applications.length > 0 ? (

              applications.map((application) => (

                <tr
                  key={application._id}
                  className="border-t border-gray-100"
                >

                  <td className="px-6 py-5 font-medium text-gray-800">
                    {application.jobId?.jobTitle || "Job no longer available"}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {application.companyId?.companyName || "Company unavailable"}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {formatDate(application.appliedAt)}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusStyles[application.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {application.status}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  You haven't applied for any jobs yet.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </section>

  );
}

export default RecentApplications;
