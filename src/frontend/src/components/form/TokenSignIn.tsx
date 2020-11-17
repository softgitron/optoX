import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import { Button, CircularProgress, Typography } from "@material-ui/core";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    width: "400px",
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
    bottom: "-252px",
  },
}));

export default function InputAdornments(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = React.useState({
    token: "",
    loading: false,
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const signUp = async () => {
    setValues({ ...values, loading: true });
    setTimeout(() => {
      //mock loading
      setValues({ ...values, loading: false });
      history.push("/customer");
    }, 2500);
  };
  return (
    <div className={classes.root}>
      <Typography className={classes.formtext}>Please enter token:</Typography>
      <br />
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        required={true}
      >
        <InputLabel htmlFor="outlined-adornment-email">Token</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          value={values.token}
          onChange={handleChange("token")}
          labelWidth={70}
        />
      </FormControl>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          disabled={values.loading || !values.token}
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
          Got username and password?
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.setNormalSignUp(true)}
        >
          Back to employee login
        </Button>
      </div>
    </div>
  );
}
