import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { loading, isAuth } = useSelector((state) => state.User);

  return (
    <>
      {loading === false &&
        (isAuth === false ? <Navigate to="/login" /> : children)}
    </>
  );
};

export default ProtectedRoute;
