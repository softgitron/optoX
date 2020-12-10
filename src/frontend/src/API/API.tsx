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
    console.log(res);
    return res.data;
  }
};
export const getInspectionInfo = async (
  CustomerId: string,
  InspectionId: string
) => {
  const config: any = tokenConfig();
  config.param = { CustomerId, InspectionId };
  const res = await axios.get(API + "/inspection", config);
  if (res) {
    console.log(res);
    return res.data;
  }
};
export const getCustomerInfo = async (CustomerId: string) => {
  const config: any = tokenConfig();
  const res = await axios.get(API + "/customer", config);
  if (res) {
    console.log(res);
    return res.data;
  }
};
export const getOpticianCustomers = async () => {
  const config: any = tokenConfig();
  const res = await axios.get(API + "/optician/customers", config);
  if (res) {
    console.log(res);
    return res.data;
  }
};

export const uploadImage = async (Fileupload: any) => {
  const formData: any = new FormData();
  const config: any = tokenConfig();
  console.log(config);
  const auth = config.headers.Authentication;
  config.headers = {
    "content-type": "multipart/form-data",
    Authentication: auth,
  };
  formData.append("Fileupload", Fileupload);
  const res = await axios.post(API + "/image", formData, config);
  if (res) {
    console.log(res);
    return res.data;
  }
};
export const getImage = async (id: string) => {
  let returnURL = null;
  const config: any = tokenConfig();
  const auth = config.headers.Authentication;
  await axios
    .get(API + `/image?ImageID=539443706`, {
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
      console.log(url);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.jpeg"); //or any other extension
      document.body.appendChild(link);
      //link.click();
    })
    .catch((error) => console.log(error));
  return returnURL;
};
export const customerGetOwnInfo = async () => {
  console.log("Am i even called tf");
  const config: any = tokenConfig();
  const res = await axios.get(API + "/customer", config);
  if (res) {
    console.log(res);
    return res.data;
  }
};
