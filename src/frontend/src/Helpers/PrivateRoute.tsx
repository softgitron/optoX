import React from "react";
import { Route, Redirect } from "react-router-dom";

import { authenticationService } from "./Authenthication";
import Nav from "../components/nav/Nav";

var jwtDecode = require("jwt-decode");

export const PrivateRoute = ({ component: Component, roles, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue;
      console.log(currentUser);
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      // If/when JWT will have exp & iat
      /*       if (jwtDecode(currentUser.token).exp < Date.now() / 1000) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      } */
      if (roles && roles.indexOf(currentUser.Type) === -1) {
        // check if route is restricted by role
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/login" }} />;
      }
      // authorised so return component
      return (
        <>
          <Nav />
          <Component
            {...props}
            data={rest.data}
            darkMode={rest.darkMode}
            loadUser={rest.loadUser}
          />
        </>
      );
    }}
  />
);
