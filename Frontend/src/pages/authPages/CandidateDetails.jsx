import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from 'axios'
import axiosInstance from "../../utils/axiosInstance"



function CandidateDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    collegeName: "",
    degree: "",
    branch: "",
    graduationYear: "",
    location: "",
    skills: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(
        "/api/auth/candidate-register",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      navigate("/login");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-2">
          Complete Your Profile
        </h1>

        <p className="text-gray-500 mb-8">
          Tell recruiters more about yourself.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          {/* College */}
          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          {/* Degree */}
          <input
            type="text"
            name="degree"
            placeholder="Degree (B.Tech, BCA, MCA...)"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          {/* Branch */}
          <input
            type="text"
            name="branch"
            placeholder="Branch / Specialization"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          {/* Graduation Year */}
          <input
            type="number"
            name="graduationYear"
            placeholder="Graduation Year"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          {/* Skills */}
          <textarea
            name="skills"
            rows="3"
            placeholder="Skills (React, Node.js, DSA, Java...)"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          {/* Bio */}
          <textarea
            name="bio"
            rows="4"
            placeholder="Tell us about yourself"
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

export default CandidateDetails;