import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center bg-gray-50">
        <div className="text-center px-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Dream Job Today
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top recruiters, discover exciting opportunities,
            and take the next step in your career.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Verified Recruiters
            </h3>
            <p className="text-gray-600">
              Apply confidently to jobs posted by trusted companies.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Quick Apply
            </h3>
            <p className="text-gray-600">
              Apply to jobs in just a few clicks.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Internships
            </h3>
            <p className="text-gray-600">
              Find internships and gain industry experience.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Career Growth
            </h3>
            <p className="text-gray-600">
              Build your profile and get discovered by recruiters.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>© 2026 JobPortal. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;