import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const ProtectedRoute = ({ children, role }) => {

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const verifyUser = async () => {

            try {

                const res = await axiosInstance.get(
                    "/api/auth/me",
                    {
                        withCredentials: true,
                    }
                );

                const user = res.data.user;

                // Check if user has the required role
                if (user.role !== role) {
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }

            } catch (error) {

                setIsAuthenticated(false);

            } finally {

                setLoading(false);

            }

        };

        verifyUser();

    }, [role]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return isAuthenticated
        ? children
        : <Navigate to="/" replace />;
};

export default ProtectedRoute;