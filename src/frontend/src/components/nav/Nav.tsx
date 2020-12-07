import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { authenticationService } from "../../Helpers/Authenthication";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const currentUser = authenticationService.currentUserValue;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            OptoX
          </Typography>
          {(currentUser.Type === "Administrator" ||
            currentUser.Type === "Customer") && (
            <Button onClick={() => history.push("/customer")} color="inherit">
              Customer
            </Button>
          )}
          {currentUser.Type === "Administrator" && (
            <Button onClick={() => history.push("/admin")} color="inherit">
              Admin
            </Button>
          )}
          {(currentUser.Type === "Administrator" ||
            currentUser.Type === "Optician") && (
            <Button onClick={() => history.push("/optician")} color="inherit">
              Optician
            </Button>
          )}
          {(currentUser.Type === "Administrator" ||
            currentUser.Type === "Ophtalmologist") && (
            <Button
              onClick={() => history.push("/ophtalmologist")}
              color="inherit"
            >
              Ophtalmologist
            </Button>
          )}
          <Button
            onClick={() => {
              authenticationService.logout();
              history.push("/login");
            }}
            color="inherit"
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
