// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaPlusCircle,
  FaBriefcase,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    icon: FaTachometerAlt,
    path: "/recruiter-dashboard",
  },
  {
    name: "Company Profile",
    icon: FaBuilding,
    path: "/company-profile",
  },
  {
    name: "Post Job",
    icon: FaPlusCircle,
    path: "/post-job",
  },
  {
    name: "My Jobs",
    icon: FaBriefcase,
    path: "/my-jobs",
  },
  // {
  //   name: "Applicants",
  //   icon: FaUsers,
  //   path: "/applicants",
  // },
  // {
  //   name: "Analytics",
  //   icon: FaChartBar,
  //   path: "/analytics",
  // },
  // {
  //   name: "Settings",
  //   icon: FaCog,
  //   path: "/settings",
  // },
];

const RecruiterSidebar = () => {

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

  return (
    <aside className="w-72 h-screen bg-white shadow-lg border-r flex flex-col">

      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b">
        <h1 className="text-3xl font-bold text-blue-600">
          GetHired
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 mb-2 rounded-xl transition-all duration-300
              
              ${isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <item.icon className="text-lg" />

            <span className="font-medium">
              {item.name}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* Logout */}

      <div className="border-t p-4">

        <button
          onClick={handleLogout}
          className="
          flex
          items-center
          gap-4
          w-full
          px-4
          py-3
          rounded-xl
          text-red-500
          hover:bg-red-50
          transition
          "
        >
          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default RecruiterSidebar;