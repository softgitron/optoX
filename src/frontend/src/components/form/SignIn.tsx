import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import FormControl from "@material-ui/core/FormControl";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { useOutlinedInputStyles } from "../../assets/styles/styles";
import { GreenButton } from "../button/buttons";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#232323c7",
    maxWidth: "400px",
    maxHeight: "500px",
    minHeight: "500px",
    padding: "30px",
    color: "white",
    marginTop: "20em",
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
    color: "#ff3939",
    textAlign: "center",
    marginRight: "12%",
    marginTop: "1em",
  },
  errortext: {},
  margin: {
    marginBottom: theme.spacing(2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "38ch",
  },
  formControl: {
    marginBottom: theme.spacing(3),
    width: "38ch",
  },
  wrapper: {
    position: "relative",
  },
  spinner: {
    position: "absolute",
    top: "42%",
    left: "80%",
    marginTop: -12,
    marginLeft: -12,
    color: "#03dac5",
  },
  bottomcontent: {
    position: "relative",
    bottom: "-35px",
  },
}));

export default function InputAdornments(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [values, setValues] = React.useState({
    password: "",
    email: "",
    showPassword: false,
    verification: "",
    loading: false,
    error: "",
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value, error: "" });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const signUp = async () => {
    setValues({ ...values, loading: true });
    setTimeout(() => {
      //mock loading
      if (values.email === "error") {
        setValues({
          ...values,
          error: "Invalid credentials. Please try again.",
          loading: false,
        });
      } else {
        setValues({ ...values, error: "", loading: false });
        history.push("/optician");
      }
    }, 2500);
  };
  return (
    <div className={classes.root}>
      <Typography className={classes.formtext}>Please sign in:</Typography>

      <div className={classes.errorwrapper}>
        <Typography className={classes.errortext}>{values.error}</Typography>
      </div>

      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        required={true}
        error={values.error ? true : false}
      >
        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email"
          value={values.email}
          onChange={handleChange("email")}
          labelWidth={60}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        required={true}
        error={values.error ? true : false}
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          classes={outlinedInputClasses}
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={85}
        />
      </FormControl>

      <FormControl
        variant="outlined"
        className={classes.formControl}
        disabled={!values.email || !values.password}
      >
        <InputLabel id="select-label">Select verification method</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values.verification}
          onChange={handleChange("verification")}
          label=" Select verification method"
          required={true}
          input={
            <OutlinedInput
              labelWidth={200}
              name="age"
              id="outlined-age-simple"
              classes={outlinedInputClasses}
            />
          }
        >
          <MenuItem value={1}>Suomi.fi</MenuItem>
        </Select>
      </FormControl>
      <div className={classes.wrapper}>
        <GreenButton
          variant="contained"
          color="primary"
          disabled={
            values.loading ||
            !values.email ||
            !values.password ||
            !values.verification
          }
          onClick={signUp}
        >
          Sign in
        </GreenButton>
        {values.loading && (
          <CircularProgress size={30} className={classes.spinner} />
        )}
      </div>
      <div className={classes.bottomcontent}>
        <Typography className={classes.formtext2}>
          Got token from optician?
        </Typography>
        <GreenButton
          variant="contained"
          color="primary"
          onClick={() => props.setNormalSignUp(false)}
          disabled={values.loading}
        >
          Proceed to token input
        </GreenButton>
      </div>
    </div>
  );
}
