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
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    maxWidth: "400px",
    maxHeight: "500px",
    minHeight: "500px",
    padding: "30px",
    color: "#4a4a4a",
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
  },
  bottomcontent: {
    position: "relative",
    bottom: "-100px",
  },
}));

export default function InputAdornments(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = React.useState({
    password: "",
    email: "",
    showPassword: false,
    verification: "",
    loading: false,
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
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
      setValues({ ...values, loading: false });
      history.push("/optician");
    }, 2500);
  };
  return (
    <div className={classes.root}>
      <Typography className={classes.formtext}>Please sign in:</Typography>
      <br />
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        required={true}
      >
        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          value={values.email}
          onChange={handleChange("email")}
          labelWidth={70}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        required={true}
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
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
          labelWidth={70}
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
        >
          <MenuItem value={1}>Suomi.fi</MenuItem>
        </Select>
      </FormControl>
      <div className={classes.wrapper}>
        <Button
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
        </Button>
        {values.loading && (
          <CircularProgress size={30} className={classes.spinner} />
        )}
      </div>
      <div className={classes.bottomcontent}>
        <Typography className={classes.formtext2}>
          Got token from optician?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.setNormalSignUp(false)}
          disabled={values.loading}
        >
          Proceed to token input
        </Button>
      </div>
    </div>
  );
}
