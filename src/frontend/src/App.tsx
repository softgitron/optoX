import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Login from "./pages/Login/Login";
import Customer from "./pages/Customer/Customer";
import Admin from "./pages/Admin/Admin";
import Optician from "./pages/Optician/Optician";
import Opthalmologist from "./pages/Ophthalmologist/Ophthalmologist";

import { authenticationService } from "./Helpers/Authenthication";

export default function App() {
  React.useEffect(() => {
    authenticationService.currentUser.subscribe((user) => {
      //subscribe to changes
      if (user) {
        console.log(user);
      }
    });
  }, []);
  return (
    <Router>
      {/* TODO autnethication for navbar, show links accordingly to role */}

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/Customer">
          <Nav />
          <Customer />
        </Route>
        <Route path="/Admin">
          <Nav />
          <Admin />
        </Route>
        <Route path="/Optician">
          <Nav />
          <Optician />
        </Route>
        <Route path="/Opthalmologist">
          <Nav />
          <Opthalmologist />
        </Route>
        <Route path="/">
          <Login /> {/**TODO: rerouting if not authenthicated, 404 page etc. */}
        </Route>
      </Switch>
    </Router>
  );
}
