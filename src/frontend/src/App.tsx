import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Customer from "./pages/Customer/Customer";
import Admin from "./pages/Admin/Admin";
import Optician from "./pages/Optician/Optician";
import Opthalmologist from "./pages/Ophthalmologist/Ophthalmologist";
import { PrivateRoute } from "./Helpers/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute
          path="/Customer"
          component={Customer}
          roles={["Customer", "Administrator"]}
        />
        <PrivateRoute
          path="/Admin"
          component={Admin}
          roles={["Administrator"]}
        />
        <PrivateRoute
          path="/Optician"
          component={Optician}
          roles={["Optician", "Administrator"]}
        />
        <PrivateRoute
          path="/Opthalmologist"
          component={Opthalmologist}
          roles={["Opthalmologist", "Administrator"]}
        />
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
