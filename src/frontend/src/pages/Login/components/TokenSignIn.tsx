import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import { CircularProgress, Typography } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { GreenButton, RedButton } from "../../../components/button/buttons";
import { useOutlinedInputStyles } from "../../../assets/styles/styles";

import { authenticationService } from "../../../Helpers/Authenthication";
import delay from "../../../Helpers/Delay";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#232323c7",
    width: "400px",
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
    bottom: "-187px",
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
}));

export default function InputAdornments(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [values, setValues] = React.useState({
    token: "",
    loading: false,
    error: "",
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value, error: "" });
  };

  const signUp = async () => {
    setValues({ ...values, loading: true });
    await delay(750); // Delay so the login isn't instant :)
    const res = await authenticationService.tokenLogin(values.token);

    if (res) {
      console.log(res);
      setValues({ ...values, error: "", loading: false });
      if (res === "Customer") {
        history.push("/customer");
      }
    } else {
      setValues({
        ...values,
        error: "Invalid credentials. Please try again.",
        loading: false,
      });
    }
  };
  return (
    <div className={classes.root}>
      <Typography className={classes.formtext}>Please enter token:</Typography>

      <div className={classes.errorwrapper}>
        <Typography className={classes.errortext}>{values.error}</Typography>
      </div>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        required={true}
        error={values.error ? true : false}
        disabled={values.loading}
      >
        <InputLabel htmlFor="outlined-adornment-email">Token</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          value={values.token}
          onChange={handleChange("token")}
          labelWidth={50}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <div className={classes.wrapper}>
        <GreenButton
          variant="contained"
          color="primary"
          disabled={values.loading || !values.token}
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
          Got username and password?
        </Typography>
        <RedButton
          variant="contained"
          color="secondary"
          onClick={() => props.setNormalSignUp(true)}
          disabled={values.loading}
        >
          Back to employee login
        </RedButton>
      </div>
    </div>
  );
}
