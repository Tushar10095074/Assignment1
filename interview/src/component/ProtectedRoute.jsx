import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const { role } = useContext(RoleContext);
  const location = useLocation();

  if (!token) return <Navigate to="/" replace />;

  const currentRole = role || localStorage.getItem("role");

  if (
    currentRole !== "Admin" &&
    (location.pathname === "/List" || location.pathname === "/Stepperform")
  ) {
    return <Navigate to="/Product" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

