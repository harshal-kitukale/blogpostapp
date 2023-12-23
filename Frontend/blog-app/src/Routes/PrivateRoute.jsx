import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem("auth");
  console.log(auth);
  if (!auth) {
    return <Navigate to={"/login"}></Navigate>;
}
return children;
};

export default PrivateRoute;
