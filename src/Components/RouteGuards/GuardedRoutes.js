import React from "react";
import { Outlet, Navigate } from "react-router-dom";
 // import { routes } from "../../Utils/constants";

const GuardedRoute= () => {
 const BearerToken = localStorage.getItem('Token');
  // let isVerifiedStatus = localStorage.get("verified");
  // && isVerifiedStatus === verificationStatuses.VERIFIED

  return BearerToken ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default GuardedRoute;
