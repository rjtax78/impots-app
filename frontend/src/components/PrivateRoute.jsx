import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = () => {
  const { infoUser } = useSelector((state) => state.auth);

  return infoUser ? <Outlet /> : <Navigate to="/landing-page" replace />;
};

export default PrivateRoute;
