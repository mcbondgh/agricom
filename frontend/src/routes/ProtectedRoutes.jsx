import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contextManager/context/AppContext';

export function ProtectedRoutes() {
    const { user, loading } = useContext(UserContext);

    if (loading) return <p>Loading...</p>; // Show loading screen while checking
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

ProtectedRoutes.propTypes = {
    children: PropTypes.node
};
