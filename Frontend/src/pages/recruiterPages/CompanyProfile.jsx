import { useState, useEffect } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

import RecruiterLayout from "../../layouts/RecruiterLayout";

import CompanyLogoCard from "../../components/recruiter/company/CompanyLogoCard";
import CompanyBasicInfoCard from "../../components/recruiter/company/CompanyBasicInfoCard";
import CompanyContactCard from "../../components/recruiter/company/CompanyContactCard";
import CompanyDescriptionCard from "../../components/recruiter/company/CompanyDescriptionCard";

const CompanyProfile = () => {

    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [previewLogo, setPreviewLogo] = useState("");

    const [formData, setFormData] = useState({
        companyName: "",
        companyWebsite: "",
        designation: "",
        phone: "",
        location: "",
        companyDescription: "",
        logo: "",
    });

    useEffect(() => {
        fetchCompany();
    }, []);

    const fetchCompany = async () => {

        try {

            const res = await axiosInstance.get(
                "/api/company/profile",
                {
                    withCredentials: true,
                }
            );

            setFormData(res.data);
            setPreviewLogo(res.data.logo);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData({
            ...formData,
            logo: file,
        });

        setPreviewLogo(URL.createObjectURL(file));

    };

    const handleSave = async () => {

        try {

            const data = new FormData();

            data.append("companyName", formData.companyName);
            data.append("companyWebsite", formData.companyWebsite);
            data.append("designation", formData.designation);
            data.append("phone", formData.phone);
            data.append("location", formData.location);
            data.append("companyDescription", formData.companyDescription);

            if (formData.logo instanceof File) {
                data.append("logo", formData.logo);
            }

            const res = await axiosInstance.put(
                "/api/company/update",
                data,
                {
                    withCredentials: true,
                }
            );

            setFormData(res.data);
            console.log(res.data);
            setPreviewLogo(res.data.logo);

            setEditMode(false);

        } catch (error) {

            console.log(error);

        }

    };

    const handleCancel = () => {

        fetchCompany(); // Restore original values

        setEditMode(false);

    };

    // Loading Screen
    if (loading) {

        return (

            <RecruiterLayout>

                <div className="flex items-center justify-center h-[80vh]">

                    <div className="text-center">

                        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

                        <p className="mt-5 text-lg font-medium text-gray-600">

                            Loading Company Profile...

                        </p>

                    </div>

                </div>

            </RecruiterLayout>

        );

    }

    return (

        <RecruiterLayout>

            <div className="max-w-5xl mx-auto">

                {/* Heading */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">

                        Company Profile

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage your company's information.

                    </p>

                </div>

                {/* Logo */}

                <CompanyLogoCard

                    logo={previewLogo}

                    editMode={editMode}

                    handleFileChange={handleFileChange}

                />

                {/* Basic Information */}

                <CompanyBasicInfoCard

                    formData={formData}

                    handleChange={handleChange}

                    editMode={editMode}

                />

                {/* Contact Information */}

                <CompanyContactCard

                    formData={formData}

                    handleChange={handleChange}

                    editMode={editMode}

                />

                {/* About Company */}

                <CompanyDescriptionCard

                    formData={formData}

                    handleChange={handleChange}

                    editMode={editMode}

                />

                {/* Buttons */}

                <div className="flex justify-end gap-4 mt-8">

                    {!editMode ? (

                        <button

                            onClick={() => setEditMode(true)}

                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-8
                                py-3
                                rounded-xl
                                font-medium
                                transition
                            "

                        >

                            Edit Profile

                        </button>

                    ) : (

                        <>

                            <button

                                onClick={handleCancel}

                                className="
                                    bg-gray-500
                                    hover:bg-gray-600
                                    text-white
                                    px-8
                                    py-3
                                    rounded-xl
                                    font-medium
                                    transition
                                "

                            >

                                Cancel

                            </button>

                            <button

                                onClick={handleSave}

                                className="
                                    bg-green-600
                                    hover:bg-green-700
                                    text-white
                                    px-8
                                    py-3
                                    rounded-xl
                                    font-medium
                                    transition
                                "

                            >

                                Save Changes

                            </button>

                        </>

                    )}

                </div>

            </div>

        </RecruiterLayout>

    );

};

export default CompanyProfile;