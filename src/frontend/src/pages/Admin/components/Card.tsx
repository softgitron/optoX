import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
export default function OutlinedCard({
  firstname,
  lastname,
  role,
  index,
  id,
  deleteEmployee,
}: {
  role: number;
  firstname: string;
  lastname: string;
  index: any;
  id: string;
  deleteEmployee: (id: string) => Promise<void>;
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const deletion = async (id: string): Promise<void> => {
    setLoading(true);
    await sleep(2000);
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
      </CardContent>
    </Card>
  );
}
