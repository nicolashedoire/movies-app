import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../index";

export const getEmail = (state) => state.firebase.auth.email;

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const uid = useContext(AuthContext).uid;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!uid ? <RouteComponent {...routeProps} /> : <Redirect to={"/signin"} />
      }
    ></Route>
  );
};

export default PrivateRoute;
