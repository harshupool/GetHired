import React, { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

import {
  MdOutlineNotificationsNone,
  MdKeyboardArrowDown,
  MdPerson,
} from "react-icons/md";


function CandidateNavbar() {

  const [user, setUser] = useState(null);
  const [candidate, setCandidate] = useState(null);


  useEffect(() => {

    const fetchCandidateProfile = async () => {

      try {

        const response = await axiosInstance.get(
          "/api/candidate/profile",
          {
            withCredentials: true
          }
        );


        setUser(response.data.user);

        setCandidate(response.data.candidate);


      } catch (error) {

        console.log(error);

      }

    };


    fetchCandidateProfile();


  }, []);


  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">

      <div>

        <h2 className="text-xl font-semibold text-gray-800">
          Candidate
        </h2>

      </div>


      <div className="flex items-center gap-5">

        <button className="relative text-gray-500 hover:text-purple-600 transition">

          <MdOutlineNotificationsNone size={24} />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>


        <div className="flex items-center gap-3 cursor-pointer">


          {candidate?.profilePic ? (

            <img
              src={candidate.profilePic}
              alt="Candidate"
              className="w-10 h-10 rounded-full object-cover"
            />

          ) : (

            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">

              <MdPerson size={24} />

            </div>

          )}


          <div>

            <p className="text-sm font-semibold text-gray-800">
              {user?.name || "Candidate"}
            </p>

            <p className="text-xs text-gray-500 capitalize">
              {user?.role || "candidate"}
            </p>

          </div>


          <MdKeyboardArrowDown
            size={20}
            className="text-gray-500"
          />

        </div>

      </div>

    </header>
  );
}


export default CandidateNavbar;