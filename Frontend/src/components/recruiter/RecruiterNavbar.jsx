import {
  FaBell,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

import { useEffect, useState } from "react";
// import axios from "axios";

import axiosInstance from "../../utils/axiosInstance";


const RecruiterNavbar = ({ logo }) => {

  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await axiosInstance.get(
          "/api/auth/me",
          {
            withCredentials: true,
          }
        );

        setUser(res.data.user);

        const companyRes = await axiosInstance.get(

          "/api/company/profile",

          {
            withCredentials: true,
          }

        );

        setCompany(companyRes.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchUser();



  }, []);

  return (
    <header className="w-full h-20 bg-white border-b shadow-sm flex items-center justify-between px-8">

      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Recruiter
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back 👋
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Search Bar */}
        <div className="relative hidden md:block">

          <FaSearch
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search jobs..."
            className="
            w-80
            pl-11
            pr-4
            py-2.5
            rounded-xl
            border
            border-gray-300
            outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition
            "
          />

        </div>

        {/* Notification */}
        <button
          className="
          relative
          p-3
          rounded-full
          hover:bg-gray-100
          transition
          "
        >
          <FaBell className="text-xl text-gray-600" />

          {/* Notification Badge */}
          <span
            className="
            absolute
            top-2
            right-2
            h-2.5
            w-2.5
            rounded-full
            bg-red-500
            "
          />
        </button>

        {/* Profile */}
        <div
          className="
          flex
          items-center
          gap-3
          cursor-pointer
          hover:bg-gray-100
          px-3
          py-2
          rounded-xl
          transition
          "
        >

          {/* Avatar */}
          <div className="w-11 h-11 rounded-full overflow-hidden border">

            <img
              src={company?.logo}
              alt="Company Logo"
              className="w-full h-full object-cover"
            />

          </div>

          {/* Name */}
          <div className="hidden md:block">

            <h3 className="font-semibold text-gray-800">
              {company?.companyName}
            </h3>

            <p className="text-sm text-gray-500">
              {user?.name}
            </p>

          </div>

          {/* <FaChevronDown
            className="
            hidden
            md:block
            text-gray-500
            " */}
          {/* /> */}

        </div>

      </div>

    </header>
  );
};

export default RecruiterNavbar;