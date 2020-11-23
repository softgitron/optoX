import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import { useOutlinedInputStyles } from "../../../assets/styles/styles";

import { GreenButton, RedButton } from "../../../components/button/buttons";
import { Button } from "@material-ui/core";
import SimpleModal from "./Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "1200px",
    padding: "0px",
    color: "white",
    float: "right",
    borderRadius: "5px",
  },
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
    marginLeft: theme.spacing(20.85),
  },

  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "48ch",
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
  buttonswrapper: {
    marginTop: theme.spacing(20),
    float: "right",
  },
  tokentext: {
    display: "inline",
    marginLeft: theme.spacing(21),
    position: "relative",
    top: "18px",
  },
  preview: {},
}));

const Fundusfoto = {
  name: "Fundusfoto",
  url: "FundusfotoUrl",
};
const Octscan = {
  name: "Octscan",
  url: "OctscanUrl",
};
const Visualfield = {
  name: "Visualfield",
  url: "VisualfieldUrl",
};
const imageFiles = {
  0: Fundusfoto,
  1: Octscan,
  2: Visualfield,
};
enum imageFilesEnum {
  Fundusfoto,
  Octscan,
  Visualfield,
}
//const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

export default function InputAdornments(props: any) {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [openModal, setopenModal] = React.useState({
    show: false,
    url: "",
  });
  const [values, setValues] = React.useState({
    email: "",
    firstname: "",
    lastname: "",
    socialnumber: "",
    previewUrl: "",
  });
  const [images, setImages] = React.useState({
    Fundusfoto: { name: "", url: "", file: null },
    Octscan: { name: "", url: "", file: null },
    Visualfield: { name: "", url: "", file: null },
  });
  const setModal = (value: boolean) => {
    setopenModal({ ...openModal, show: value });
  };
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleUploadClick = (event: any, type: imageFilesEnum) => {
    if (!event.target.files[0]) return;
    const file = event.target.files[0];
    const url = URL.createObjectURL(event.target.files[0]);
    const name = imageFiles[type].name;
    setImages({
      ...images,
      [name]: { name: imageFiles[type].name, url: url, file: file },
    });
  };
  const handleRemoveImage = async (type: imageFilesEnum) => {
    //await delay(250); // Delay so clicking on "Remove" doesn't click on "Upload"
    const name = imageFiles[type].name;
    setImages({
      ...images,
      [name]: { name: "", url: "", file: null },
    });
  };
  const handlePreview = (url: any) => {
    console.log(url);
    setopenModal({
      ...openModal,
      url: url,
      show: true,
    });
  };
  const canSubmit = () => {
    if (
      values.email &&
      values.firstname &&
      values.lastname &&
      values.socialnumber &&
      images.Fundusfoto.file &&
      images.Octscan.file &&
      images.Visualfield.file
    ) {
      return true;
    }
    return false;
  };
  return (
    <div className={classes.root}>
      <SimpleModal
        url={openModal.url}
        show={openModal.show}
        setModal={setModal}
      />
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-firstname">
          Customer firstname
        </InputLabel>
        <OutlinedInput
          color="primary"
          id="outlined-adornment-fistname"
          value={values.firstname}
          onChange={handleChange("firstname")}
          labelWidth={145}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        disabled={true}
      >
        <InputLabel htmlFor="outlined-adornment-fundus">
          Fundusfoto file
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-octscan"
          labelWidth={100}
          classes={outlinedInputClasses}
          startAdornment={
            images.Fundusfoto.url && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handlePreview(images.Fundusfoto.url);
                }}
              >
                <img
                  alt={"preview"}
                  className={classes.preview}
                  src={images.Fundusfoto.url}
                  width="40"
                />
              </div>
            )
          }
          endAdornment={
            <>
              {images.Fundusfoto.file ? (
                <Button
                  variant="contained"
                  onClick={async () => {
                    handleRemoveImage(imageFilesEnum.Fundusfoto);
                  }}
                >
                  Remove
                </Button>
              ) : (
                <Button variant="contained" component="label">
                  Upload
                  <input
                    accept="image/*"
                    type="file"
                    hidden
                    onChange={(e) =>
                      handleUploadClick(e, imageFilesEnum.Fundusfoto)
                    }
                  />
                </Button>
              )}
            </>
          }
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-lastname">
          Customer lastname
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-lastname"
          value={values.lastname}
          onChange={handleChange("lastname")}
          labelWidth={145}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        disabled={true}
      >
        <InputLabel htmlFor="outlined-adornment-octscan">
          Oct scan file
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-octscan"
          labelWidth={100}
          classes={outlinedInputClasses}
          startAdornment={
            images.Octscan.url && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handlePreview(images.Octscan.url);
                }}
              >
                <img
                  alt={"preview"}
                  className={classes.preview}
                  src={images.Octscan.url}
                  width="40"
                />
              </div>
            )
          }
          endAdornment={
            <>
              {images.Octscan.file ? (
                <Button
                  variant="contained"
                  onClick={async () => {
                    handleRemoveImage(imageFilesEnum.Octscan);
                  }}
                >
                  Remove
                </Button>
              ) : (
                <Button variant="contained" component="label">
                  Upload
                  <input
                    accept="image/*"
                    type="file"
                    hidden
                    onChange={(e) =>
                      handleUploadClick(e, imageFilesEnum.Octscan)
                    }
                  />
                </Button>
              )}
            </>
          }
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-email">
          Customer email
        </InputLabel>
        <OutlinedInput
          type="email"
          id="outlined-adornment-email"
          value={values.email}
          onChange={handleChange("email")}
          labelWidth={120}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        disabled={true}
      >
        <InputLabel htmlFor="outlined-adornment-visualfield">
          Visualfield file
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-octscan"
          labelWidth={100}
          classes={outlinedInputClasses}
          startAdornment={
            images.Visualfield.url && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handlePreview(images.Visualfield.url);
                }}
              >
                <img
                  alt={"preview"}
                  className={classes.preview}
                  src={images.Visualfield.url}
                  width="40"
                />
              </div>
            )
          }
          endAdornment={
            <>
              {images.Visualfield.file ? (
                <Button
                  variant="contained"
                  onClick={async () => {
                    handleRemoveImage(imageFilesEnum.Visualfield);
                  }}
                >
                  Remove
                </Button>
              ) : (
                <Button variant="contained" component="label">
                  Upload
                  <input
                    accept="image/*"
                    type="file"
                    hidden
                    onChange={(e) =>
                      handleUploadClick(e, imageFilesEnum.Visualfield)
                    }
                  />
                </Button>
              )}
            </>
          }
        />
      </FormControl>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-socialnumber">
          Customer social security number
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-socialnumber"
          value={values.socialnumber}
          onChange={handleChange("socialnumber")}
          labelWidth={240}
          classes={outlinedInputClasses}
        />
      </FormControl>
      <div className={classes.tokentext}>
        Login token will be: XYZ3-AD22-1212-0500
      </div>

      <div className={classes.buttonswrapper}>
        <RedButton
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => props.goBack()}
        >
          Back
        </RedButton>
        <GreenButton
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!canSubmit()}
        >
          Upload images
        </GreenButton>
      </div>
    </div>
  );
}
