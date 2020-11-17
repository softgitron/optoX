import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
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
  selectaction: {
    marginTop: "1.25em",
    marginBottom: "1.5em",
    color: "white",
    fontWeight: "normal",
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
}));

export default function Optician() {
  const classes = useStyles();
  return (
    <div className={classes.maindiv}>
      <div className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            {/* Avatars etc.*/}
          </Grid>
          <Grid item xs={6}>
            <div style={{ float: "right" }}>
              <Typography className={classes.selectaction} variant="h3">
                Please select the action:
              </Typography>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<ArrowRightIcon />}
                >
                  Upload new images
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<ArrowRightIcon />}
                >
                  View prior images+
                </Button>
              </div>
              <Typography className={classes.earnedtext}>
                You have earned so far 950 050 €
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
