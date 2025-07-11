import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../Loading/Loading";

function PrivateRoute({children}) {
  const { user, loading } = useAuth();
  const location = useLocation()
  if (loading) {
    return <Loading></Loading>
  }
  if(!user){
    return <Navigate state={location.pathname} to="/login"></Navigate>
  }
  return children;
}

export default PrivateRoute;
