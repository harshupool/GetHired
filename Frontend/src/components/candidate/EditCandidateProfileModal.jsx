import React, { useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

import { MdClose } from "react-icons/md";


function EditCandidateProfileModal({
    candidate,
    setCandidate,
    onClose
}) {

    const [formData, setFormData] = useState({
        phone: candidate?.phone || "",
        headline: candidate?.headline || "",
        collegeName: candidate?.collegeName || "",
        degree: candidate?.degree || "",
        branch: candidate?.branch || "",
        graduationYear: candidate?.graduationYear || "",
        location: candidate?.location || "",
        skills: candidate?.skills?.join(", ") || "",
        bio: candidate?.bio || "",
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await axiosInstance.put(
                "/api/candidate/profile",
                formData,
                {
                    withCredentials: true
                }
            );

            setCandidate(response.data.candidate);

            onClose();

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl">

                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 sticky top-0 bg-white">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Edit Profile
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 transition"
                    >
                        <MdClose size={24} />
                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="p-6"
                >

                    <div className="grid grid-cols-2 gap-5">

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
                            />

                        </div>


                        <div className="col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Professional Headline
                            </label>

                            <input
                                type="text"
                                name="headline"
                                value={formData.headline}
                                onChange={handleChange}
                                placeholder="Full Stack Developer | MERN Stack"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                College Name
                            </label>

                            <input
                                type="text"
                                name="collegeName"
                                value={formData.collegeName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Degree
                            </label>

                            <input
                                type="text"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Branch / Specialization
                            </label>

                            <input
                                type="text"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Graduation Year
                            </label>

                            <input
                                type="number"
                                name="graduationYear"
                                value={formData.graduationYear}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600"
                            />

                        </div>


                        <div className="col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Skills
                            </label>

                            <textarea
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="React, Node.js, MongoDB, DSA"
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600 resize-none"
                            />

                            <p className="text-xs text-gray-500 mt-1">
                                Separate skills using commas.
                            </p>

                        </div>


                        <div className="col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                About Yourself
                            </label>

                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-purple-600 resize-none"
                            />

                        </div>

                    </div>


                    <div className="flex justify-end gap-3 mt-7 pt-5 border-t border-gray-200">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition disabled:opacity-60"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


export default EditCandidateProfileModal;