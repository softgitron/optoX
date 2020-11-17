import { makeStyles } from "@material-ui/core/styles";

export const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "&:hover $notchedOutline": {
      borderColor: "#037a6f",
    },
    "&$focused $notchedOutline": {
      borderColor: "#03dac5",
    },
  },
  focused: {},
  notchedOutline: {},
}));
