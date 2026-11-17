import { FaCamera } from "react-icons/fa";

const CompanyLogoCard = ({
    logo,
    editMode,
    handleFileChange,
}) => {

    return (

        <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">

                Company Logo

            </h2>

            <div className="flex flex-col items-center">

                {
                    logo ? (

                        <img
                            src={logo}
                            alt="Company Logo"
                            className="
                            h-36
                            w-36
                            rounded-full
                            object-cover
                            border-4
                            border-blue-500
                            shadow-md
                            "
                        />

                    ) : (

                        <div
                            className="
                            h-36
                            w-36
                            rounded-full
                            bg-gray-200
                            flex
                            items-center
                            justify-center
                            "
                        >

                            <FaCamera
                                className="
                                text-5xl
                                text-gray-500
                                "
                            />

                        </div>

                    )
                }

                {
                    editMode && (

                        <label
                            className="
                            mt-6
                            cursor-pointer
                            bg-blue-600
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            hover:bg-blue-700
                            transition
                            "
                        >

                            Upload Logo

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                        </label>

                    )
                }

            </div>

        </div>

    );

};

export default CompanyLogoCard;