import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const location = useLocation();
    const userRole = localStorage.getItem('userRole'); 

    if (userRole !== 'admin') {
        return <Navigate to="/recipes" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;
