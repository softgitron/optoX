/* eslint-disable jsx-a11y/alt-text */
import {
  Avatar,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ProfileExamplePic from "../../assets/profile.svg";
import FinlandFlag from "../../assets/finland_flag.svg";

import { GreenButton, RedButton } from "../../components/button/buttons";

import Card from "./components/Card";
import List from "@material-ui/core/List";
import Modal from "../Optician/components/BiggerModal";
import { authenticationService } from "../../Helpers/Authenthication";
import {
  getCustomerInfo,
  getImage,
  getInspectionInfo,
  getOpthalmologistCustomers,
} from "../../API/API";

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
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fundus_photograph_of_normal_right_eye.jpg/1024px-Fundus_photograph_of_normal_right_eye.jpg",
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
interface CustomerData {
  CustomerCountry: string;
  CustomerID: number;
  Email: string;
  FirstName: string;
  FundusPhotoRef: any;
  InspectionCountry: string;
  InspectionId: string;
  InspectionTime: string;
  LastName: string;
  LoginToken: string;
  OctScanRef: any;
  OpthalmologistID: number;
  OpticianID: number;
  SocialSecurityNumber: string;
  Status: any;
  VisualFieldRef: any;
}

export default function Ophthamologist() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);
      let finalArray: CustomerData[] = [];
      let map = new Map();
      const customersArray = await getOpthalmologistCustomers();
      let promises: any[] = [];
      customersArray.forEach((customer: any) => {
        map.set(customer.CustomerID, customer);
        promises.push(getCustomerInfo(customer.CustomerID));
      });
      await Promise.all(promises).then((values) => {
        values.forEach((newCustomerData) => {
          let initialCustomerData = map.get(newCustomerData.CustomerID);
          let finalCustomerData = {
            ...initialCustomerData,
            ...newCustomerData,
          };
          finalArray.push(finalCustomerData);
        });
      });
      console.log(finalArray);
      await Promise.all(
        finalArray.map(async (customer) => {
          const fundusFoto = await getImage((439189665).toString());
          console.log(fundusFoto);
          const octScan = await getImage(customer.OctScanRef.toString());
          const visualField = await getImage(
            customer.VisualFieldRef.toString()
          );
          customer.FundusPhotoRef =
            fundusFoto ||
            "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png";
          customer.OctScanRef =
            octScan ||
            "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png";
          customer.VisualFieldRef =
            visualField ||
            "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png";
        })
      );
      setPatients(finalArray);
      setLoading(false);
    };
    getCustomers();
  }, []);
  const [patients, setPatients] = React.useState<CustomerData[] | undefined>(
    undefined
  );
  const [selectedPatient, setSelectedPatient] = React.useState(0);

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
  const selectPatient = (index: number) => [setSelectedPatient(index)];
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
                  <div
                    style={{
                      position: "absolute",
                      top: "35%",
                      left: "43%",
                    }}
                  >
                    {loading ? <CircularProgress /> : null}
                  </div>

                  <List className={classes.list}>
                    {patients?.map((patient, index) => (
                      <Card
                        key={patient.CustomerID}
                        firstname={patient.FirstName}
                        lastname={patient.LastName}
                        opticalRetail={patient.Email}
                        date={patient.InspectionTime}
                        index={index}
                        selectPatient={selectPatient}
                        selectedPatient={selectedPatient}
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

                    {patients && (
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (patients) {
                            handlePreview(
                              patients[selectedPatient].FundusPhotoRef
                            );
                          }
                        }}
                        width="220"
                        height="220"
                        src={patients[selectedPatient].FundusPhotoRef}
                      />
                    )}
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
                    {patients && (
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (patients) {
                            handlePreview(
                              patients[selectedPatient].VisualFieldRef
                            );
                          }
                        }}
                        width="220"
                        height="220"
                        src={patients[selectedPatient].VisualFieldRef}
                      />
                    )}
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
                    {patients && (
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (patients) {
                            handlePreview(patients[selectedPatient].OctScanRef);
                          }
                        }}
                        width="220"
                        height="220"
                        src={patients[selectedPatient].OctScanRef}
                      />
                    )}
                  </div>
                  {loading ? null : (
                    <>
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
                    </>
                  )}
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
