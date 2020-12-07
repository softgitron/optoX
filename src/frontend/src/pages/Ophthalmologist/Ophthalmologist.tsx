/* eslint-disable jsx-a11y/alt-text */
import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ProfileExamplePic from "../../assets/profile.svg";
import FinlandFlag from "../../assets/finland_flag.svg";

import { GreenButton, RedButton } from "../../components/button/buttons";

import Card from "./components/Card";
import List from "@material-ui/core/List";
import Modal from "../Optician/components/BiggerModal";
import { authenticationService } from "../../Helpers/Authenthication";

const patient1 = {
  id: "123",
  firstname: "Matti",
  lastname: "Meikäläinen",
  date: "10.10.2020 11:10",
  opticalRetail: "Specsavers",
  fundusfotoURL:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fundus_photograph_of_normal_right_eye.jpg/1024px-Fundus_photograph_of_normal_right_eye.jpg",
  octscanURL:
    "https://res.cloudinary.com/leightons/image/upload/8e5o8rPzdH5ykKhZ41kGM9rzlIEdTWS4ssjcKUEV.jpeg",
  visualfieldURL:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fundus_photograph_of_normal_right_eye.jpg/1024px-Fundus_photograph_of_normal_right_eye.jpg",
};
const patient2 = {
  id: "1234",
  firstname: "Seppo",
  lastname: "Meikäläinen",
  date: "20.09.2020 17:20",
  opticalRetail: "Instrumentarium",
  fundusfotoURL:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fundus_photograph_of_normal_right_eye.jpg/1024px-Fundus_photograph_of_normal_right_eye.jpg",
  octscanURL:
    "https://www.aao.org/image.axd?id=d176ad37-e1c1-4090-a7be-fc863dc43756&t=636737514114430000",
  visualfieldURL:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fundus_photograph_of_normal_right_eye.jpg/1024px-Fundus_photograph_of_normal_right_eye.jpg",
};
const patient3 = {
  id: "1235",
  firstname: "Heikki",
  lastname: "Heikäläinen",
  date: "01.08.2020 06:50",
  opticalRetail: "Instrumentarium",
  fundusfotoURL:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fundus_photograph_of_normal_right_eye.jpg/1024px-Fundus_photograph_of_normal_right_eye.jpg",
  octscanURL:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd1norq-TYlg_6xe7G6kj1Xv6CPOoLLlUBew&usqp=CAU",
  visualfieldURL:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fundus_photograph_of_normal_right_eye.jpg/1024px-Fundus_photograph_of_normal_right_eye.jpg",
};
const patientsArray = [patient1, patient2, patient3];

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
enum ScreenStates {
  landScreen = 0,
  analyzeImages = 1,
}

export default function Ophthamologist() {
  const [patients, setPatients] = React.useState({
    patients: patientsArray,
    selectedPatient: 0,
  });
  const [values, setValues] = React.useState({
    state: ScreenStates.landScreen,
  });
  const [openModal, setopenModal] = React.useState({
    show: false,
    url: "",
  });
  const classes = useStyles();
  const handlePreview = (url: any) => {
    console.log(url);
    setopenModal({
      ...openModal,
      url: url,
      show: true,
    });
  };
  const setModal = (value: boolean) => {
    setopenModal({ ...openModal, show: value });
  };
  const selectPatient = (index: number) => [
    setPatients({ ...patients, selectedPatient: index }),
  ];
  const [user, setUser] = React.useState(
    authenticationService.currentUserValue
  );
  console.log(user);
  const renderSwitch = (state: ScreenStates) => {
    switch (state) {
      case 0:
        return (
          <>
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
                    Hello ophthamologist {user.FirstName} {user.LastName}!
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
                          state: ScreenStates.analyzeImages,
                        })
                      }
                    >
                      Analyze images
                    </GreenButton>
                  </div>
                  <Typography className={classes.earnedtext}>
                    You have earned so far: 950 050 €
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography
                  style={{ float: "left" }}
                  className={classes.selectaction}
                  variant="h3"
                >
                  Patients to be analyzed:
                </Typography>
                <div
                  style={{
                    backgroundColor: "#2d2d2db0",
                    height: "600px",
                    marginTop: "150px",
                    position: "relative",
                    width: "520px",
                    WebkitBoxShadow: "10px 6px 17px -10px rgba(0,0,0,0.75)",
                    MozBoxShadow: "10px 6px 17px -10px rgba(0,0,0,0.75)",
                    boxShadow: "10px 6px 17px -10px rgba(0,0,0,0.75)",
                  }}
                >
                  <List className={classes.list}>
                    {patients.patients.map((patient, index) => (
                      <Card
                        key={patient.id}
                        firstname={patient.firstname}
                        lastname={patient.lastname}
                        opticalRetail={patient.opticalRetail}
                        date={patient.date}
                        index={index}
                        selectPatient={selectPatient}
                        selectedPatient={patients.selectedPatient}
                      />
                    ))}
                  </List>
                </div>
                <RedButton
                  style={{ width: "180px", marginTop: "40px" }}
                  className={classes.button}
                  onClick={() =>
                    setValues({ ...values, state: ScreenStates.landScreen })
                  }
                >
                  Back to home
                </RedButton>
              </Grid>
              <Grid item xs={8}>
                <div
                  style={{
                    backgroundColor: "#2d2d2db0",
                    height: "600px",
                    marginTop: "150px",
                    position: "relative",
                    width: "1160px",
                    WebkitBoxShadow: "10px 6px 17px -10px rgba(0,0,0,0.75)",
                    MozBoxShadow: "10px 6px 17px -10px rgba(0,0,0,0.75)",
                    boxShadow: "10px 6px 17px -10px rgba(0,0,0,0.75)",
                  }}
                >
                  <div
                    style={{
                      marginLeft: "35px",
                      position: "relative",
                      top: "20px",
                    }}
                  >
                    <Typography className={classes.phototext} variant="h5">
                      Fundusfoto:
                    </Typography>
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handlePreview(
                          patients.patients[patients.selectedPatient]
                            .fundusfotoURL
                        );
                      }}
                      width="220"
                      src={
                        patients.patients[patients.selectedPatient]
                          .fundusfotoURL
                      }
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: "35px",
                      position: "relative",
                      top: "20px",
                    }}
                  >
                    <Typography className={classes.phototext} variant="h5">
                      Visualfield:
                    </Typography>
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handlePreview(
                          patients.patients[patients.selectedPatient]
                            .visualfieldURL
                        );
                      }}
                      width="220"
                      src={
                        patients.patients[patients.selectedPatient]
                          .visualfieldURL
                      }
                    />
                  </div>
                  <div
                    style={{
                      position: "relative",
                      left: "400px",
                      top: "-536px",
                    }}
                  >
                    <Typography className={classes.phototext} variant="h5">
                      Oct scan:
                    </Typography>
                    <img
                      onClick={() => {
                        handlePreview(
                          patients.patients[patients.selectedPatient].octscanURL
                        );
                      }}
                      style={{ cursor: "pointer" }}
                      height="180"
                      src={
                        patients.patients[patients.selectedPatient].octscanURL
                      }
                    />
                  </div>
                  <GreenButton
                    style={{
                      width: "100px",
                      top: "-300px",
                      float: "right",
                      margin: "10px",
                      left: "-20px",
                    }}
                    onClick={() => setValues({ ...values, state: 0 })}
                  >
                    Approve
                  </GreenButton>
                  <RedButton
                    style={{
                      width: "100px",
                      top: "-300px",
                      float: "right",
                      margin: "10px",
                      left: "-20px",
                    }}
                    onClick={() => setValues({ ...values, state: 0 })}
                  >
                    Reject
                  </RedButton>
                </div>
              </Grid>
            </Grid>
          </>
        );
      default:
        break;
    }
  };
  return (
    <div className={classes.maindiv}>
      <Modal url={openModal.url} show={openModal.show} setModal={setModal} />

      <div className={classes.container}>{renderSwitch(values.state)}</div>
    </div>
  );
}
