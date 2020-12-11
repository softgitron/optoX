import {
  Avatar,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import ProfileExamplePic from "../../assets/profile.svg";
import FinlandFlag from "../../assets/finland_flag.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GreenButton, RedButton } from "../../../components/button/buttons";
import { downloadImage } from "../../../API/API";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: "none",
    width: "30%",
    left: "70%",
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
  selectactionnocolor: {
    marginTop: "0.75em",
    marginBottom: "1em",
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
  progressWrapper: {
    backgroundColor: "white",

    marginTop: "100px",
    width: "1000px",
  },
  root2: {
    "&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)": {
      backgroundColor: "#60576b",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#60576b",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#03dac5",
    },
  },
}));
type CustomerData = {
  firstname: string;
  lastname: string;
  email: string;
  loginToken: string;
  inspectionState: string;
  fundusfoto: any;
  octscan: any;
  visualfield: any;
};
export default function Customer({
  CustomerData,
  goBack,
}: {
  CustomerData: CustomerData;
  goBack: () => void;
}) {
  const [values, setValues] = React.useState({
    state: CustomerData.inspectionState || 0,
    numberState: 0,
  });
  const [numberState, setNumberState] = React.useState(0);
  /*  'Waiting', 'InProgress', 'Rejected', 'Approved */
  const getNumberState = () => {
    switch (values.state) {
      case "Waiting":
        return 0;
      case "InProgress":
        return 1;
      case "Rejected":
        return 2;
      case "Approved":
        return 2;
      default:
        return 0;
    }
  };
  const classes = useStyles();
  console.log(values.state);
  const renderSwitch = (state: any) => {
    switch (state) {
      case "Waiting":
        return (
          <p>
            Waiting for pictures.
            <br />
            <br />
            Login token is: {CustomerData.loginToken}
          </p>
        );
      case "InProgress":
        return (
          <p>
            Pictures has been now successfully taken. Next pictures will be
            analyzed by the ophthalmologist. If the ophthalmologist approves the
            images, results will be send directly to the drivers license. If the
            pictures are rejected, new time must be reserved for the optician.
            <br />
            <br />
            Login token is: {CustomerData.loginToken}
          </p>
        );
      case "Approved":
        return (
          <p>
            Pictures analyzed. The results are: Approved. The results will be
            next sent to administration.
            <br />
            <br />
            Login token is: {CustomerData.loginToken}
          </p>
        );
      case "Rejected":
        return (
          <p>
            Pictures analyzed. The results are: Rejected. The results will be
            next sent to administration.
            <br />
            <br />
            Login token is: {CustomerData.loginToken}
          </p>
        );
      default:
        return (
          <p>
            Waiting for pictures. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nulla id quam sed ligula sodales tempus. Quisque
            eget elit ullamcorper, rhoncus elit a, vulputate nunc. Nunc neque
            nibh, facilisis vel sapien ut, pharetra tincidunt dolor. Integer
            libero elit, semper ac odio nec, feugiat aliquet neque. Donec
            accumsan consequat tincidunt.
            <br />
            <br />
            Login token is: {CustomerData.loginToken}
          </p>
        );
    }
  };

  return (
    <>
      <div style={{ float: "right" }}>
        <Typography className={classes.selectaction} variant="h3">
          Driver license renewal progress:&nbsp;
          <b style={{ color: "green" }}>
            {values.state === "Approved" ? "Approved" : null}
          </b>
          <b style={{ color: "red" }}>
            {values.state === "Rejected" ? "Rejected" : null}
          </b>
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
            <Grid item xs={3} style={{ left: "92px", position: "relative" }}>
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
            <Grid item xs={3} style={{ left: "185px", position: "relative" }}>
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
            <Grid item xs={3} style={{ left: "275px", position: "relative" }}>
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

          <LinearProgress
            variant="determinate"
            value={(getNumberState() / 3) * 100}
            classes={{ root: classes.root2 }}
          />
        </div>
        <br />
        <div>
          <GreenButton
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              downloadImage("fundusfoto", CustomerData.fundusfoto);
            }}
          >
            Download fundusfoto
          </GreenButton>
        </div>
        <div>
          <GreenButton
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              downloadImage("octscan", CustomerData.octscan);
            }}
          >
            Download oct scan
          </GreenButton>
        </div>
        <div>
          <GreenButton
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              downloadImage("visualfield", CustomerData.visualfield);
            }}
          >
            Download visualfield
          </GreenButton>
        </div>
        <div
          style={{
            color: "white",
            position: "relative",
            width: "440px",
            height: "0px",
            left: "61%",
            top: "-430px",
          }}
        >
          {renderSwitch(values.state)}
        </div>
        <div
          style={{
            color: "white",
            position: "relative",
            width: "440px",
            height: "0px",
            left: "0%",
            top: "-430px",
          }}
        >
          <p style={{ padding: 0, marginTop: 0, marginBottom: 6 }}>
            Customer details:
          </p>

          <p style={{ padding: 0, marginTop: 0, marginBottom: 6 }}>
            First name: &nbsp; {CustomerData.firstname}
          </p>
          <p style={{ padding: 0, marginTop: 0, marginBottom: 6 }}>
            Last name: &nbsp;{CustomerData.lastname}
          </p>
          <p style={{ padding: 0, marginTop: 0, marginBottom: 6 }}>
            Email: &nbsp; {CustomerData.email}
          </p>
        </div>
        <div>
          <RedButton
            variant="contained"
            color="primary"
            className={classes.button}
            style={{ marginTop: "60px" }}
            onClick={() => goBack()}
          >
            Back
          </RedButton>
        </div>
      </div>
    </>
  );
}
