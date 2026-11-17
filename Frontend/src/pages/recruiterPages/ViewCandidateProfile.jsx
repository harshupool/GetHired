import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import RecruiterLayout from "../../layouts/RecruiterLayout";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";


import {
    MdPerson,
    MdLocationOn,
    MdEdit,
    MdOutlineDescription,
    MdOutlineFileUpload,
    MdAdd,
    MdSchool,
    MdArrowBack,
} from "react-icons/md";


const ViewCandidateProfile = () => {

    const navigate = useNavigate();

    const { userId } = useParams();

    const [user, setUser] = useState(null);
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchCandidateProfile = async () => {

        try {

            const res = await axiosInstance.get(
                `/api/candidate/profile/${userId}`,
                {
                    withCredentials: true,
                }
            );

            setUser(res.data.user);
            setCandidate(res.data.candidate);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchCandidateProfile();
    }, []);


    if (loading) {
        return (
            <RecruiterLayout>
                Loading...
            </RecruiterLayout>
        );
    }
    return (
        <RecruiterLayout>


            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-black-600 hover:text-blue-700 cursor-pointer font-medium mb-6 transition"
            >
                <MdArrowBack size={22} />
                Back
            </button>

            {/* Profile Header */}

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-5">

                        {/* Profile Picture Section */}

                        <div className="flex flex-col items-center gap-2">

                            {candidate?.profilePic ? (

                                <img
                                    src={candidate.profilePic}
                                    alt="Candidate"
                                    className="w-24 h-24 rounded-full object-cover"
                                />

                            ) : (

                                <div className="w-24 h-24 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">

                                    <MdPerson size={48} />

                                </div>

                            )}


                        </div>


                        {/* Candidate Information */}

                        <div>

                            <h1 className="text-2xl font-bold text-gray-800">
                                {user?.name || "Candidate"}
                            </h1>

                            <p className="text-gray-600 mt-1">
                                {candidate?.headline || "Add your professional headline"}
                            </p>

                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">

                                <MdLocationOn size={18} />

                                <span>
                                    {candidate?.location || "Location not added"}
                                </span>

                            </div>

                        </div>

                    </div>






                </div>

            </div>


            {/* About*/}





            <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    About
                </h2>

                <p className="text-sm text-gray-600 leading-6">

                    {candidate?.bio || "Tell recruiters about yourself."}

                </p>










            </div>


            {/* Skills */}

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold text-gray-800 mb-5">
                    Skills
                </h2>


                {candidate?.skills?.length > 0 ? (

                    <div className="flex flex-wrap gap-3">

                        {candidate.skills.map((skill, index) => (

                            <span
                                key={index}
                                className="px-4 py-2 bg-purple-50 text-purple-600 text-sm font-medium rounded-lg"
                            >
                                {skill}
                            </span>

                        ))}

                    </div>

                ) : (

                    <p className="text-sm text-gray-500">
                        No skills added yet.
                    </p>

                )}

            </div>


            {/* Education */}

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">

                <div className="flex items-center gap-2 mb-5">

                    <MdSchool
                        size={22}
                        className="text-purple-600"
                    />

                    <h2 className="text-lg font-semibold text-gray-800">
                        Education
                    </h2>

                </div>


                <h3 className="font-semibold text-gray-800">
                    {candidate?.collegeName || "College not added"}
                </h3>

                <p className="text-sm text-gray-600 mt-2">

                    {candidate?.degree || "Degree"}

                    {candidate?.branch && (
                        <>
                            {" - "}
                            {candidate.branch}
                        </>
                    )}

                </p>

                <p className="text-sm text-gray-500 mt-2">
                    Graduation Year: {candidate?.graduationYear || "Not added"}
                </p>

            </div>


            {/* Experience */}

            <div className="bg-white border border-gray-200 rounded-xl p-6">

                <div className="flex items-center justify-between mb-5">

                    <h2 className="text-lg font-semibold text-gray-800">
                        Experience
                    </h2>



                </div>


                {candidate?.experience?.length > 0 ? (

                    <div className="space-y-5">

                        {candidate.experience.map((experience, index) => (

                            <div
                                key={experience._id || index}
                                className="border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
                            >

                                <h3 className="font-semibold text-gray-800">
                                    {experience.jobTitle}
                                </h3>

                                <p className="text-sm text-gray-600 mt-1">
                                    {experience.companyName}
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                    {experience.description}
                                </p>

                            </div>

                        ))}

                    </div>

                ) : (

                    <p className="text-sm text-gray-500">
                        No experience added yet.
                    </p>

                )}

            </div>




        </RecruiterLayout>
    );
};

export default ViewCandidateProfile;