// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useOutlinedInputStyles } from "../../../assets/styles/styles";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";
var debounce = require("lodash.debounce");

const useStyles = makeStyles((theme) => ({
  spinner: {
    color: "#03dac5",
  },
  formControl: {
    marginTop: theme.spacing(5),
    width: "400px",
  },
}));

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous({
  selectAppointment,
}: {
  selectAppointment: (appointment: any, customerInfo: any) => void;
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // All to be typed once more information on what backend actually returns will be done
  const [options, setOptions] = React.useState([
    {
      name: "Heikki",
    },
  ]); //customers
  const [appointments, setAppointments] = React.useState([{ id: 0 }]); //appointments data?
  const [loading, setLoading] = React.useState(false);
  const outlinedInputClasses = useOutlinedInputStyles();

  const [values, setValues] = React.useState({
    appointment: "",
    chosenCustomer: { name: "" },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = React.useCallback(
    debounce(async (nextValue: any) => {
      //Fetch data
      //Set it to options via setOptions
      console.log(nextValue);
      setLoading(false);
    }, 1000),
    []
  );

  const handleChange = async (query: string) => {
    setLoading(true);
    debouncedSave(query);
  };
  const handleChange2 = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
    const id = event.target.value;

    //Get appointment with the id X
    selectAppointment(event.target.value, values.chosenCustomer);
  };
  return (
    <div style={{ position: "relative", top: "-250px" }}>
      <Autocomplete
        id="asynchronous-demo"
        style={{ width: 400 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option: any, value: any) =>
          option.name === value.name
        }
        getOptionLabel={(option: any) => option.name}
        options={options}
        loading={loading}
        onChange={(event, newValue) => {
          if (newValue) {
            console.log("hello");
            setValues({ ...values, chosenCustomer: newValue });
          } else {
            setValues({
              ...values,
              chosenCustomer: { name: "" },
              appointment: "",
            });
            selectAppointment("", "");
          }
        }}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label="Customer name"
            variant="outlined"
            onChange={(e) => {
              handleChange(e.target.value);
              setValues({ ...values, chosenCustomer: { name: "" } });
            }}
            InputProps={{
              ...params.InputProps,
              classes: outlinedInputClasses,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress
                      color="primary"
                      size={20}
                      className={classes.spinner}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <FormControl
        variant="outlined"
        className={classes.formControl}
        disabled={values.chosenCustomer.name ? false : true}
      >
        <InputLabel id="select-label">Select appointment</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="select2"
          value={values.appointment}
          onChange={handleChange2("appointment")}
          label="Select appointment"
          required={true}
          input={
            <OutlinedInput
              labelWidth={140}
              name="age"
              id="outlined-method"
              classes={outlinedInputClasses}
            />
          }
        >
          {/* Map through appointments and render them. ID as the value*/}
          <MenuItem value={1}>Appointment 1</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
