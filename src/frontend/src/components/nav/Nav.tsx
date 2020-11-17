import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

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
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            OptoX
          </Typography>
          <Button onClick={() => history.push("/login")} color="inherit">
            Login
          </Button>
          <Button onClick={() => history.push("/customer")} color="inherit">
            Customer
          </Button>
          <Button onClick={() => history.push("/admin")} color="inherit">
            Admin
          </Button>
          <Button onClick={() => history.push("/optician")} color="inherit">
            Optician
          </Button>
          <Button
            onClick={() => history.push("/opthalmologist")}
            color="inherit"
          >
            Ophtalmologist
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
