import React from "react";

function CandidateDashboardCard({
    title,
    value,
    icon: Icon,
    iconBg,
    iconColor,
}) {

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between">

            <div>
                <p className="text-sm text-gray-500 mb-2">
                    {title}
                </p>

                <h3 className="text-3xl font-bold text-gray-800">
                    {value}
                </h3>
            </div>

            <div
                className={`w-12 h-12 ${iconBg} ${iconColor} rounded-lg flex items-center justify-center`}
            >
                <Icon size={24} />
            </div>

        </div>
    );
}

export default CandidateDashboardCard;