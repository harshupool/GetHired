import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow-md">
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600"
      >
        GetHired
      </Link>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-4 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-50"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;