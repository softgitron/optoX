import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { RedButton } from "../../../components/button/buttons";
import { ScreenStates } from "../Admin";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: "none",
    width: "50%",
    left: "55%",
    height: "3.5em",
  },
  selectaction: {
    marginTop: "0.75em",
    marginBottom: "1em",
    color: "white",
    fontWeight: "normal",
    float: "right",
  },
}));

export default function ManageAgreements({
  setScreen,
}: {
  setScreen: (state: ScreenStates) => void;
}) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography
            style={{ float: "left" }}
            className={classes.selectaction}
            variant="h3"
          >
            Manage Agreements:
          </Typography>

          <RedButton
            style={{ width: "180px", marginTop: "40px" }}
            className={classes.button}
            onClick={() => {
              setScreen(ScreenStates.landScreen);
            }}
          >
            Back to home
          </RedButton>
        </Grid>
        <Grid item xs={8}>
          Stuff
        </Grid>
      </Grid>
    </>
  );
}
