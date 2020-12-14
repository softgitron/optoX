import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { RedButton } from "../../../components/button/buttons";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: "#ffffff",
    boxShadow: theme.shadows[5],
    borderRadius: "6px",
    padding: theme.spacing(0.5),
  },
}));

export default function SimpleModal({
  url,
  show,
  setModal,
}: {
  url: string;
  show: boolean;
  setModal: (value: boolean) => void;
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    setModal(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <img alt={"preview"} src={url} width="800" />
      <RedButton
        style={{ float: "right", marginTop: "20px" }}
        onClick={handleClose}
      >
        Close
      </RedButton>
    </div>
  );

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
