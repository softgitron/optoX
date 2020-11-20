import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Login from "./pages/Login/Login";
import Customer from "./pages/Customer/Customer";
import Admin from "./pages/Admin/Admin";
import Optician from "./pages/Optician/Optician";
import Opthalmologist from "./pages/Ophthalmologist/Ophthalmologist";

export default function App() {
  return (
    <Router>
      {/* TODO autnethication for navbar, show links accordingly to role */}
      <Nav />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/Customer">
          <Customer />
        </Route>
        <Route path="/Admin">
          <Admin />
        </Route>
        <Route path="/Optician">
          <Optician />
        </Route>
        <Route path="/Opthalmologist">
          <Opthalmologist />
        </Route>
        <Route path="/">
          <Login /> {/**TODO: rerouting if not authenthicated, 404 page etc. */}
        </Route>
      </Switch>
    </Router>
  );
}
