import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import { useOutlinedInputStyles } from "../../../assets/styles/styles";

import { GreenButton, RedButton } from "../../../components/button/buttons";
import { Button, MenuItem, Select } from "@material-ui/core";
import SimpleModal from "./Modal";
import {
  createCustomer,
  createInspection,
  getSilmalaakarit,
  uploadImage,
} from "../../../API/API";
import { getCountry } from "../../../Helpers/Country";

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

function uuidv4() {
  return "xxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function InputAdornments(props: any) {
  const [loading, setLoading] = React.useState(false);
  const [silmalaakarit, setSilmalaakarit] = React.useState([
    {
      name: "a",
      id: "a",
    },
  ]);
  React.useEffect(() => {
    const getSilmaLaakarit = async () => {
      let silmalaakariArray: any[] = [];
      const silmalaakarit = await getSilmalaakarit();
      for (const silmalaakari of silmalaakarit) {
        silmalaakariArray.push({
          name: silmalaakari.Name,
          id: silmalaakari.OpthalmologistID,
        });
      }

      setSilmalaakarit(silmalaakariArray);
    };
    getSilmaLaakarit();
  }, []);
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
    silmalaakari: -1,
  });
  const [loginToken, setLoginToken] = React.useState(uuidv4().toUpperCase());

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
      images.Visualfield.file &&
      values.silmalaakari >= 0 &&
      !loading
    ) {
      return true;
    }
    return false;
  };
  const [isDone, setDone] = React.useState(false);
  const resetForms = () => {
    setImages({
      Fundusfoto: { name: "", url: "", file: null },
      Octscan: { name: "", url: "", file: null },
      Visualfield: { name: "", url: "", file: null },
    });
    setValues({
      email: "",
      firstname: "",
      lastname: "",
      socialnumber: "",
      previewUrl: "",
      silmalaakari: -1,
    });
    setDone(false);
    setLoginToken(uuidv4().toUpperCase());
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
                    accept="image/jpeg"
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
                    accept="image/jpeg"
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
                    accept="image/jpeg"
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

      <FormControl
        variant="outlined"
        className={clsx(classes.margin, classes.textField)}
      >
        <InputLabel id="select-label">Select opthahlmologist</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="select2"
          value={values.silmalaakari}
          onChange={handleChange("silmalaakari")}
          label="Select opthahlmologist"
          required={true}
          input={
            <OutlinedInput
              labelWidth={240}
              id="outlined-method"
              classes={outlinedInputClasses}
            />
          }
        >
          {/* Map through appointments and render them. ID as the value*/}
          {silmalaakarit.map((silmalaakari, index) => (
            <MenuItem value={silmalaakari.id}>{silmalaakari.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={classes.tokentext}>Login token will be: {loginToken}</div>

      <div className={classes.buttonswrapper}>
        <RedButton
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => props.goBack()}
        >
          Back
        </RedButton>
        {isDone ? (
          <GreenButton
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!canSubmit()}
            onClick={async () => {
              resetForms();
            }}
          >
            Create new inspection
          </GreenButton>
        ) : (
          <GreenButton
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!canSubmit()}
            onClick={async () => {
              let a = false;
              setLoading(true);

              const CustomerID = await createCustomer(
                getCountry(),
                values.socialnumber,
                values.email,
                values.firstname,
                values.lastname
              ).catch((e) => {
                alert(
                  "Check that your input is correct. Social number or email might be wrong"
                );
                setLoading(false);
                a = true;
              });
              if (a) return;
              const Fundusfoto = await uploadImage(
                images.Fundusfoto.file
              ).catch((e) => {
                alert("Check your images! JPEG only!");
                setLoading(false);
              });
              const OctScan = await uploadImage(images.Octscan.file).catch(
                (e) => {
                  alert("Check your images! JPEG only!");
                  setLoading(false);
                }
              );

              const VisualField = await uploadImage(
                images.Visualfield.file
              ).catch((e) => {
                alert("Check your images! JPEG only!");
                setLoading(false);
              });
              if (!Fundusfoto || !OctScan || !VisualField) return;

              const res = await createInspection(
                CustomerID,
                getCountry(),
                parseInt(Fundusfoto.ImageID),
                parseInt(OctScan.ImageID),
                parseInt(VisualField.ImageID),
                loginToken,
                values.silmalaakari
              ).catch((e) => {
                alert("Something went wrong!");
                setLoading(false);
              });

              //after this show only Go back and make a new inspection etc. button that resets forms
              setLoading(false);
              setDone(true);
              alert("Inspection created successfully!");
            }}
          >
            Upload images
          </GreenButton>
        )}
      </div>
    </div>
  );
}
