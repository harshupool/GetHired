import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
// import axios from "axios";

import axiosInstance from "../../../utils/axiosInstance";

function EmailModal({
    isOpen,
    onClose,
    candidate,
    job,
}) {

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!candidate || !job) return;

        setSubject(
            `Regarding your application for ${job.jobTitle}`
        );

        setMessage(`Hi ${candidate.name},

Thank you for applying for the ${job.jobTitle} position at ${job.companyName}.

We have reviewed your application and would like to discuss the next steps in the hiring process.

Please reply to this email at your earliest convenience.

Best Regards,
${job.companyName}`);

    }, [candidate, job]);


    const handleSendEmail = async () => {

        try {

            setLoading(true);

            const response = await axiosInstance.post(

                "/api/email/send",

                {

                    to: candidate.email,
                    subject,
                    message,

                },

                {

                    withCredentials: true,

                }

            );

            alert(response.data.message);

            onClose();

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Failed to send email"

            );

        }

        finally {

            setLoading(false);

        }

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-lg w-162.5 max-w-[95%]">

                {/* Header */}

                <div className="flex justify-between items-center px-6 py-4 border-b">

                    <h2 className="text-2xl font-bold">
                        Send Email
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500"
                    >
                        <MdClose size={24} />
                    </button>

                </div>


                {/* Body */}

                <div className="p-6 space-y-5">

                    <div>

                        <label className="font-medium text-gray-700">
                            To
                        </label>

                        <input
                            type="text"
                            value={candidate.email}
                            readOnly
                            className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-100"
                        />

                    </div>


                    <div>

                        <label className="font-medium text-gray-700">
                            Subject
                        </label>

                        <input
                            type="text"
                            value={subject}
                            onChange={(e) =>
                                setSubject(e.target.value)
                            }
                            className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:border-purple-600"
                        />

                    </div>


                    <div>

                        <label className="font-medium text-gray-700">
                            Message
                        </label>

                        <textarea
                            rows={10}
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:border-purple-600 resize-none"
                        />

                    </div>

                </div>


                {/* Footer */}

                <div className="flex justify-end gap-3 px-6 py-4 border-t">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSendEmail}
                        disabled={loading}
                        className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
                    >

                        {

                            loading

                                ? "Sending..."

                                : "Send Email"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default EmailModal;