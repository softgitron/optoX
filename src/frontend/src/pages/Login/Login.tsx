import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import SignInNormal from "./components/SignIn";
import SignInToken from "./components/TokenSignIn";
import { authenticationService } from "../../Helpers/Authenthication";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  welcome: {
    color: "white",
    marginTop: "2em",
    letterSpacing: "0.05em",
    fontWeight: "normal",
  },
  container: {
    height: "100vh !important",
  },
  formtext: {
    fontSize: "2rem",
  },
}));

export default function LoginPage() {
  const history = useHistory();
  React.useEffect(() => {
    if (authenticationService.currentUserValue) {
      if (authenticationService.currentUserValue.Type === "Administrator") {
        history.push("/admin");
      }
      if (authenticationService.currentUserValue.Type === "Optician") {
        history.push("/optician");
      }
      if (authenticationService.currentUserValue.Type === "Opthalmologist") {
        history.push("/opthalmologist");
      }
      if (authenticationService.currentUserValue.Type === "Customer") {
        history.push("/customer");
      }
    }
  }, [history]);
  const classes = useStyles();
  const [isNormalSignUpOn, setNormalSignUp] = React.useState(true);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography className={classes.welcome} variant="h2">
            Welcome to OptoX! Version 1.0.0
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {isNormalSignUpOn ? (
            <SignInNormal setNormalSignUp={setNormalSignUp} />
          ) : (
            <SignInToken setNormalSignUp={setNormalSignUp} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
/*    */
