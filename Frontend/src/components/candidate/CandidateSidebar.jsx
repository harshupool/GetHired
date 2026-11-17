import React from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { NavLink, useNavigate } from "react-router-dom";

import {
  MdDashboard,
  MdOutlineWork,
  MdOutlineDescription,
  MdOutlineBookmarkBorder,
  MdLogout,
  MdAssignment,
} from "react-icons/md";

import { FaRegUser } from "react-icons/fa";

function CandidateSidebar() {


  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

      await axiosInstance.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/");

    } catch (error) {

      console.log(error);

    }

  };




  const menuItems = [
    {
      name: "Dashboard",
      path: "/candidate-dashboard",
      icon: MdDashboard,
    },
    {
      name: "My Profile",
      path: "/candidate/profile",
      icon: FaRegUser,
    },
    {
      name: "Browse Jobs",
      path: "/candidate/jobs",
      icon: MdOutlineWork,
    },
    {
      name: "My Applications",
      path: "/candidate/my-applications",
      icon: MdAssignment,
    },
    // {
    //   name: "Saved Jobs",
    //   path: "/candidate/saved-jobs",
    //   icon: MdOutlineBookmarkBorder,
    // },

  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0">

      <div className="h-20 flex items-center px-7 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-purple-600">
          GetHired
        </h1>
      </div>

      <nav className="p-4 space-y-2">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                                ${isActive
                  ? "bg-purple-50 text-purple-600"
                  : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />

              {item.name}
            </NavLink>
          );
        })}

      </nav>

      <div className="absolute bottom-6 left-4 right-4">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition">
          <MdLogout size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default CandidateSidebar;