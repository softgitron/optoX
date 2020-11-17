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
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/Customer">
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
