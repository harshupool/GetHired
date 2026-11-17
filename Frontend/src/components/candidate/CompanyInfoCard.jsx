import React from "react";

import {
    MdBusiness,
    MdLanguage,
    MdLocationOn,
    MdDescription,
} from "react-icons/md";

function CompanyInfoCard({ company }) {

    return (

        <div className="bg-white border border-gray-200 rounded-xl p-8">

            {/* Heading */}

            <div className="flex items-center gap-3 mb-6">

                <MdBusiness
                    size={26}
                    className="text-purple-600"
                />

                <h2 className="text-2xl font-semibold text-gray-800">
                    Company Information
                </h2>

            </div>


            {/* Company Header */}

            <div className="flex items-center gap-5 mb-8">

                {company?.logo ? (

                    <img
                        src={company.logo}
                        alt={company.companyName}
                        className="w-10 h-10 rounded-xl object-cover border border-gray-200"
                    />

                ) : (

                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">

                        <MdBusiness
                            size={40}
                            className="text-purple-600"
                        />

                    </div>

                )}

                <div>

                    <h3 className="text-2xl font-semibold text-gray-800">
                        {company?.companyName}
                    </h3>

                </div>

            </div>


            {/* Company Details */}

            <div className="space-y-6">

                {/* Website */}

                <div className="flex items-start gap-3">

                    <MdLanguage
                        size={22}
                        className="text-purple-600 mt-1"
                    />

                    <div>

                        <p className="text-sm text-gray-500">
                            Website
                        </p>

                        {company?.companyWebsite ? (

                            <a
                                href={company.companyWebsite}
                                target="_blank"
                                rel="noreferrer"
                                className="text-purple-600 hover:underline break-all"
                            >
                                {company.companyWebsite}
                            </a>

                        ) : (

                            <p className="text-gray-700">
                                Not Available
                            </p>

                        )}

                    </div>

                </div>



                {/* Location */}

                <div className="flex items-start gap-3">

                    <MdLocationOn
                        size={22}
                        className="text-purple-600 mt-1"
                    />

                    <div>

                        <p className="text-sm text-gray-500">
                            Location
                        </p>

                        <p className="text-gray-700">

                            {company?.location || "Not Available"}

                        </p>

                    </div>

                </div>



                {/* Description */}

                <div className="flex items-start gap-3">

                    <MdDescription
                        size={22}
                        className="text-purple-600 mt-1"
                    />

                    <div>

                        <p className="text-sm text-gray-500 mb-2">
                            About Company
                        </p>

                        <p className="text-gray-700 leading-7 whitespace-pre-line">

                            {company?.companyDescription ||
                                "No company description available."}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CompanyInfoCard;