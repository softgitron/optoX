import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import PatientForm from "./components/Patient";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ProfileExamplePic from "../../assets/profile.svg";
import FinlandFlag from "../../assets/finland_flag.svg";

import { GreenButton, RedButton } from "../../components/button/buttons";
import CustomerInfo from "./components/CustomerInfo";

import AsynchronousSearch from "./components/AsyncSearch";

import { authenticationService } from "../../Helpers/Authenthication";
import {
  getImage,
  getInspectionInfo,
  getInspectionInfoCID,
  getOpticianCustomers,
} from "../../API/API";

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
}));
enum ScreenStates {
  landScreen = 0,
  uploadImages = 1,
  viewPriorImages = 2,
  viewCustomerStatus = 3,
}
interface CustomerData {
  CustomerCountry: string;
  CustomerID: number;
  Email: string;
  FirstName: string;
  LastName: string;
  SocialSecurityNumber: string;
  Inspections: any[];
  FullName: string;
}
export default function Optician() {
  console.log("Hello i am optician");
  const [customers, setCustomers] = React.useState<CustomerData[] | undefined>(
    undefined
  );
  const [chosenCustomer, setChosenCustomer] = React.useState<
    CustomerData | undefined
  >(undefined);

  const [loading, setLoading] = React.useState(false);

  const [values, setValues] = React.useState({
    state: ScreenStates.landScreen,
    selectedAppointment: null,
  });
  React.useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);
      let finalArray: CustomerData[] = [];
      let map = new Map();
      const customersArray = await getOpticianCustomers();

      let promises: any[] = [];
      customersArray.forEach((customer: any) => {
        customer.FullName = customer.FirstName + " " + customer.LastNAme;
        map.set(customer.CustomerID, customer);
        promises.push(getInspectionInfoCID(customer.CustomerID));
      });
      await Promise.all(promises).then((values) => {
        values.forEach((newCustomerData: any[]) => {
          console.log(newCustomerData);
          let initialCustomerData = map.get(newCustomerData[0].CustomerID);
          initialCustomerData.Inspections = newCustomerData;
          finalArray.push(initialCustomerData);
        });
      });

      setCustomers(Array.from(new Set(finalArray)));
      setLoading(false);
    };
    if (values.state === ScreenStates.landScreen) {
      getCustomers();
    }
  }, [values.state]);

  const classes = useStyles();

  const [user, setUser] = React.useState(
    authenticationService.currentUserValue
  );
  console.log(user);
  console.log(customers);
  console.log(chosenCustomer);
  const renderSwitch = (state: ScreenStates) => {
    switch (state) {
      case 0:
        return (
          <>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                {/* Avatars etc.*/}
                <AvatarInfo />
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
                          state: ScreenStates.uploadImages,
                        })
                      }
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
                      onClick={() =>
                        setValues({
                          ...values,
                          state: ScreenStates.viewPriorImages,
                        })
                      }
                    >
                      View prior images
                    </GreenButton>
                  </div>
                </div>
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                {/* Avatars etc.*/}
                <AvatarInfo />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.selectaction} variant="h3">
                  Please fill the forms:
                </Typography>
                <PatientForm
                  goBack={() =>
                    setValues({ ...values, state: ScreenStates.landScreen })
                  }
                />
              </Grid>
            </Grid>
          </>
        );

      case 2:
        return (
          <>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                {/* Avatars etc.*/}
                <AvatarInfo />
              </Grid>
              <Grid item xs={6}>
                <div style={{ float: "right" }}>
                  <Typography className={classes.selectaction} variant="h3">
                    Please fill the forms:
                  </Typography>
                  {loading ? (
                    "Loading.."
                  ) : (
                    <div
                      style={{
                        marginTop: "400px",
                      }}
                    >
                      <AsynchronousSearch
                        customers={customers}
                        selectAppointment={(
                          appointment: any,
                          customerInfo: any
                        ) => {
                          console.log(appointment, customerInfo);
                          setValues({
                            ...values,
                            selectedAppointment: appointment,
                          });
                          setChosenCustomer(customerInfo);
                        }}
                      />
                      <RedButton
                        style={{ left: "30%", width: "100px" }}
                        className={classes.button}
                        onClick={() =>
                          setValues({
                            ...values,
                            state: ScreenStates.landScreen,
                          })
                        }
                      >
                        Back
                      </RedButton>
                      <GreenButton
                        style={{ left: "34%", width: "150px" }}
                        disabled={
                          values.selectedAppointment !== null ? false : true
                        }
                        onClick={() => {
                          setValues({
                            ...values,
                            state: ScreenStates.viewCustomerStatus,
                          });
                        }}
                      >
                        View images
                      </GreenButton>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <AvatarInfo />
            </Grid>
            <Grid item xs={6}>
              <div style={{ float: "right" }}>
                <CustomerInfo
                  CustomerData={{
                    firstname: chosenCustomer?.FirstName || "",
                    lastname: chosenCustomer?.LastName || "",
                    email: chosenCustomer?.Email || "",
                    loginToken:
                      chosenCustomer?.Inspections[values.selectedAppointment!]
                        .LoginToken || "",
                    inspectionState:
                      chosenCustomer?.Inspections[values.selectedAppointment!]
                        .Status || "0",
                    fundusfoto:
                      chosenCustomer?.Inspections[values.selectedAppointment!]
                        .FundusPhotoRef || 0,
                    octscan:
                      chosenCustomer?.Inspections[values.selectedAppointment!]
                        .OctScanRef || 0,
                    visualfield:
                      chosenCustomer?.Inspections[values.selectedAppointment!]
                        .VisualFieldRef || 0,
                  }}
                  goBack={() =>
                    setValues({
                      ...values,
                      state: ScreenStates.landScreen,
                      selectedAppointment: null,
                    })
                  }
                />
              </div>
            </Grid>
          </Grid>
        );
      default:
        break;
    }
  };
  const AvatarInfo = () => {
    return (
      <div className={classes.profilewrapper}>
        <Avatar
          className={classes.large}
          alt="Profile picture"
          src={ProfileExamplePic}
        />
        <Typography className={classes.hellotext}>
          Hello optician {user.FirstName} {user.LastName}!
        </Typography>
        <img
          alt={"flag"}
          className={classes.flag}
          src={FinlandFlag}
          width="200"
        />
      </div>
    );
  };
  return (
    <div className={classes.maindiv}>
      <div className={classes.container}>{renderSwitch(values.state)}</div>
    </div>
  );
}
