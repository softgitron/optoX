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
  const [values, setValues] = React.useState({
    state: 0,
  });
  const classes = useStyles();
  const [user, setUser] = React.useState(
    authenticationService.currentUserValue
  );
  const history = useHistory();
  console.log(user);
  const renderSwitch = (state: number) => {
    switch (state) {
      case 0:
        return (
          <p>
            Waiting for pictures. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nulla id quam sed ligula sodales tempus. Quisque
            eget elit ullamcorper, rhoncus elit a, vulputate nunc. Nunc neque
            nibh, facilisis vel sapien ut, pharetra tincidunt dolor. Integer
            libero elit, semper ac odio nec, feugiat aliquet neque. Donec
            accumsan consequat tincidunt. Pellentesque magna neque, pulvinar
            vitae risus ut, faucibus faucibus nisl. Fusce tempor id nisi vitae
            sodales. Maecenas faucibus nisl a metus pharetra feugiat.
          </p>
        );
      case 1:
        return (
          <p>
            Pictures has been now successfully taken. Next pictures will be
            analyzed by the ophthalmologist. If the ophthalmologist approves the
            images, results will be send directly to the drivers license. If the
            pictures are rejected, new time must be reserved for the optician.
          </p>
        );

      case 2:
        return (
          <p>
            Pictures analyzed. In sed euismod nulla. Aliquam ac ante convallis
            mi finibus mattis. Nunc faucibus enim nec commodo imperdiet. Sed leo
            orci, auctor ut purus a, lacinia gravida nulla. Sed eu dolor
            ultrices, sollicitudin tortor non, sodales nisi. Ut molestie porta
            nisi vel fringilla. Sed nisi lorem, porta at porta eget, rhoncus
            eget neque. Aliquam pulvinar, ex vitae semper condimentum, dolor
            nisl pellentesque sapien, fermentum malesuada nibh ipsum vel ligula.
            Nunc nec dolor vel orci feugiat convallis sit amet non elit. Mauris
            porta nibh vel metus maximus, in interdum dui egestas. Aenean sed
            sapien erat.
          </p>
        );
      case 3:
        return (
          <p>
            Results sent to administration. Nulla iaculis porttitor suscipit.
            Donec faucibus tristique vestibulum. Etiam ornare magna est, eu
            aliquet est tincidunt quis. Vivamus suscipit orci mollis, sodales
            purus ac, lacinia purus. Vivamus eget ipsum rhoncus, pharetra ligula
            nec, sagittis diam. Sed fermentum vulputate sem, ut fermentum orci
            hendrerit eu. In libero risus, rutrum eget vulputate vitae, rhoncus
            nec dolor. Maecenas semper ultricies sodales. Phasellus eros ligula,
            vehicula non imperdiet vel, finibus a arcu. Cras nulla nunc,
            imperdiet a sem quis, imperdiet facilisis dui.
          </p>
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

                <LinearProgress
                  variant="determinate"
                  value={(values.state / 3) * 100}
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
                    handleDownload(
                      ProfileExamplePic, // TO BE correct url. Might have cors issues...
                      "fundusfoto." + ProfileExamplePic.split(".").pop() //get file extension hack
                    );
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
            <GreenButton
              onClick={() => {
                setValues({ ...values, state: values.state + 1 });
              }}
              disabled={values.state > 2}
            >
              +
            </GreenButton>
            <GreenButton
              style={{ margin: 20 }}
              onClick={() => {
                setValues({ ...values, state: values.state - 1 });
              }}
              disabled={values.state < 1}
            >
              -
            </GreenButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
