import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import { useOutlinedInputStyles } from "../../../assets/styles/styles";

import { GreenButton } from "../../../components/button/buttons";
import { MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
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
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "40ch",
  },
  select: {
    width: "15ch",
    marginLeft: theme.spacing(2),
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
}));

//const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

export default function InputAdornments(props: any) {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [values, setValues] = React.useState({
    search: "",
    role: 2,
  });
  const handleChange = (prop: any) => (event: any) => {
    if (prop === "role") {
      props.setValues(values.search, event.target.value);
    }
    if (prop === "search") {
      props.setValues(event.target.value, values.role);
    }
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div className={classes.root}>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-firstname">Search</InputLabel>
        <OutlinedInput
          color="primary"
          id="outlined-adornment-fistname"
          value={values.search}
          onChange={handleChange("search")}
          labelWidth={145}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <FormControl
        variant="outlined"
        className={clsx(classes.margin, classes.select)}
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
              labelWidth={70}
              name="role"
              id="outlined-method"
              classes={outlinedInputClasses}
            />
          }
        >
          <MenuItem value={2}>All</MenuItem>
          <MenuItem value={0}>Optician</MenuItem>
          <MenuItem value={1}>Opthalmologist</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
