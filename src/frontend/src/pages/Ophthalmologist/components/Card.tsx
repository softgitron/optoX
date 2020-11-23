import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    color: "white",
    backgroundColor: "#33333300",
    borderColor: "#ffffff38",
    "&:hover": {
      borderColor: "#ffffff8a",
    },
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: "0px",
  },
});

export default function OutlinedCard({
  firstname,
  lastname,
  date,
  opticalRetail,
  index,
  selectPatient,
  selectedPatient,
}: {
  opticalRetail: string;
  firstname: string;
  lastname: string;
  date: string;
  index: number;
  selectPatient: (index: number) => void;
  selectedPatient: number;
}) {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      variant="outlined"
      onClick={() => {
        selectPatient(index);
      }}
      style={{
        cursor: selectedPatient === index ? "auto" : "pointer",
        backgroundColor: selectedPatient === index ? "#4e4e4e" : "inherit",
      }}
    >
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {opticalRetail}
        </Typography>
        <Typography>
          {firstname} {lastname}
        </Typography>
        <Typography className={classes.pos}>{date}</Typography>
      </CardContent>
    </Card>
  );
}
