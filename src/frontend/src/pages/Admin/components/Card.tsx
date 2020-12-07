import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import delay from "../../../Helpers/Delay";

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
  role,
  index,
  id,
  email,
  deleteEmployee,
}: {
  role: number;
  firstname: string;
  lastname: string;
  index: any;
  id: string;
  email: string;
  deleteEmployee: (id: string) => Promise<void>;
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const deletion = async (id: string): Promise<void> => {
    setLoading(true);
    await delay(2000);
    await deleteEmployee(id);
    setLoading(false);
  };
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {role === 1 ? "Opthtalmologist" : "Optician"}
        </Typography>
        <Typography>
          {firstname} {lastname}
          <div
            style={{
              float: "right",
              position: "relative",
              cursor: "pointer",
            }}
          >
            {loading ? (
              "Deleting..."
            ) : (
              <DeleteForeverIcon
                onClick={() => {
                  deletion(id);
                }}
              />
            )}
          </div>
        </Typography>
        <Typography>{email}</Typography>
      </CardContent>
    </Card>
  );
}
