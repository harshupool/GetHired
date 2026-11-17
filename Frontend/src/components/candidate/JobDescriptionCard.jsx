import React from "react";

import { MdDescription } from "react-icons/md";

function JobDescriptionCard({ job }) {

    return (

        <div className="bg-white border border-gray-200 rounded-xl p-8">

            {/* Heading */}

            <div className="flex items-center gap-3 mb-5">

                <MdDescription
                    size={26}
                    className="text-purple-600"
                />

                <h2 className="text-2xl font-semibold text-gray-800">
                    Job Description
                </h2>

            </div>


            {/* Description */}

            <div className="leading-8 text-gray-700 whitespace-pre-line">

                {job.jobDescription}

            </div>

        </div>

    );

}

export default JobDescriptionCard;