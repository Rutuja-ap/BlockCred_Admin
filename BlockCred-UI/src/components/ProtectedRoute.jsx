import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500" />
          <p className="text-sm text-slate-400">Authenticating session...</p>
        </div>
      </div>
    );
  }

  // Determine fallback login route
  const getLoginRedirect = () => {
    if (allowedRoles?.includes("admin")) return "/admin/login";
    if (allowedRoles?.includes("verifier")) return "/verifier/login";
    return "/student/login";
  };

  if (!isAuthenticated || !user) {
    return <Navigate to={getLoginRedirect()} state={{ from: location }} replace />;
  }

  // Check role authorization
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // If student tries to visit admin, redirect to student dashboard, etc.
    const getDashboardRedirect = () => {
      if (role === "admin") return "/admin/dashboard";
      if (role === "verifier") return "/verifier/dashboard";
      return "/student/dashboard";
    };

    return <Navigate to={getDashboardRedirect()} replace />;
  }

  return children;
}

export default ProtectedRoute;
