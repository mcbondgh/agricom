import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthUserContext } from "../contextManager/context/AppContext";
import PropTypes from "prop-types";
import { Spinner } from "flowbite-react"; // Optional: Import Flowbite Spinner

export function ProtectedRoutes() {
    const { loading, authenticated } = useContext(AuthUserContext);
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black/50 backdrop-blur-sm">
            <Spinner color="success" className="text-green-800" size="xl" aria-label="Loading..." />
            <span className="ml-3 text-white text-lg">Loading, please wait...</span>
        </div>
        ); 
    }
    return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

ProtectedRoutes.propTypes = {
    children: PropTypes.node,
};
