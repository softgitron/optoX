import {
  Grid,
  List,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert/Alert";
import React, { SyntheticEvent } from "react";
import { RedButton } from "../../../components/button/buttons";
import { ScreenStates } from "../Admin";
import Card from "./Card";
import CreateEmployee from "./CreateEmployee";
import EmployeeSearchBar from "./EmployeeSearchBar";

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
  list: {
    width: "100%",
    position: "relative",
    overflow: "auto",
    maxHeight: 600,
    padding: 0,
  },
}));

const employee1 = {
  id: "123",
  firstname: "Matti",
  lastname: "Meikäläinen",
  email: "Matti.meikäläinen@hotmail.fi",
  role: 0,
};
const employee2 = {
  id: "1234",
  firstname: "Seppo",
  lastname: "Meikäläinen",
  email: "Seppo.meikäläinen@hotmail.fi",
  role: 1,
};
const employee3 = {
  id: "1235",
  firstname: "Heikki",
  lastname: "Heikäläinen",
  email: "Heikki.Heikäläinen@hotmail.fi",
  role: 1,
};
const employeesArray = [employee1, employee2, employee3];

export default function ManageEmployees({
  setScreen,
}: {
  setScreen: (state: ScreenStates) => void;
}) {
  const classes = useStyles();
  //Snackbar
  const [open, setOpen] = React.useState(false);
  const [successText, setSuccessText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const handleClick = () => {
    setOpen(false);
    setOpen(true);
  };
  const handleClose = (event: SyntheticEvent<Element, Event>, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [employees, setEmployees] = React.useState({
    employees: employeesArray,
  });
  const [filteredEmployees, setFilteredEmployees] = React.useState(
    employees.employees
  );
  //get employees through api
  const deleteEmployee = async (id: string) => {
    console.log("deleting employee?");
    employees.employees.splice(
      employees.employees.findIndex((a) => a.id === id),
      1
    );
    setSuccessText("Employee successfully deleted!");
    handleClick();
  };

  const createAccount = async (account: any) => {
    employees.employees.push(account);
    setSuccessText("Employee successfully created!");
    handleClick();
  };
  const setFilter = (search: string, role: number) => {
    console.log(search);
    console.log(role);
    if (search === "") {
      let newArray = employees.employees.filter(function (el) {
        return el.role === role || role === 2;
      });
      setFilteredEmployees(newArray);
      return;
    }
    let newArray = employees.employees.filter(function (el) {
      return (
        (el.firstname.toLowerCase().includes(search.toLowerCase()) ||
          el.lastname.toLowerCase().includes(search.toLowerCase())) &&
        (el.role === role || role === 2)
      );
    });
    setFilteredEmployees(newArray);
    console.log(newArray);
  };
  return (
    <>
      <Grid container spacing={3}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="success">{successText}</Alert>
        </Snackbar>
        <Grid item xs={4}>
          <Typography
            style={{ float: "left" }}
            className={classes.selectaction}
            variant="h3"
          >
            Manage Employees:
          </Typography>
          <EmployeeSearchBar setValues={setFilter} />
          <div
            style={{
              backgroundColor: "#2d2d2db0",
              height: "600px",
              marginTop: "0px",
              position: "relative",
              width: "520px",
              WebkitBoxShadow: "10px 6px 17px -10px rgba(0,0,0,0.75)",
              MozBoxShadow: "10px 6px 17px -10px rgba(0,0,0,0.75)",
              boxShadow: "10px 6px 17px -10px rgba(0,0,0,0.75)",
            }}
          >
            <List className={classes.list}>
              {filteredEmployees.map((employee, index) => (
                <Card
                  id={employee.id}
                  key={employee.id}
                  firstname={employee.firstname}
                  lastname={employee.lastname}
                  role={employee.role}
                  email={employee.email}
                  index={index}
                  deleteEmployee={deleteEmployee}
                />
              ))}
            </List>
          </div>
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
          <Typography
            style={{ float: "left" }}
            className={classes.selectaction}
            variant="h3"
          >
            Create an employee:
          </Typography>
          <br />
          <br />
          <br />
          <br />
          <CreateEmployee createAccount={createAccount} />
        </Grid>
      </Grid>
    </>
  );
}
