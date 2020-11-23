/* eslint-disable jsx-a11y/alt-text */
import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ProfileExamplePic from "../../assets/profile.svg";
import FinlandFlag from "../../assets/finland_flag.svg";

import { GreenButton } from "../../components/button/buttons";

import ManageOpticians from "./components/ManageOpticians";
import ManageOphtalmologists from "./components/ManageOphtalmologists";
import ManageEmployees from "./components/ManageEmployees";
import ManageAgreements from "./components/ManageAgreements";
import ManageCustomers from "./components/ManageCustomers";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: "none",
    width: "50%",
    left: "55%",
    height: "3.5em",
  },
  root: {
    flexGrow: 1,
  },
  selectaction: {
    marginTop: "0.75em",
    marginBottom: "1em",
    color: "white",
    fontWeight: "normal",
    float: "right",
  },
  phototext: {
    color: "white",
    fontWeight: "normal",
    marginTop: "0.75em",
    marginBottom: "0.2em",
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
    top: "40em",
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
  list: {
    width: "100%",
    position: "relative",
    overflow: "auto",
    maxHeight: 600,
    padding: 0,
  },
}));
export enum ScreenStates {
  landScreen = 0,
  manageOpticians = 1,
  manageOphthalmologists = 2,
  manageAgreements = 3,
  manageEmployees = 4,
  manageCustomers = 5,
}

export default function Admin() {
  const [values, setValues] = React.useState({
    state: ScreenStates.landScreen,
  });
  const classes = useStyles();
  const setScreen = (state: ScreenStates) => {
    setValues({ ...values, state: state });
  };
  const renderSwitch = (state: ScreenStates) => {
    switch (state) {
      case ScreenStates.landScreen:
        return (
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
                  Hello administrator Matti Meikäläinen!
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
              <div style={{ float: "right" }}>
                <Typography className={classes.selectaction} variant="h3">
                  Please select the action:
                </Typography>
                <div>
                  <GreenButton
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<ArrowRightIcon />}
                    onClick={() =>
                      setValues({
                        ...values,
                        state: ScreenStates.manageOpticians,
                      })
                    }
                  >
                    Manage opticians
                  </GreenButton>
                  <GreenButton
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<ArrowRightIcon />}
                    onClick={() =>
                      setValues({
                        ...values,
                        state: ScreenStates.manageOphthalmologists,
                      })
                    }
                  >
                    Manage opthalmologists
                  </GreenButton>
                  <GreenButton
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<ArrowRightIcon />}
                    onClick={() =>
                      setValues({
                        ...values,
                        state: ScreenStates.manageAgreements,
                      })
                    }
                  >
                    Manage agreements
                  </GreenButton>
                  <GreenButton
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<ArrowRightIcon />}
                    onClick={() =>
                      setValues({
                        ...values,
                        state: ScreenStates.manageEmployees,
                      })
                    }
                  >
                    Manage employees
                  </GreenButton>
                  <GreenButton
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<ArrowRightIcon />}
                    onClick={() =>
                      setValues({
                        ...values,
                        state: ScreenStates.manageCustomers,
                      })
                    }
                  >
                    Manage customers
                  </GreenButton>
                </div>
                <Typography className={classes.earnedtext}>
                  You have earned so far: 950 050 €
                </Typography>
              </div>
            </Grid>
          </Grid>
        );
      case ScreenStates.manageOphthalmologists:
        return <ManageOphtalmologists setScreen={setScreen} />;
      case ScreenStates.manageCustomers:
        return <ManageCustomers setScreen={setScreen} />;
      case ScreenStates.manageOpticians:
        return <ManageOpticians setScreen={setScreen} />;
      case ScreenStates.manageAgreements:
        return <ManageAgreements setScreen={setScreen} />;
      case ScreenStates.manageEmployees:
        return <ManageEmployees setScreen={setScreen} />;
      default:
        break;
    }
  };
  return (
    <div className={classes.maindiv}>
      <div className={classes.container}>{renderSwitch(values.state)}</div>
    </div>
  );
}
