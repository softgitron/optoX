import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import SignInNormal from "../../components/form/SignIn";
import SignInToken from "../../components/form/TokenSignIn";

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

export default function Login() {
  const classes = useStyles();
  const [isNormalSignUpOn, setNormalSignUp] = React.useState(true);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography className={classes.welcome} variant="h2">
            Welcome to OptoX!
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
