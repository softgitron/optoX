import axios from "axios";
import { authenticationService } from "../Helpers/Authenthication";
const tokenConfig = authenticationService.tokenConfig;
const API = window.location.protocol + "//" + window.location.hostname + "/api";

//dynaamiseksi
export const getOpthalmologistCustomers = async () => {
  const res = await axios.get(
    API + "/opthalmologist/inspections",
    tokenConfig()
  );
  if (res) {
    return res.data;
  }
};
export const getInspectionInfo = async (
  CustomerId: string,
  InspectionId: string
) => {
  const config: any = tokenConfig();
  config.param = { InspectionId };
  const res = await axios.get(
    API + `/inspection?InspectionID=${InspectionId}`,
    config
  );
  if (res) {
    return res.data;
  }
};
export const getInspectionInfoCID = async (CustomerId: string) => {
  const config: any = tokenConfig();
  config.param = { CustomerId };
  const res = await axios.get(
    API + `/customer/inspections?CustomerID=${CustomerId}`,
    config
  );
  if (res) {
    return res.data;
  }
};
export const getCustomerInfo = async (CustomerId: string) => {
  const config: any = tokenConfig();
  const res = await axios.get(
    API + `/customer?CustomerID=${CustomerId}`,
    config
  );
  if (res) {
    return res.data;
  }
};
export const getOpticianCustomers = async () => {
  const config: any = tokenConfig();
  const res = await axios.get(API + "/optician/customers", config);
  if (res) {
    return res.data;
  }
};

export const uploadImage = async (Fileupload: any) => {
  const formData: any = new FormData();
  const config: any = tokenConfig();

  const auth = config.headers.Authentication;
  config.headers = {
    "content-type": "multipart/form-data",
    Authentication: auth,
  };
  formData.append("Fileupload", Fileupload);
  const res = await axios.post(API + "/image", formData, config);
  if (res) {
    return res.data;
  }
};

export const getImage = async (id: string) => {
  let returnURL = null;
  const config: any = tokenConfig();
  const auth = config.headers.Authentication;
  await axios
    .get(API + `/image?ImageID=${id}`, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "image/jpeg",
        Authentication: auth,
      },
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      returnURL = url;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.jpeg"); //or any other extension
      document.body.appendChild(link);
      //link.click();
    })
    .catch((error) => null);
  return returnURL;
};
export const downloadImage = async (name: string, id: string) => {
  let returnURL = null;
  const config: any = tokenConfig();
  const auth = config.headers.Authentication;
  await axios
    .get(API + `/image?ImageID=${id}`, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "image/jpeg",
        Authentication: auth,
      },
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      returnURL = url;

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".jpeg"); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => null);
  return returnURL;
};
export const customerGetOwnInfo = async (id: string) => {
  const config: any = tokenConfig();
  const res = await axios.get(API + `/customer?CustomerID=${id}`, config);
  if (res) {
    return res.data;
  }
};
export const getSilmalaakarit = async () => {
  const config: any = tokenConfig();
  const res = await axios.get(API + `/opthalmologist`, config);
  if (res) {
    return res.data;
  }
};

export const makeDecision = async (inspectionID: string, isOK: boolean) => {
  const Body = JSON.stringify({
    Approval: isOK ? 1 : 0,
    InspectionID: parseInt(inspectionID),
  });

  const res = await axios.post(
    API + "/inspection/decision",
    Body,
    tokenConfig()
  );
};

export const createCustomer = async (
  CustomerCountry: string,
  SocialSecurityNumber: string,
  Email: string,
  FirstName: string,
  LastName: string
) => {
  const Body = JSON.stringify({
    CustomerCountry,
    SocialSecurityNumber,
    Email,
    FirstName,
    LastName,
  });

  const res = await axios
    .post(API + "/customer ", Body, tokenConfig())
    .catch((e) => null);
  if (res) {
    return res.data.CustomerID;
  } else {
    //exists already
    const res = await axios
      .get(API + `/customer?Email=${Email}`, tokenConfig())
      .catch((e) => null);

    if (res?.data.Email === "") {
      throw new Error("Customer creating error");
    }
    return res?.data.CustomerID;
  }
};
export const createInspection = async (
  CustomerID: number,
  InspectionCountry: string,
  FundusPhotoRef: number,
  OctScanRef: number,
  VisualFieldRef: number,
  LoginToken: string,
  OpthalmologistID: number
) => {
  const Body = JSON.stringify({
    CustomerID,
    InspectionCountry,
    FundusPhotoRef,
    OctScanRef,
    VisualFieldRef,
    LoginToken,
    TimeStamp: new Date(),
    OpthalmologistID,
  });

  const res = await axios
    .post(API + "/inspection ", Body, tokenConfig())
    .catch((e) => null);
};
