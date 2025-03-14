import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth0();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
