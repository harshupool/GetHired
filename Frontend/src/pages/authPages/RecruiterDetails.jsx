import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from 'axios'
import axiosInstance from "../../utils/axiosInstance";



function RecruiterDetails() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    designation: "",
    website: "",
    phone: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();


    try {
      await axiosInstance.post("/api/auth/recruiter-register", formData, { withCredentials: true })
        .then((res) => {
          setFormData(res.data.user);
          navigate("/login");
        })

    } catch (error) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-2">
          Company Information
        </h1>

        <p className="text-gray-500 mb-8">
          Help candidates learn about your company.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="text"
            name="designation"
            placeholder="Your Designation"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="url"
            name="companyWebsite"
            placeholder="Company Website"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <textarea
            name="companyDescription"
            rows="5"
            placeholder="Describe your company"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Save & Continue
          </button>

        </form>
      </div>
    </div>
  );
}

export default RecruiterDetails;