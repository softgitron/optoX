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
export default function Asynchronous({
  selectAppointment,
  customers,
}: {
  selectAppointment: (index: any, customerInfo: any) => void;
  customers: CustomerData[] | undefined;
}) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const outlinedInputClasses = useOutlinedInputStyles();

  const [values, setValues] = React.useState({
    appointment: "",
  });
  const [chosenCustomer, setCustomer] = React.useState<
    CustomerData | undefined
  >(undefined);

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });

    selectAppointment(event.target.value, chosenCustomer);
  };
  const chooseCustomer = (event: any) => {
    const customerData = customers || [];
    setCustomer(customerData[event.target.value]);
    setValues({ ...values, appointment: "" });
    selectAppointment(null, chosenCustomer);
  };
  return (
    <div style={{ position: "relative", top: "-250px" }}>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-label">Select customer</InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="select2"
            value={chosenCustomer?.FullName}
            onChange={chooseCustomer}
            label="Select appointment"
            required={true}
            input={
              <OutlinedInput
                labelWidth={140}
                id="outlined-method"
                classes={outlinedInputClasses}
              />
            }
          >
            {/* Map through appointments and render them. ID as the value*/}
            {customers?.map((customer, index) => (
              <MenuItem value={index}>
                {customer?.FirstName + " " + customer?.LastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          disabled={chosenCustomer ? false : true}
        >
          <InputLabel id="select-label">Select appointment</InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="select2"
            value={values.appointment}
            onChange={handleChange("appointment")}
            label="Select appointment"
            required={true}
            input={
              <OutlinedInput
                labelWidth={140}
                id="outlined-method"
                classes={outlinedInputClasses}
              />
            }
          >
            {/* Map through appointments and render them. ID as the value*/}
            {chosenCustomer?.Inspections.map((inspection, index) => (
              <MenuItem value={index}>
                {formatDate(inspection.InspectionTime)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
const formatDate = (dateString: string) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};
