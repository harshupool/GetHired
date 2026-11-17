import React, { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { Outlet } from "react-router-dom";

import CandidateSidebar from "../components/candidate/CandidateSidebar";
import CandidateNavbar from "../components/candidate/CandidateNavbar";

function CandidateLayout() {

  const [user, setUser] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCandidateProfile = async () => {

      try {

        const response = await axiosInstance.get(
          "/api/candidate/profile",
          {
            withCredentials: true,
          }
        );

        setUser(response.data.user);
        setCandidate(response.data.candidate);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchCandidateProfile();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <CandidateSidebar />

      <div className="ml-64">

        <CandidateNavbar
          user={user}
          candidate={candidate}
        />

        <main className="p-8">

          <Outlet
            context={{
              user,
              candidate,
              setCandidate,
            }}
          />

        </main>

      </div>

    </div>
  );
}

export default CandidateLayout;