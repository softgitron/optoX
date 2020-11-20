import { makeStyles } from "@material-ui/core/styles";

export const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    /*     "& $notchedOutline": {
      backgroundColor: "#65656517",
    }, */
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
