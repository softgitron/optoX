import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import { useOutlinedInputStyles } from "../../assets/styles/styles";

import { GreenButton, RedButton } from "../button/buttons";

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
}));

export default function InputAdornments(props: any) {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [values, setValues] = React.useState({
    password: "",
    email: "",
    showPassword: false,
    verification: "",
    loading: false,
    error: "",
    firstname: "",
    lastname: "",
    socialnumber: "",
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value, error: "" });
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
          labelWidth={150}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-fundus">
          Fundusfoto file
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-fundus"
          labelWidth={150}
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
          labelWidth={150}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-octscan">
          Oct scan file
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-octscan"
          labelWidth={150}
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
        <InputLabel htmlFor="outlined-adornment-visualfield">
          Visualfield file
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-visualfield"
          labelWidth={150}
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
          labelWidth={250}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <div className={classes.tokentext}>
        Login token will be: XYZ3-AD22-1212-0500
      </div>

      <div className={classes.buttonswrapper}>
        <RedButton
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => props.goBack()}
        >
          Back
        </RedButton>
        <GreenButton
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Upload images
        </GreenButton>
      </div>
    </div>
  );
}
