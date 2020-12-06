import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import { useOutlinedInputStyles } from "../../../assets/styles/styles";

import { GreenButton, RedButton } from "../../../components/button/buttons";
import { MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "1200px",
    padding: "0px",
    color: "white",
    float: "right",
    borderRadius: "5px",
  },
  formtext: {
    fontSize: "1.75rem",
  },
  formtext2: {
    fontSize: "1.20rem",
    marginBottom: theme.spacing(2),
  },
  errorwrapper: {
    fontSize: "1em",
    height: "3em",
    color: "red",
    textAlign: "center",
    marginRight: "12%",
  },
  errortext: {},
  margin: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(20.85),
  },

  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "48ch",
  },
  formControl: {
    marginBottom: theme.spacing(3),
    width: "38ch",
  },
  wrapper: {
    position: "relative",
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "none",
    height: "3.5em",
  },
  buttonswrapper: {
    marginTop: theme.spacing(20),
    float: "right",
  },
  tokentext: {
    display: "inline",
    marginLeft: theme.spacing(21),
    position: "relative",
    top: "18px",
  },
  preview: {},
}));

//const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

export default function InputAdornments(props: any) {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [openModal, setopenModal] = React.useState({
    show: false,
    url: "",
  });
  const [values, setValues] = React.useState({
    email: "",
    firstname: "",
    lastname: "",
    socialnumber: "",
    previewUrl: "",
    role: 0,
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const resetInput = () => {
    setValues({
      ...values,
      email: "",
      firstname: "",
      lastname: "",
      socialnumber: "",
      previewUrl: "",
      role: 0,
    });
  };
  const canSubmit = () => {
    if (
      values.email &&
      values.firstname &&
      values.lastname &&
      values.socialnumber
    ) {
      return true;
    }
    return false;
  };
  return (
    <div className={classes.root}>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-firstname">
          Customer firstname
        </InputLabel>
        <OutlinedInput
          color="primary"
          id="outlined-adornment-fistname"
          value={values.firstname}
          onChange={handleChange("firstname")}
          labelWidth={145}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-lastname">
          Customer lastname
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-lastname"
          value={values.lastname}
          onChange={handleChange("lastname")}
          labelWidth={145}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-email">
          Customer email
        </InputLabel>
        <OutlinedInput
          type="email"
          id="outlined-adornment-email"
          value={values.email}
          onChange={handleChange("email")}
          labelWidth={120}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-socialnumber">
          Customer social security number
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-socialnumber"
          value={values.socialnumber}
          onChange={handleChange("socialnumber")}
          labelWidth={240}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <FormControl
        variant="outlined"
        className={clsx(classes.margin, classes.textField)}
      >
        <InputLabel id="select-label">Select role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values.role}
          onChange={handleChange("role")}
          label=" Select role"
          required={true}
          input={
            <OutlinedInput
              labelWidth={190}
              name="role"
              id="outlined-method"
              classes={outlinedInputClasses}
            />
          }
        >
          <MenuItem value={0}>Optician</MenuItem>
          <MenuItem value={1}>Opthalmologist</MenuItem>
        </Select>
      </FormControl>
      <div className={classes.buttonswrapper}>
        <GreenButton
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!canSubmit()}
          onClick={async () => {
            const employee3 = {
              id: Math.random(),
              firstname: values.firstname,
              lastname: values.lastname,
              role: values.role,
            };
            await props.createAccount(employee3);
            resetInput();
          }}
        >
          Create employee
        </GreenButton>
      </div>
    </div>
  );
}
