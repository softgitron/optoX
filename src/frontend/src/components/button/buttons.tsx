import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
export const GreenButton = withStyles({
  root: {
    background: "#03dac5",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 48,
    padding: "0 30px",
    fontWeight: "bold",
    "&:hover": {
      background: "#00FFE6",
    },
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

export const RedButton = withStyles({
  root: {
    background: "#f27979",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 48,
    padding: "0 30px",
    fontWeight: "bold",
    "&:hover": {
      background: "#994d4d",
    },
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);
