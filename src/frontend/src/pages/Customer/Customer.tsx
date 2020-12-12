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

import { GreenButton, RedButton } from "../../components/button/buttons";

import axios from "axios";
import fileDownload from "js-file-download";
import { authenticationService } from "../../Helpers/Authenthication";
import { useHistory } from "react-router-dom";
import {
  customerGetOwnInfo,
  downloadImage,
  getInspectionInfoCID,
} from "../../API/API";

const handleDownload = (url: string, filename: string) => {
  axios
    .get(url, {
      responseType: "blob",
    })
    .then((res) => {
      console.log(res);
      fileDownload(res.data, filename);
    });
};

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

export default function Customer() {
  const [user, setUser] = React.useState(
    authenticationService.currentUserValue
  );
  React.useEffect(() => {
    const getInspections = async () => {
      const inspections = await getInspectionInfoCID(user.ID);
      for (const inspection of inspections) {
        if (inspection.LoginToken === user.loginToken) {
          console.log("Found match");
          setInspectionData(inspection);
        }
      }
    };
    getInspections();
  }, []);
  const [inspectionData, setInspectionData] = React.useState<any | undefined>(
    undefined
  );
  const [values, setValues] = React.useState({
    state: 0,
  });
  const classes = useStyles();

  const history = useHistory();
  console.log(user);
  const renderSwitch = (state: any) => {
    switch (state) {
      case "Waiting":
        return <p>Waiting for pictures.</p>;
      case "InProgress":
        return (
          <p>
            Pictures has been now successfully taken. Next pictures will be
            analyzed by the ophthalmologist. If the ophthalmologist approves the
            images, results will be send directly to the drivers license. If the
            pictures are rejected, new time must be reserved for the optician.
          </p>
        );
      case "Approved":
        return (
          <p>
            Pictures analyzed. The results are: Approved. The results will be
            next sent to administration.
          </p>
        );
      case "Rejected":
        return (
          <p>
            Pictures analyzed. The results are: Rejected. The results will be
            next sent to administration.
          </p>
        );
      default:
        return <p>Waiting for pictures.</p>;
    }
  };
  const getNumberState = () => {
    switch (inspectionData?.Status) {
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
                Hello customer {user.FirstName}
                {user.LastName}!
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
                Driver license renewal progress:&nbsp;
                <b style={{ color: "green" }}>
                  {inspectionData?.Status === "Approved" ? "Approved" : null}
                </b>
                <b style={{ color: "red" }}>
                  {inspectionData?.Status === "Rejected" ? "Rejected" : null}
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
                    downloadImage("fundusfoto", inspectionData?.FundusPhotoRef);
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
                    downloadImage("octscan", inspectionData?.OctScanRef);
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
                    downloadImage(
                      "visualfield",
                      inspectionData?.VisualFieldRef
                    );
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
                {renderSwitch(inspectionData?.Status)}
              </div>
              <div>
                <RedButton
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ marginTop: "60px" }}
                  onClick={() => {
                    authenticationService.logout();
                    history.push("/login");
                  }}
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
