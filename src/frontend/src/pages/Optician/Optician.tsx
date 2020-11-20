import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import PatientForm from "./components/Patient";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ProfileExamplePic from "../../assets/profile.svg";
import FinlandFlag from "../../assets/finland_flag.svg";

import { GreenButton, RedButton } from "../../components/button/buttons";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: "none",
    width: "60%",
    left: "38%",
    height: "3.5em",
  },
  root: {
    flexGrow: 1,
  },
  selectaction: {
    marginTop: "1.25em",
    marginBottom: "1em",
    color: "white",
    fontWeight: "normal",
    float: "right",
  },
  hellotext: {
    marginTop: "1em",
    marginBottom: "1.5em",
    color: "white",
    fontWeight: "normal",
    fontSize: "2rem",
  },
  maindiv: {
    backgroundColor: "#292929",
    height: "100vh",
  },
  formtext: {
    fontSize: "2rem",
  },
  container: {
    height: "100vh !important",
    marginRight: "5em",
    marginLeft: "5em",
  },
  earnedtext: {
    fontSize: "1.25rem",
    color: "white",
    float: "right",
    position: "absolute",
    bottom: "4em",
    right: "5em",
  },
  flag: {
    position: "absolute",
    top: "48em",
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
  profilewrapper: {
    position: "absolute",
    marginTop: "4em",
    marginLeft: "2em",
  },
}));
enum ScreenStates {
  landScreen = 0,
  uploadImages = 1,
  viewPriorImages = 2,
}

export default function Optician() {
  const [values, setValues] = React.useState({
    state: ScreenStates.landScreen,
  });

  const classes = useStyles();

  const renderSwitch = (state: ScreenStates) => {
    switch (state) {
      case 0:
        return (
          <>
            <Typography className={classes.selectaction} variant="h3">
              Please select the action:
            </Typography>
            <div>
              <GreenButton
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<ArrowRightIcon />}
                onClick={() => setValues({ ...values, state: 1 })}
              >
                Upload new images
              </GreenButton>
            </div>
            <div>
              <GreenButton
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<ArrowRightIcon />}
                onClick={() => setValues({ ...values, state: 2 })}
              >
                View prior images
              </GreenButton>
            </div>
            <Typography className={classes.earnedtext}>
              You have earned so far: 950 050 €
            </Typography>
          </>
        );
      case 1:
        return (
          <>
            <Typography className={classes.selectaction} variant="h3">
              Please fill the forms:
            </Typography>
            <PatientForm goBack={() => setValues({ ...values, state: 0 })} />
          </>
        );

      case 2:
        return (
          <>
            <Typography className={classes.selectaction} variant="h3">
              Do something with these prior images:
            </Typography>
            <RedButton
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<ArrowRightIcon />}
              onClick={() => setValues({ ...values, state: 0 })}
            >
              Back
            </RedButton>
          </>
        );

      default:
        break;
    }
  };
  return (
    <div className={classes.maindiv}>
      <div className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            {/* Avatars etc.*/}
            <div className={classes.profilewrapper}>
              <Avatar
                className={classes.large}
                alt="Profile picture"
                src={ProfileExamplePic}
              />
              <Typography className={classes.hellotext}>
                Hello optician Matti Meikäläinen!
              </Typography>
              <img
                alt={"flag"}
                className={classes.flag}
                src={FinlandFlag}
                width="200"
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ float: "right" }}>{renderSwitch(values.state)}</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
