import {
  Avatar,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ProfileExamplePic from "../../assets/profile.svg";
import FinlandFlag from "../../assets/finland_flag.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    height: "110vh",
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
    top: "45em",
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
  progressWrapper: {
    backgroundColor: "white",

    marginTop: "100px",
    width: "1000px",
  },
}));

export default function Optician() {
  const [values, setValues] = React.useState({
    state: 2,
  });

  const classes = useStyles();
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
                Hello customer Matti Meikäläinen!
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
                Driver license renewal progress:
              </Typography>

              <div
                style={{
                  width: "1100px",
                  height: "300px",
                  marginTop: "150px",
                }}
              >
                <Grid
                  container
                  style={{
                    right: "140px",
                    position: "relative",
                  }}
                >
                  <Grid item xs={3}>
                    <div
                      style={{
                        color: "white",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      Waiting for pictures
                    </div>
                    <div
                      style={{
                        color: "white",
                        position: "relative",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <ExpandMoreIcon />
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    style={{ left: "92px", position: "relative" }}
                  >
                    <div
                      style={{
                        color: "white",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      Pictures uploaded
                    </div>
                    <div
                      style={{
                        color: "white",
                        position: "relative",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <ExpandMoreIcon />
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    style={{ left: "185px", position: "relative" }}
                  >
                    <div
                      style={{
                        color: "white",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      Pictures analyzed
                    </div>
                    <div
                      style={{
                        color: "white",
                        position: "relative",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <ExpandMoreIcon />
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    style={{ left: "275px", position: "relative" }}
                  >
                    <div
                      style={{
                        color: "white",
                        right: "75px",
                        position: "relative",
                      }}
                    >
                      Results sent to administration
                    </div>
                    <div
                      style={{
                        color: "white",
                        position: "relative",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <ExpandMoreIcon />
                    </div>
                  </Grid>
                </Grid>

                <LinearProgress variant="determinate" value={(3 / 3) * 100} />
              </div>

              <div>
                <GreenButton
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => null}
                >
                  Download fundusfoto
                </GreenButton>
              </div>
              <div>
                <GreenButton
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => null}
                >
                  Download oct scan
                </GreenButton>
              </div>
              <div>
                <GreenButton
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => null}
                >
                  Download visualfield
                </GreenButton>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div>
                <RedButton
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => null}
                >
                  Log out
                </RedButton>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
