import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthUserContext } from "../contextManager/context/AppContext";
import PropTypes from "prop-types";
import { Loader } from "@/components/ui/Loader";

export function ProtectedRoutes() {
    const { loading, authenticated } = useContext(AuthUserContext);
    if (loading) {
        return (<Loader/>); 
    }
    return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

ProtectedRoutes.propTypes = {
    children: PropTypes.node,
};
