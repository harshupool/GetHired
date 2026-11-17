import React from "react";

import { MdLightbulbOutline } from "react-icons/md";

function JobSkillsCard({ job }) {

    return (

        <div className="bg-white border border-gray-200 rounded-xl p-8">

            {/* Heading */}

            <div className="flex items-center gap-3 mb-6">

                <MdLightbulbOutline
                    size={26}
                    className="text-purple-600"
                />

                <h2 className="text-2xl font-semibold text-gray-800">
                    Required Skills
                </h2>

            </div>


            {/* Skills */}

            {job.skills && job.skills.length > 0 ? (

                <div className="flex flex-wrap gap-3">

                    {job.skills.map((skill, index) => (

                        <span
                            key={index}
                            className="px-4 py-2 bg-purple-50 text-purple-700 text-sm font-medium rounded-lg border border-purple-100"
                        >
                            {skill}
                        </span>

                    ))}

                </div>

            ) : (

                <p className="text-gray-500">
                    No specific skills mentioned.
                </p>

            )}

        </div>

    );

}

export default JobSkillsCard;